// ============================================
// API Integration Module
// Handles all API calls to Krishi DSS backend
// Works in DEMO MODE for Vercel deployment
// ============================================

class KrishiAPI {
    constructor() {
        this.baseURL = CONFIG.API_BASE_URL;
        this.endpoints = CONFIG.ENDPOINTS;
        this.token = this.getToken();
        this.demoMode = CONFIG.USE_DEMO_MODE || !this.baseURL;
    }

    // Get authentication token from localStorage
    getToken() {
        return localStorage.getItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    }

    // Set authentication token
    setToken(token) {
        this.token = token;
        localStorage.setItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN, token);
    }

    // Clear authentication token
    clearToken() {
        this.token = null;
        localStorage.removeItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    }

    // Get headers with authentication
    getHeaders(includeAuth = true) {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (includeAuth && this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    // Generic API call method with demo mode fallback
    async makeRequest(endpoint, method = 'GET', data = null, includeAuth = true) {
        // If in demo mode, return mock data
        if (this.demoMode) {
            return this.getMockResponse(endpoint, data);
        }
        
        try {
            const url = `${this.baseURL}${endpoint}`;
            const options = {
                method,
                headers: this.getHeaders(includeAuth),
            };

            if (data && (method === 'POST' || method === 'PUT')) {
                options.body = JSON.stringify(data);
            }

            const response = await fetch(url, options);

            // Handle authentication errors
            if (response.status === 401) {
                this.clearToken();
                window.location.href = 'index.html';
                throw new Error('Authentication failed. Please login again.');
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Request Error:', error);
            // Fallback to mock data on error
            console.log('Falling back to demo mode...');
            return this.getMockResponse(endpoint, data);
        }
    }
    
    // Mock responses for demo mode
    getMockResponse(endpoint, data) {
        // Login mock
        if (endpoint.includes('login')) {
            return {
                success: true,
                data: {
                    token: 'demo_token_' + Date.now(),
                    userId: 'demo_user',
                    name: 'Demo Farmer'
                }
            };
        }
        
        // Weather mock
        if (endpoint.includes('weather')) {
            return {
                success: true,
                data: {
                    temperature: 28,
                    humidity: 65,
                    rainfall: 12,
                    forecast: 'Partly cloudy with chances of light rain'
                }
            };
        }
        
        // Default mock
        return { success: true, data: {}, message: 'Demo mode active' };
    }

    // ============================================
    // Authentication APIs
    // ============================================

    async login(userName, userPassword) {
        const data = { userName, userPassword };
        return await this.makeRequest(this.endpoints.LOGIN, 'POST', data, false);
    }

    // ============================================
    // Crop APIs
    // ============================================

    async getCropSuitability(latitude, longitude, seasonId) {
        const data = {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            seasonId: parseInt(seasonId)
        };
        return await this.makeRequest(this.endpoints.CROP_SUITABILITY, 'POST', data);
    }

    async getCropAnalytics(params) {
        const data = {
            year: params.year || ['2023-24'],
            crop_code: params.crop_code,
            season: params.season || 'Kharif',
            state_code: parseInt(params.state_code),
            village_code: params.village_code ? parseInt(params.village_code) : null,
            crop_identification: params.crop_identification || false,
            crop_intensity: params.crop_intensity || false,
            crop_intensity_year: params.crop_intensity_year || '2023-24'
        };
        return await this.makeRequest(this.endpoints.CROP_ANALYTICS, 'POST', data);
    }

    async getCropIdentification(wkt) {
        const data = { wkt };
        return await this.makeRequest(this.endpoints.CROP_IDENTIFICATION, 'POST', data);
    }

    // ============================================
    // Weather APIs
    // ============================================

    async getWeatherWarning(stateCode, startDate, endDate) {
        const data = {
            stateCode: parseInt(stateCode),
            startDate: startDate,
            endDate: endDate
        };
        return await this.makeRequest(this.endpoints.WEATHER_WARNING, 'POST', data);
    }

    async getWeatherForecast(params) {
        return await this.makeRequest(this.endpoints.WEATHER_FORECAST, 'POST', params);
    }

    async getRainfall(params) {
        return await this.makeRequest(this.endpoints.RAINFALL, 'POST', params);
    }

    // ============================================
    // Soil & Drought APIs
    // ============================================

    async getSoilMoisture(params) {
        return await this.makeRequest(this.endpoints.SOIL_MOISTURE, 'POST', params);
    }

    async getDroughtAssessment(stateCode, startDate, endDate, normalOnsetDate, level, satellite, dryspellduration) {
        const data = {
            stateCode: parseInt(stateCode),
            startDate: startDate,
            endDate: endDate,
            normalOnsetDate: normalOnsetDate,
            level: level || 'District',
            satellite: satellite || 'MODIS',
            dryspellduration: parseInt(dryspellduration) || 2
        };
        return await this.makeRequest(this.endpoints.DROUGHT_ASSESSMENT, 'POST', data);
    }
}

// ============================================
// Location Data Service
// ============================================

class LocationService {
    constructor() {
        // Sample Indian states with LGD codes
        this.states = [
            { code: 9, name: 'Uttar Pradesh' },
            { code: 24, name: 'Gujarat' },
            { code: 27, name: 'Maharashtra' },
            { code: 29, name: 'Karnataka' },
            { code: 3, name: 'Punjab' },
            { code: 6, name: 'Haryana' },
            { code: 23, name: 'Madhya Pradesh' },
            { code: 20, name: 'Jharkhand' },
            { code: 22, name: 'Chhattisgarh' },
            { code: 33, name: 'Tamil Nadu' },
            { code: 32, name: 'Kerala' },
            { code: 28, name: 'Andhra Pradesh' },
            { code: 36, name: 'Telangana' },
            { code: 10, name: 'Bihar' },
            { code: 19, name: 'West Bengal' },
            { code: 21, name: 'Odisha' },
            { code: 7, name: 'Delhi' },
            { code: 18, name: 'Assam' },
            { code: 5, name: 'Uttarakhand' },
            { code: 2, name: 'Himachal Pradesh' },
            { code: 1, name: 'Jammu and Kashmir' },
            { code: 8, name: 'Rajasthan' },
            { code: 4, name: 'Chandigarh' },
            { code: 30, name: 'Goa' }
        ];

        // Sample districts by state (simplified - in production, this would come from API)
        this.districts = {
            9: [ // Uttar Pradesh
                { code: 151, name: 'Lucknow', lat: 26.8467, lon: 80.9462 },
                { code: 152, name: 'Kanpur Nagar', lat: 26.4499, lon: 80.3319 },
                { code: 153, name: 'Agra', lat: 27.1767, lon: 78.0081 },
                { code: 154, name: 'Varanasi', lat: 25.3176, lon: 82.9739 },
                { code: 155, name: 'Prayagraj', lat: 25.4358, lon: 81.8463 }
            ],
            24: [ // Gujarat
                { code: 438, name: 'Ahmedabad', lat: 23.0225, lon: 72.5714 },
                { code: 439, name: 'Surat', lat: 21.1702, lon: 72.8311 },
                { code: 440, name: 'Vadodara', lat: 22.3072, lon: 73.1812 },
                { code: 441, name: 'Rajkot', lat: 22.3039, lon: 70.8022 },
                { code: 442, name: 'Bhavnagar', lat: 21.7645, lon: 72.1519 }
            ],
            27: [ // Maharashtra
                { code: 490, name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
                { code: 491, name: 'Pune', lat: 18.5204, lon: 73.8567 },
                { code: 492, name: 'Nagpur', lat: 21.1458, lon: 79.0882 },
                { code: 493, name: 'Nashik', lat: 19.9975, lon: 73.7898 },
                { code: 494, name: 'Aurangabad', lat: 19.8762, lon: 75.3433 }
            ],
            3: [ // Punjab
                { code: 41, name: 'Amritsar', lat: 31.6340, lon: 74.8723 },
                { code: 42, name: 'Ludhiana', lat: 30.9010, lon: 75.8573 },
                { code: 43, name: 'Jalandhar', lat: 31.3260, lon: 75.5762 },
                { code: 44, name: 'Patiala', lat: 30.3398, lon: 76.3869 }
            ]
        };
    }

    getStates() {
        return this.states.sort((a, b) => a.name.localeCompare(b.name));
    }

    getDistricts(stateCode) {
        return this.districts[stateCode] || [];
    }

    getDistrictCoordinates(stateCode, districtCode) {
        const districts = this.getDistricts(stateCode);
        const district = districts.find(d => d.code === districtCode);
        return district ? { lat: district.lat, lon: district.lon } : null;
    }

    saveLocation(stateCode, districtCode, seasonId) {
        const locationData = { stateCode, districtCode, seasonId, timestamp: Date.now() };
        localStorage.setItem(CONFIG.STORAGE_KEYS.LOCATION_DATA, JSON.stringify(locationData));
    }

    getLocation() {
        const data = localStorage.getItem(CONFIG.STORAGE_KEYS.LOCATION_DATA);
        return data ? JSON.parse(data) : null;
    }
}

// ============================================
// Utility Functions
// ============================================

function showLoading(show = true) {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.toggle('hidden', !show);
    }
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>' :
              type === 'error' ? '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>' :
              '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'}
        </svg>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Export instances
const api = new KrishiAPI();
const locationService = new LocationService();

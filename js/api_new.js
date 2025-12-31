// ============================================
// API Service Module - Updated for FastAPI Backend
// Handles all API communications with backend
// ============================================

class KrishiAPI {
    constructor() {
        this.baseURL = CONFIG.API_BASE_URL;
    }

    // Token Management
    getToken() {
        return localStorage.getItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    }

    setToken(token) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN, token);
    }

    clearToken() {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.USER_DATA);
    }

    getHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };

        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    // Generic request method
    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        const config = {
            ...options,
            headers: {
                ...this.getHeaders(),
                ...options.headers
            }
        };

        try {
            showLoading(true);
            const response = await fetch(url, config);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        } finally {
            showLoading(false);
        }
    }

    // Authentication APIs
    async login(username, password) {
        const response = await this.makeRequest(CONFIG.ENDPOINTS.LOGIN, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (response.access_token) {
            this.setToken(response.access_token);
            localStorage.setItem(CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));
        }

        return response;
    }

    async register(userData) {
        const response = await this.makeRequest(CONFIG.ENDPOINTS.REGISTER, {
            method: 'POST',
            body: JSON.stringify(userData)
        });

        if (response.access_token) {
            this.setToken(response.access_token);
            localStorage.setItem(CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));
        }

        return response;
    }

    // Location APIs
    async getStates() {
        return await this.makeRequest(CONFIG.ENDPOINTS.STATES, {
            method: 'GET'
        });
    }

    async getDistricts(stateCode) {
        return await this.makeRequest(`${CONFIG.ENDPOINTS.DISTRICTS}/${stateCode}`, {
            method: 'GET'
        });
    }

    // Crop APIs
    async getCropRecommendations(stateCode, districtCode, seasonId, lat, lon) {
        return await this.makeRequest(CONFIG.ENDPOINTS.CROP_RECOMMENDATIONS, {
            method: 'POST',
            body: JSON.stringify({
                state_code: stateCode,
                district_code: districtCode,
                season_id: seasonId,
                lat: lat,
                lon: lon
            })
        });
    }

    // Weather APIs
    async getWeather(stateCode, districtCode) {
        return await this.makeRequest(`${CONFIG.ENDPOINTS.WEATHER}/${stateCode}/${districtCode}`, {
            method: 'GET'
        });
    }

    // Health Check
    async healthCheck() {
        return await this.makeRequest(CONFIG.ENDPOINTS.HEALTH, {
            method: 'GET'
        });
    }
}

// Location Service - Updated to use real backend
class LocationService {
    constructor() {
        this.states = [];
        this.districtsCache = {};
        this.api = new KrishiAPI();
    }

    async loadStates() {
        try {
            console.log('Loading states from backend...');
            this.states = await this.api.getStates();
            console.log('States loaded:', this.states.length);
            return this.states;
        } catch (error) {
            console.error('Error loading states:', error);
            showToast('Failed to load states from server', 'error');
            return [];
        }
    }

    getStates() {
        return this.states.sort((a, b) => a.name.localeCompare(b.name));
    }

    async loadDistricts(stateCode) {
        try {
            console.log('Loading districts for state:', stateCode);
            const districts = await this.api.getDistricts(stateCode);
            console.log('Districts loaded:', districts.length);
            this.districtsCache[stateCode] = districts;
            return districts;
        } catch (error) {
            console.error('Error loading districts:', error);
            showToast('Failed to load districts from server', 'error');
            return [];
        }
    }

    getDistricts(stateCode) {
        return this.districtsCache[stateCode] || [];
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

// Utility Functions
function showLoading(show) {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        if (show) {
            loadingOverlay.classList.remove('hidden');
        } else {
            loadingOverlay.classList.add('hidden');
        }
    }
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// Initialize API and LocationService
const api = new KrishiAPI();
const locationService = new LocationService();

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.api = api;
    window.locationService = locationService;
    window.showToast = showToast;
    window.showLoading = showLoading;
}

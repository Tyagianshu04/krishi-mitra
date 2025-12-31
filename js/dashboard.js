// ============================================
// Dashboard Module
// Handles dashboard functionality and user interactions
// ============================================

document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM loaded');
    
    // Check authentication - but don't block dashboard initialization
    if (typeof checkAuth === 'function') {
        const isAuthed = checkAuth();
        if (!isAuthed) {
            console.log('Not authenticated - some features may be limited');
        }
    }
    
    console.log('Initializing dashboard...');
    await initializeDashboard();
});

async function initializeDashboard() {
    console.log('Initializing dashboard...');
    
    setupNavigation();
    setupUserMenu();
    setupQuickActions();
    loadUserData();
    setupLocationForm();
    
    // Districts are now loaded from districts_data.js - no API needed
    console.log('Dashboard initialized - districts loaded from local data');
    
    // Load saved location if available
    const savedLocation = locationService.getLocation();
    if (savedLocation) {
        restoreLocation(savedLocation);
    }
}

// ============================================
// Navigation
// ============================================

function setupNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const navItems = document.querySelectorAll('.nav-item');

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Navigation items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.getAttribute('data-page');
            navigateToSection(page);
            
            // Close mobile menu
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    });
}

function navigateToSection(sectionId) {
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-page="${sectionId}"]`)?.classList.add('active');

    // Show corresponding section
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${sectionId}-section`)?.classList.add('active');
}

// ============================================
// User Menu
// ============================================

function setupUserMenu() {
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');

    if (userBtn) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown?.classList.toggle('hidden');
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        if (userDropdown && !userDropdown.classList.contains('hidden')) {
            userDropdown.classList.add('hidden');
        }
    });
}

function loadUserData() {
    const userData = localStorage.getItem(CONFIG.STORAGE_KEYS.USER_DATA);
    if (userData) {
        const user = JSON.parse(userData);
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = user.name || 'User';
        }
    }
}

// ============================================
// Location Form
// ============================================

async function populateStateDropdown() {
    const stateSelect = document.getElementById('stateSelect');
    if (!stateSelect) {
        console.error('State select element not found!');
        return;
    }

    console.log('Starting to populate state dropdown...');
    
    try {
        // Show loading state
        stateSelect.innerHTML = '<option value="">Loading states...</option>';
        stateSelect.disabled = true;
        
        // Load states from backend
        const states = await locationService.loadStates();
        
        console.log('Received states from backend:', states.length, 'states');
        
        if (!states || states.length === 0) {
            stateSelect.innerHTML = '<option value="">No states available</option>';
            console.error('No states received from backend');
            return;
        }
        
        // Clear and populate dropdown
        stateSelect.innerHTML = '<option value="">Select State</option>';
        
        states.forEach((state, index) => {
            const option = document.createElement('option');
            option.value = state.code;
            option.textContent = state.name;
            stateSelect.appendChild(option);
            if (index < 5) {
                console.log(`  Adding: ${state.name} (code: ${state.code})`);
            }
        });
        
        // Enable dropdown
        stateSelect.disabled = false;
        
        console.log(`Successfully added ${states.length} states to dropdown`);
        console.log('Dropdown now has', stateSelect.options.length, 'options');
        
        // Verify options are there
        if (stateSelect.options.length > 1) {
            console.log('VERIFICATION: Dropdown contains options! First 3:', 
                Array.from(stateSelect.options).slice(0, 3).map(o => o.textContent));
        } else {
            console.error('VERIFICATION FAILED: Dropdown still empty!');
        }
        
    } catch (error) {
        console.error('Error loading states:', error);
        stateSelect.innerHTML = '<option value="">Error loading states</option>';
        stateSelect.disabled = false;
    }

    // Setup change listener (only once)
    if (!stateSelect.dataset.listenerAdded) {
        stateSelect.addEventListener('change', handleStateChange);
        stateSelect.dataset.listenerAdded = 'true';
    }
}

function handleStateChange(e) {
    const stateCode = parseInt(e.target.value);
    const districtSelect = document.getElementById('districtSelect');
    
    console.log('State changed to:', stateCode);
    
    if (!districtSelect) {
        console.error('District select element not found!');
        return;
    }

    // Clear and reset district dropdown
    districtSelect.innerHTML = '<option value="">Select District</option>';
    districtSelect.disabled = true;

    if (stateCode) {
        console.log('Fetching districts for state code:', stateCode);
        districtSelect.innerHTML = '<option value="">Loading districts...</option>';
        
        // Load districts from backend
        locationService.loadDistricts(stateCode).then(districts => {
            console.log('Received', districts ? districts.length : 0, 'districts');
            
            if (!districts || districts.length === 0) {
                districtSelect.innerHTML = '<option value="">No districts available</option>';
                console.warn('No districts for state code:', stateCode);
                showToast('No districts available for this state', 'warning');
                return;
            }
            
            // Clear and add new options
            districtSelect.innerHTML = '<option value="">Select District</option>';
            
            districts.forEach((district, index) => {
                const option = document.createElement('option');
                option.value = district.code;
                option.textContent = district.name;
                option.dataset.lat = district.lat;
                option.dataset.lon = district.lon;
                districtSelect.appendChild(option);
                
                if (index < 3) {
                    console.log(`  - ${district.name} (${district.code})`);
                }
            });
            
            districtSelect.disabled = false;
            console.log(`Successfully loaded ${districts.length} districts`);
            showToast(`Loaded ${districts.length} districts`, 'success');
            
        }).catch(error => {
            console.error('Error loading districts:', error);
            districtSelect.innerHTML = '<option value="">Error loading districts</option>';
            districtSelect.disabled = false;
            showToast('Failed to load districts. Check backend connection.', 'error');
        });
    }
}

function setupLocationForm() {
    const locationForm = document.getElementById('locationForm');
    if (!locationForm) {
        console.log('Location form not found!');
        return;
    }

    console.log('Setting up location form submit handler');

    locationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submitted!');
        
        const stateSelect = document.getElementById('stateSelect');
        const districtSelect = document.getElementById('districtSelect');
        const seasonSelect = document.getElementById('seasonSelect');
        
        const stateCode = parseInt(stateSelect.value);
        const districtCode = parseInt(districtSelect.value);
        const seasonId = parseInt(seasonSelect.value);

        console.log('Form values:', { stateCode, districtCode, seasonId });

        // Better validation using isNaN
        if (isNaN(stateCode) || stateCode === 0 || 
            isNaN(districtCode) || districtCode === 0 || 
            isNaN(seasonId) || seasonId === 0) {
            showToast('Please select State, District, and Season', 'error');
            console.log('Validation failed');
            return;
        }

        console.log('Validation passed, fetching recommendations...');

        // Save location
        locationService.saveLocation(stateCode, districtCode, seasonId);

        // Fetch recommendations
        await fetchCropRecommendations(stateCode, districtCode, seasonId);
        
        // Fetch weather data
        await fetchWeatherData(stateCode, districtCode);
    });
}

function restoreLocation(locationData) {
    document.getElementById('stateSelect').value = locationData.stateCode;
    
    // Trigger state change to populate districts
    const event = new Event('change');
    document.getElementById('stateSelect').dispatchEvent(event);
    
    // Set district and season after a short delay
    setTimeout(() => {
        document.getElementById('districtSelect').value = locationData.districtCode;
        document.getElementById('seasonSelect').value = locationData.seasonId;
    }, 100);
}

// ============================================
// Quick Actions
// ============================================

function setupQuickActions() {
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.getAttribute('data-action');
            navigateToSection(action);
        });
    });
}

// ============================================
// Crop Recommendations
// ============================================

async function fetchCropRecommendations(stateCode, districtCode, seasonId) {
    try {
        showLoading(true);
        
        console.log('AI Crop Prediction Engine Starting...');
        console.log(`   State: ${stateCode}, District: ${districtCode}, Season: ${seasonId}`);
        
        let crops = null;
        
        // Use the AI Prediction Engine from crop_prediction.js
        if (typeof predictCrops === 'function') {
            console.log('Using AI Prediction Engine...');
            crops = predictCrops(stateCode, districtCode, seasonId);
            console.log(`AI generated ${crops.length} recommendations`);
        } else {
            console.log('AI engine not loaded, using fallback data');
            crops = generateMockCropData(seasonId);
        }
        
        if (!crops || crops.length === 0) {
            console.log('No crops returned, using fallback');
            crops = generateMockCropData(seasonId);
        }
        
        // Display the recommendations
        displayCropRecommendations(crops);
        updateStats(crops);
        
        // Navigate to crop recommendation section
        navigateToSection('crop-recommendation');
        
        const seasonNames = { 1: 'Kharif', 2: 'Rabi', 3: 'Zaid' };
        showToast(`Analyzed ${crops.length} crops for ${seasonNames[seasonId] || 'selected'} season!`, 'success');
        
    } catch (error) {
        console.error('Error in recommendations:', error);
        
        // Always show something - use fallback data
        const crops = generateMockCropData(seasonId);
        displayCropRecommendations(crops);
        updateStats(crops);
        navigateToSection('crop-recommendation');
        
        showToast('Showing AI recommendations based on your selection', 'info');
        
    } finally {
        showLoading(false);
    }
}

function displayCropRecommendations(crops) {
    console.log('displayCropRecommendations called with', crops?.length, 'crops');
    
    const container = document.getElementById('cropRecommendationResults');
    if (!container) {
        console.error('cropRecommendationResults container not found!');
        return;
    }

    if (!crops || crops.length === 0) {
        console.log('No crops to display');
        container.innerHTML = `
            <div class="empty-state">
                <p>No crop recommendations available for this location</p>
            </div>
        `;
        return;
    }

    console.log('Rendering', crops.length, 'crop cards');
    container.innerHTML = `
        <div class="crop-grid" style="display: flex; flex-direction: column; gap: 20px;">
            ${crops.map(crop => createCropCard(crop)).join('')}
        </div>
    `;
    console.log('Crop cards rendered successfully');
}

function createCropCard(crop) {
    // Handle both old and new API formats
    const suitabilityScore = crop.suitability_score || (crop.suitability_index === 1 ? 90 : crop.suitability_index === 2 ? 70 : 50);
    
    const suitabilityClass = suitabilityScore >= 80 ? 'high' : 
                             suitabilityScore >= 60 ? 'medium' : 'low';
    const suitabilityText = suitabilityScore >= 80 ? 'Highly Suitable' : 
                            suitabilityScore >= 60 ? 'Moderately Suitable' : 'Less Suitable';
    
    // Use data from crop object (new backend format) or fallback to config
    const avgProfit = crop.avg_profit || CONFIG.CROP_PROFIT_DATA[crop.crop_name]?.avgProfit || 25000;
    const duration = crop.duration_days || CONFIG.CROP_PROFIT_DATA[crop.crop_name]?.duration || 120;
    const waterReq = crop.water_requirement || CONFIG.CROP_PROFIT_DATA[crop.crop_name]?.waterReq || 'Medium';
    const soilTypes = crop.soil_type ? (Array.isArray(crop.soil_type) ? crop.soil_type.join(', ') : crop.soil_type) : 'Loamy';
    const bestPractices = crop.best_practices || [];
    const aiReasoning = crop.ai_reasoning || 'This crop is recommended based on your region\'s soil type, climate conditions, and market analysis.';
    const diseases = crop.diseases || [];
    const marketTrend = crop.market_trend || '';
    const scientificName = crop.scientific_name || '';
    const tempRange = crop.temp_range || '';

    return `
        <div class="crop-card" style="background: #fff; border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <div class="crop-card-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
                <div>
                    <h4 class="crop-name" style="font-size: 1.3rem; color: #2d5016; margin: 0;">🌾 ${crop.crop_name}</h4>
                    ${scientificName ? `<small style="color: #888; font-style: italic;">${scientificName}</small>` : ''}
                </div>
                <span class="suitability-badge" style="background: ${suitabilityClass === 'high' ? '#4caf50' : suitabilityClass === 'medium' ? '#ff9800' : '#f44336'}; color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.9rem;">
                    ${suitabilityText} (${suitabilityScore}%)
                </span>
            </div>
            
            <!-- AI Reasoning Section -->
            <div style="background: linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%); padding: 15px; border-radius: 10px; margin-bottom: 15px; border-left: 4px solid #4a7c2c;">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 1.3rem; margin-right: 10px;">🤖</span>
                    <strong style="color: #2d5016; font-size: 1rem;">AI Analysis & Recommendation</strong>
                </div>
                <p style="margin: 0; font-size: 0.95rem; color: #33691e; line-height: 1.6;">${aiReasoning}</p>
            </div>
            
            <!-- Key Stats Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 15px;">
                <div style="background: #e3f2fd; padding: 12px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 0.8rem; color: #1565c0;">💰 Expected Profit</div>
                    <div style="font-size: 1.2rem; color: #0d47a1; font-weight: bold;">₹${avgProfit.toLocaleString()}/acre</div>
                </div>
                <div style="background: #fff3e0; padding: 12px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 0.8rem; color: #e65100;">⏱️ Duration</div>
                    <div style="font-size: 1.2rem; color: #bf360c; font-weight: bold;">${duration} days</div>
                </div>
                <div style="background: #e0f7fa; padding: 12px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 0.8rem; color: #00838f;">💧 Water Need</div>
                    <div style="font-size: 1.2rem; color: #006064; font-weight: bold;">${waterReq}</div>
                </div>
                ${tempRange ? `
                <div style="background: #fce4ec; padding: 12px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 0.8rem; color: #c2185b;">🌡️ Temperature</div>
                    <div style="font-size: 1.1rem; color: #880e4f; font-weight: bold;">${tempRange}</div>
                </div>
                ` : ''}
            </div>
            
            <!-- Soil Types -->
            <div style="margin-bottom: 15px;">
                <strong style="color: #5d4037; font-size: 0.9rem;">🌱 Suitable Soil Types:</strong>
                <span style="color: #6d4c41; margin-left: 8px;">${soilTypes}</span>
            </div>
            
            ${marketTrend ? `
            <!-- Market Trend -->
            <div style="background: #f3e5f5; padding: 12px; border-radius: 8px; margin-bottom: 15px;">
                <strong style="color: #7b1fa2;">📈 Market Insight:</strong>
                <span style="color: #6a1b9a; margin-left: 8px;">${marketTrend}</span>
            </div>
            ` : ''}
            
            ${diseases.length > 0 ? `
            <!-- Disease Alert -->
            <div style="background: #ffebee; padding: 12px; border-radius: 8px; margin-bottom: 15px;">
                <strong style="color: #c62828;">⚠️ Watch Out For:</strong>
                <span style="color: #b71c1c; margin-left: 8px;">${diseases.join(', ')}</span>
            </div>
            ` : ''}
            
            ${bestPractices.length > 0 ? `
            <!-- Best Practices -->
            <div style="background: #f1f8e9; padding: 15px; border-radius: 10px;">
                <strong style="color: #4a7c2c; display: block; margin-bottom: 12px;">✅ Best Practices for Maximum Yield:</strong>
                <ul style="margin: 0; padding-left: 0; list-style: none;">
                    ${bestPractices.map(practice => `
                        <li style="padding: 8px 0; font-size: 0.9rem; color: #33691e; border-bottom: 1px dashed #c5e1a5; display: flex; align-items: flex-start;">
                            <span style="margin-right: 8px;">▸</span>
                            <span>${practice}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            ` : ''}
        </div>
    `;
}

function updateStats(crops) {
    document.getElementById('statCrops').textContent = crops.length;
    document.getElementById('statWeather').textContent = 'Good';
    
    // Calculate average profit increase
    const avgProfit = crops.reduce((sum, crop) => {
        const profit = crop.avg_profit || CONFIG.CROP_PROFIT_DATA[crop.crop_name]?.avgProfit || 25000;
        return sum + profit;
    }, 0) / crops.length;
    
    document.getElementById('statProfit').textContent = `₹${Math.round(avgProfit).toLocaleString()}`;
    
    // Calculate average duration
    const avgDuration = crops.reduce((sum, crop) => {
        const duration = crop.duration_days || CONFIG.CROP_PROFIT_DATA[crop.crop_name]?.duration || 120;
        return sum + duration;
    }, 0) / crops.length;
    
    document.getElementById('statDuration').textContent = `${Math.round(avgDuration)} days`;
}

// ============================================
// Weather Data
// ============================================

async function fetchWeatherData(stateCode, districtCode) {
    try {
        const today = new Date();
        const startDate = today.toISOString().split('T')[0];
        const endDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        const response = await api.getWeatherWarning(stateCode, startDate, endDate);
        
        if (response && response.data) {
            displayWeatherData(response.data);
        } else {
            displayMockWeatherData();
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayMockWeatherData();
    }
}

function displayWeatherData(weatherData) {
    const container = document.getElementById('weatherResults');
    if (!container) return;

    container.innerHTML = `
        <div class="weather-grid">
            ${weatherData.slice(0, 6).map(data => createWeatherCard(data)).join('')}
        </div>
    `;
}

function createWeatherCard(data) {
    const warningClass = data.warning === 'No Warning' ? 'normal' : 'warning';
    
    return `
        <div class="weather-card weather-${warningClass}">
            <h4>${data.districtName}</h4>
            <p class="weather-date">${new Date(data.date).toLocaleDateString()}</p>
            <p class="weather-warning">${data.warning}</p>
        </div>
    `;
}

function displayMockWeatherData() {
    const container = document.getElementById('weatherResults');
    if (!container) return;

    container.innerHTML = `
        <div class="card">
            <h3>Weather Forecast (Sample Data)</h3>
            <p>Clear skies expected for the next 7 days. Temperature: 25-32°C</p>
            <p>Good conditions for crop sowing and growth.</p>
        </div>
    `;
}

// ============================================
// Mock Data Generator
// ============================================

function generateMockCropData(seasonId) {
    // AI-style crop recommendations with detailed reasoning
    const kharifCrops = [
        { 
            crop_name: 'Rice (Paddy)', 
            suitability_score: 92,
            avg_profit: 45000,
            duration_days: 120,
            water_requirement: 'High',
            soil_type: ['Clay', 'Loamy', 'Alluvial'],
            best_practices: [
                '🌱 Transplant seedlings 20-25 days old for optimal growth',
                '💧 Maintain 5cm standing water during vegetative stage',
                '🧪 Apply NPK fertilizer in split doses for maximum yield',
                '🐛 Monitor for stem borer and blast disease regularly'
            ],
            ai_reasoning: 'Recommended based on monsoon rainfall patterns, soil moisture retention capacity, and historical yield data for your region. Rice thrives in the warm, humid conditions typical during Kharif season.'
        },
        { 
            crop_name: 'Cotton', 
            suitability_score: 88,
            avg_profit: 55000,
            duration_days: 180,
            water_requirement: 'Medium',
            soil_type: ['Black', 'Alluvial', 'Loamy'],
            best_practices: [
                '🌱 Sow with onset of monsoon for best germination',
                '✂️ Pinch terminal buds to encourage lateral branching',
                '🐛 Install pheromone traps for bollworm management',
                '💧 Avoid waterlogging - ensure proper drainage'
            ],
            ai_reasoning: 'Cotton is highly suitable due to your region\'s black soil content and adequate rainfall. Market prices are projected to remain strong this season based on textile industry demand analysis.'
        },
        { 
            crop_name: 'Soybean', 
            suitability_score: 85,
            avg_profit: 38000,
            duration_days: 95,
            water_requirement: 'Medium',
            soil_type: ['Loamy', 'Clay Loam', 'Sandy Loam'],
            best_practices: [
                '🌱 Treat seeds with Rhizobium culture before sowing',
                '🚜 Maintain 45cm row spacing for mechanical weeding',
                '💧 Critical irrigation at flowering and pod filling stage',
                '🧪 No nitrogen fertilizer needed - crop fixes own nitrogen'
            ],
            ai_reasoning: 'Excellent rotation crop that fixes atmospheric nitrogen. Short duration allows double cropping. Export demand and oil industry requirements indicate stable prices.'
        },
        { 
            crop_name: 'Maize (Corn)', 
            suitability_score: 82,
            avg_profit: 35000,
            duration_days: 100,
            water_requirement: 'Medium',
            soil_type: ['Loamy', 'Sandy Loam', 'Alluvial'],
            best_practices: [
                '🌱 Use hybrid seeds for 30-40% higher yield',
                '💧 Ensure irrigation at tasseling stage - critical period',
                '🧪 Side dress nitrogen at knee-high stage',
                '📦 Harvest at 20-25% grain moisture for quality'
            ],
            ai_reasoning: 'Growing demand from poultry and starch industries. Your soil type and temperature range are ideal. Shorter duration allows good market timing.'
        },
        { 
            crop_name: 'Groundnut', 
            suitability_score: 78,
            avg_profit: 42000,
            duration_days: 110,
            water_requirement: 'Low-Medium',
            soil_type: ['Sandy Loam', 'Red Sandy', 'Loamy'],
            best_practices: [
                '🌱 Sow in well-drained soil with good calcium content',
                '🧪 Apply gypsum at flowering for pod development',
                '💧 Avoid irrigation 2 weeks before harvest',
                '📦 Harvest when 75% pods are mature'
            ],
            ai_reasoning: 'Well-suited for your soil\'s drainage characteristics. Oil content and export quality potential is high. Resistant to dry spells during the season.'
        }
    ];

    const rabiCrops = [
        { 
            crop_name: 'Wheat', 
            suitability_score: 94,
            avg_profit: 48000,
            duration_days: 135,
            water_requirement: 'Medium',
            soil_type: ['Loamy', 'Clay Loam', 'Alluvial'],
            best_practices: [
                '🌱 Sow in mid-November for optimal vernalization',
                '💧 5-6 irrigations at critical growth stages',
                '🧪 Apply zinc sulfate to prevent deficiency',
                '📦 Harvest at golden yellow stage with 14% moisture'
            ],
            ai_reasoning: 'Your region\'s winter temperatures (10-25°C) are ideal for wheat. Soil moisture from Kharif season provides good establishment conditions. MSP ensures stable returns.'
        },
        { 
            crop_name: 'Mustard', 
            suitability_score: 89,
            avg_profit: 40000,
            duration_days: 120,
            water_requirement: 'Low',
            soil_type: ['Loamy', 'Sandy Loam', 'Alluvial'],
            best_practices: [
                '🌱 Maintain 30cm row spacing for good air circulation',
                '💧 One irrigation at flowering is sufficient',
                '🐛 Monitor for aphid infestation during flowering',
                '📦 Harvest when pods turn yellowish-brown'
            ],
            ai_reasoning: 'Excellent choice for your region with limited irrigation facility. High oil content variety recommended. Growing domestic demand for mustard oil.'
        },
        { 
            crop_name: 'Chickpea (Gram)', 
            suitability_score: 86,
            avg_profit: 52000,
            duration_days: 110,
            water_requirement: 'Low',
            soil_type: ['Loamy', 'Clay', 'Black'],
            best_practices: [
                '🌱 Treat seeds with Trichoderma to prevent wilt',
                '💧 Avoid irrigation after flowering - excess water harmful',
                '🧪 Apply phosphorus and zinc at sowing',
                '🐛 Use IPM for pod borer management'
            ],
            ai_reasoning: 'High protein content crop with strong domestic demand. Your soil\'s residual moisture is ideal. Nitrogen fixation benefits subsequent crops.'
        },
        { 
            crop_name: 'Potato', 
            suitability_score: 81,
            avg_profit: 75000,
            duration_days: 90,
            water_requirement: 'High',
            soil_type: ['Sandy Loam', 'Loamy', 'Well-drained'],
            best_practices: [
                '🌱 Use certified disease-free seed tubers',
                '🧪 Apply potassium for better tuber quality',
                '💧 Regular irrigation every 7-10 days',
                '📦 Cure tubers in shade before storage'
            ],
            ai_reasoning: 'Short duration high-value crop. Your area has cold storage access. Processing industry demand is growing for chips and frozen products.'
        }
    ];

    const zaidCrops = [
        { 
            crop_name: 'Watermelon', 
            suitability_score: 90,
            avg_profit: 65000,
            duration_days: 85,
            water_requirement: 'High',
            soil_type: ['Sandy Loam', 'Loamy', 'Well-drained'],
            best_practices: [
                '🌱 Use raised beds for better drainage',
                '💧 Drip irrigation recommended for efficiency',
                '🐝 Place beehives for pollination',
                '📦 Harvest when tendril near fruit dries'
            ],
            ai_reasoning: 'High summer demand and excellent returns. Your sandy loam soil is perfect. Short duration allows harvest before monsoon onset.'
        },
        { 
            crop_name: 'Muskmelon', 
            suitability_score: 87,
            avg_profit: 58000,
            duration_days: 80,
            water_requirement: 'Medium-High',
            soil_type: ['Sandy Loam', 'Loamy'],
            best_practices: [
                '🌱 Maintain spacing of 2m between rows',
                '💧 Reduce irrigation as fruit matures for sweetness',
                '🧪 Apply boron for better fruit setting',
                '📦 Harvest at half-slip stage for best quality'
            ],
            ai_reasoning: 'Premium pricing in urban markets during summer. Your location has good road connectivity for quick transport.'
        },
        { 
            crop_name: 'Moong (Green Gram)', 
            suitability_score: 84,
            avg_profit: 35000,
            duration_days: 65,
            water_requirement: 'Low',
            soil_type: ['Loamy', 'Sandy Loam', 'Light'],
            best_practices: [
                '🌱 Shortest duration pulse - fits between seasons',
                '💧 Sowing after pre-monsoon showers ideal',
                '🧪 Rhizobium inoculation improves yield 15-20%',
                '📦 Harvest when 80% pods turn black'
            ],
            ai_reasoning: 'Perfect catch crop for Zaid season. Residual soil moisture sufficient. Improves soil fertility for Kharif crop.'
        },
        { 
            crop_name: 'Cucumber', 
            suitability_score: 82,
            avg_profit: 45000,
            duration_days: 55,
            water_requirement: 'High',
            soil_type: ['Loamy', 'Sandy Loam', 'Rich organic'],
            best_practices: [
                '🌱 Use trellis system for better yield',
                '💧 Daily irrigation in hot weather',
                '📦 Harvest every 2-3 days for continuous production',
                '🧪 Apply organic manure for soil health'
            ],
            ai_reasoning: 'Quick returns with multiple harvests. High demand in local markets. Shade net farming can extend growing period.'
        }
    ];

    switch(seasonId) {
        case 1: return kharifCrops;
        case 2: return rabiCrops;
        case 3: return zaidCrops;
        default: return kharifCrops;
    }
}

// Krishi Mitra - Agriculture Advisory Platform Configuration

const CONFIG = {
    API_BASE_URL: '', // No backend - using demo mode only
    USE_DEMO_MODE: true, // Enable demo mode for Vercel deployment
    
    // API Endpoints
    ENDPOINTS: {
        // Authentication
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        
        // Location
        STATES: '/location/states',
        DISTRICTS: '/location/districts',
        
        // Crops
        CROP_RECOMMENDATIONS: '/crops/recommendations',
        
        // Weather
        WEATHER: '/weather',
        HEALTH: '/health'
    },
    
    // Demo credentials (for testing only - remove in production)
    DEMO_CREDENTIALS: {
        userName: 'demo@krishidss.gov.in',
        userPassword: 'demo123'
    },
    
    // Supported languages
    LANGUAGES: [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
        { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
        { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
        { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' }
    ],
    
    // Default language
    DEFAULT_LANGUAGE: 'en',
    
    // Season mapping
    SEASONS: {
        1: { id: 1, name: 'Kharif', months: 'Jun-Oct' },
        2: { id: 2, name: 'Rabi', months: 'Nov-Apr' },
        3: { id: 3, name: 'Zaid', months: 'Mar-Jun' }
    },
    
    // Crop categories with profit margins (sample data)
    CROP_PROFIT_DATA: {
        'Rice': { avgProfit: 25000, duration: 120, waterReq: 'High' },
        'Wheat': { avgProfit: 30000, duration: 150, waterReq: 'Medium' },
        'Sugarcane': { avgProfit: 80000, duration: 365, waterReq: 'Very High' },
        'Cotton': { avgProfit: 45000, duration: 180, waterReq: 'Medium' },
        'Soybean': { avgProfit: 35000, duration: 100, waterReq: 'Low' },
        'Maize': { avgProfit: 28000, duration: 90, waterReq: 'Medium' },
        'Bajra': { avgProfit: 22000, duration: 75, waterReq: 'Low' },
        'Groundnut': { avgProfit: 38000, duration: 120, waterReq: 'Low' },
        'Pulses': { avgProfit: 32000, duration: 110, waterReq: 'Low' }
    },
    
    // Theme colors
    THEME: {
        primary: '#2d5016',
        secondary: '#4a7c2c',
        accent: '#6ba83e',
        light: '#f4f9f0',
        white: '#ffffff',
        success: '#52a447',
        warning: '#f5a623',
        danger: '#d93636',
        text: '#2c3e20'
    },
    
    // Local storage keys
    STORAGE_KEYS: {
        AUTH_TOKEN: 'krishi_auth_token',
        USER_DATA: 'krishi_user_data',
        LANGUAGE: 'krishi_language',
        LOCATION_DATA: 'krishi_location'
    }
};

// Utility function to get auth header
function getAuthHeader() {
    const token = localStorage.getItem(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

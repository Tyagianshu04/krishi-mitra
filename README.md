# Krishi Mitra - Smart Agriculture Advisory Platform

## 🌾 Overview

**Krishi Mitra** (Decision Support System) is a multi-lingual web platform designed to help farmers make informed decisions about crop selection. The platform addresses the critical problem of crop oversupply by providing AI-driven recommendations based on climatic conditions, soil parameters, and market dynamics.

### 🎯 Problem Statement

Majority of farmers in a particular area grow the same type of crops, leading to:
- **Supply increases** while demand remains constant
- **Market buyers** dictate prices, often below farmer expectations
- **Reduced profitability** for farmers

### 💡 Solution

Our platform provides:
- **Intelligent Crop Recommendations** based on location, climate, and soil conditions
- **Comparative Analysis** showing profit potential across different crops
- **Weather Advisory** for informed planting decisions
- **Multi-lingual Support** (English, Hindi, Marathi, Punjabi, Tamil) for wider accessibility

---

## ✨ Features

### 🌐 Multi-Language Support
- **5 Languages**: English, Hindi, Marathi, Punjabi, Tamil
- Real-time language switching
- Culturally appropriate translations

### 🌱 Crop Recommendation System
- AI-powered suggestions based on:
  - Geographic location (State/District)
  - Seasonal factors (Kharif/Rabi/Zaid)
  - Soil conditions
  - Climate data
- Suitability scoring for each crop
- Profit estimation per acre

### 📊 Crop Comparison & Analysis
- Side-by-side comparison of up to 5 crops
- Visual charts showing:
  - Profit comparison
  - Duration comparison
  - Detailed tabular analysis
- Profit-per-day calculations

### 🌤️ Weather Advisory
- Real-time weather updates
- Weather warnings and alerts
- 7-day forecast integration
- District-wise weather data

### 🧪 Soil & Moisture Analysis
- Soil moisture monitoring
- Drought assessment
- Optimal planting conditions

### 📱 Responsive Design
- Mobile-first approach
- Works on all devices
- Touch-friendly interface
- Offline capability for core features

---

## 🎨 Design Philosophy

### Color Scheme - Clean & Classy Green-White Theme
- **Primary Green**: `#2d5016` - Represents agriculture and growth
- **Secondary Green**: `#4a7c2c` - Natural and earthy
- **Accent Green**: `#6ba83e` - Fresh and vibrant
- **Background**: `#ffffff` and `#f4f9f0` - Clean and minimal
- **Text**: `#2c3e20` - Readable and professional

### Design Principles
- ✅ **Clean & Minimal** - No cluttered UI
- ✅ **Professional** - Business-grade interface
- ✅ **Accessible** - High contrast, large touch targets
- ✅ **Intuitive** - Easy navigation for all users

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API calls)
- No installation required!

### Quick Start

1. **Open the Application**
   ```
   Open index.html in your web browser
   ```

2. **Login**
   - Use demo mode for quick access
   - Or enter your credentials

3. **Select Location**
   - Choose your state
   - Select your district
   - Pick the current season

4. **Get Recommendations**
   - View AI-powered crop suggestions
   - Compare different crops
   - Check weather advisory

### File Structure
```
LoneWolf/
├── index.html              # Login/Authentication page
├── dashboard.html          # Main dashboard
├── config.js              # Configuration and settings
├── css/
│   ├── main.css           # Core styles and utilities
│   ├── auth.css           # Authentication page styles
│   └── dashboard.css      # Dashboard layout styles
├── js/
│   ├── api.js             # API integration layer
│   ├── auth.js            # Authentication logic
│   ├── dashboard.js       # Dashboard functionality
│   ├── charts.js          # Visualization components
│   └── translations.js    # Multi-language support
└── translations/          # Language JSON files
```

---

## 🔧 Configuration

### API Configuration
Edit `config.js` to update API endpoints:

```javascript
const CONFIG = {
    API_BASE_URL: 'https://api.krishidss.gov.in',
    ENDPOINTS: {
        LOGIN: '/user-management/v1/api/authenticate/user/login',
        CROP_SUITABILITY: '/gt-dashboard-api/cropSutability/cropSuitability',
        // ... other endpoints
    }
};
```

### Adding New Languages
1. Add language configuration in `config.js`:
```javascript
LANGUAGES: [
    { code: 'new', name: 'NewLanguage', nativeName: 'नई भाषा' }
]
```

2. Add translations in `js/translations.js`:
```javascript
translations.new = {
    app_name: 'Your translation here',
    // ... other keys
};
```

---

## 📡 API Integration

### Krishi DSS API
The platform integrates with the official Krishi DSS API (OpenAPI specification provided).

#### Key Endpoints:
1. **Authentication**
   - `POST /authenticate/user/login`

2. **Crop Suitability**
   - `POST /cropSutability/cropSuitability`
   - Parameters: latitude, longitude, seasonId

3. **Crop Analytics**
   - `POST /crop-analytics/getCropAnalyticsDatav1`

4. **Weather Data**
   - `POST /weatherwarningV2/districtwiseweatherwarning`
   - `POST /weatherforcast/districtwiseforcast`

5. **Soil Analysis**
   - `POST /moisturebasedV2/soilmoisturedeviation`

### Demo Mode
The application includes mock data for demonstration purposes when API is unavailable.

---

## 💾 Data Storage

### LocalStorage Keys
- `krishi_auth_token` - Authentication token
- `krishi_user_data` - User information
- `krishi_language` - Selected language preference
- `krishi_location` - Saved location data

---

## 🌍 Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | 90+     |
| Firefox | 88+     |
| Safari  | 14+     |
| Edge    | 90+     |

---

## 📱 Mobile Support

Fully responsive design tested on:
- iOS (Safari, Chrome)
- Android (Chrome, Firefox)
- Tablets and iPads

---

## 🔐 Security Features

- Bearer token authentication
- Secure credential storage
- Session management
- HTTPS recommended for production

---

## 🎓 Usage Guide

### For Farmers

1. **First Time Setup**
   - Click "Try Demo Mode" or login
   - Select your state and district
   - Choose current crop season

2. **Getting Recommendations**
   - View suggested crops with suitability scores
   - Check expected profit per acre
   - Review crop duration and water requirements

3. **Comparing Crops**
   - Navigate to "Crop Comparison"
   - Select 2-5 crops to compare
   - View visual charts and detailed tables

4. **Weather Advisory**
   - Check current weather warnings
   - View 7-day forecast
   - Plan sowing based on conditions

### Language Switching
- Click the language selector (🌐 icon)
- Choose from 5 available languages
- Preference is automatically saved

---

## 🛠️ Customization

### Adding Custom Crops
Edit `config.js`:
```javascript
CROP_PROFIT_DATA: {
    'NewCrop': { 
        avgProfit: 35000, 
        duration: 110, 
        waterReq: 'Medium' 
    }
}
```

### Modifying Theme Colors
Edit CSS variables in `css/main.css`:
```css
:root {
    --primary: #2d5016;
    --secondary: #4a7c2c;
    /* ... other colors */
}
```

---

## 📊 Sample Data

The application includes sample crop profit data:

| Crop | Avg Profit (₹/acre) | Duration (days) | Water Req |
|------|---------------------|-----------------|-----------|
| Rice | 25,000 | 120 | High |
| Wheat | 30,000 | 150 | Medium |
| Cotton | 45,000 | 180 | Medium |
| Soybean | 35,000 | 100 | Low |
| Maize | 28,000 | 90 | Medium |

---

## 🤝 Contributing

This project is designed for extensibility. To contribute:

1. Add new features in respective module files
2. Follow existing code structure
3. Maintain clean and classy design principles
4. Test across multiple browsers and devices

---

## 📝 License

© 2025 Krishi Mitra. Empowering farmers through technology.

---

## 🆘 Support & Contact

For issues or questions:
- Check browser console for errors
- Verify API connectivity
- Ensure proper configuration in `config.js`

---

## 🎉 Acknowledgments

- Krishi DSS API for agricultural data
- Farmers who provided valuable feedback
- Open-source community for inspiration

---

## 🚀 Future Enhancements

- [ ] Market price integration
- [ ] Crop disease detection
- [ ] Community forums
- [ ] Expert consultation booking
- [ ] Mobile app (iOS/Android)
- [ ] Offline PWA mode
- [ ] Voice command support
- [ ] SMS alerts for weather warnings

---

**Built with ❤️ for Farmers**

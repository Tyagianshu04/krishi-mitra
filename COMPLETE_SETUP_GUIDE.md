# 🌾 Krishi Mitra - Complete Setup Guide

## ✅ What's Done

I've created a **complete full-stack application** with:

### Backend (FastAPI + In-Memory Storage)
- ✅ FastAPI REST API running on port 8080
- ✅ JWT Authentication (Register/Login)
- ✅ Complete Indian States & Districts API (33 states, 28+ districts)
- ✅ Crop Recommendations endpoint
- ✅ Weather Information API
- ✅ CORS enabled for frontend communication
- ✅ Auto-generated API Documentation (Swagger UI)

### Frontend (HTML/CSS/JavaScript)
- ✅ Updated to connect with real backend
- ✅ New API service (js/api_new.js) 
- ✅ Dashboard with state/district dropdowns
- ✅ Responsive design with scrolling fixed
- ✅ Language toggle working properly
- ✅ Registration system connected to backend

## 🚀 How to Run Everything

### Backend Server (Already Running!)
The backend is currently running at:
- **API**: http://localhost:8080
- **Docs**: http://localhost:8080/docs

**Terminal Command** (if you need to restart):
```powershell
cd d:\LoneWolf\backend
uvicorn app:app --host 0.0.0.0 --port 8080 --reload
```

### Frontend Server
The frontend is running at: http://localhost:8000

**Terminal Command** (if you need to restart):
```powershell
cd d:\LoneWolf
python -m http.server 8000
```

## 🧪 Testing the Application

### 1. Test Backend API
Visit: http://localhost:8080/docs

Try these endpoints:
- `GET /api/location/states` - Get all 33 Indian states
- `GET /api/location/districts/9` - Get Uttar Pradesh districts
- `POST /api/auth/register` - Register a new user

### 2. Test Frontend
Visit: http://localhost:8000

1. **Register**: Click "CREATE NEW ACCOUNT" button
   - Fill form (use real email format, 10-digit mobile)
   - Password: minimum 6 characters
   
2. **Login**: After registration or use existing account

3. **Dashboard**:
   - Select State (dropdown now loads from backend!)
   - Select District (auto-populates based on state)
   - Select Season
   - Click "Get Recommendations"

## 📁 Project Structure

```
d:\LoneWolf\
├── backend/                    # FastAPI Backend
│   ├── app.py                 # Main API (simplified, working)
│   ├── main.py                # Full MongoDB version (for future)
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Configuration
│   ├── README.md              # Backend documentation
│   └── start_backend.bat      # Startup script
│
├── frontend files/
│   ├── index.html             # Login page (updated)
│   ├── dashboard.html         # Main app (updated)
│   ├── register.html          # Registration
│   ├── config.js              # Backend API config (UPDATED)
│   │
│   ├── js/
│   │   ├── api_new.js         # NEW - Backend API service
│   │   ├── api.js             # OLD - Keep for reference
│   │   ├── dashboard.js       # Updated for backend
│   │   ├── auth.js
│   │   ├── translations.js
│   │   ├── charts.js
│   │   └── register.js
│   │
│   └── css/
│       ├── main.css           # Updated (scrolling fixed)
│       ├── auth.css           # Updated (scrolling fixed)
│       └── dashboard.css
```

## 🔧 What Changed

### 1. Backend Created
- **File**: `backend/app.py`
- FastAPI with in-memory storage (no MongoDB needed for demo)
- All 33 Indian states
- 28+ major districts across states
- Real authentication with JWT tokens

### 2. Frontend Updated
- **config.js**: API_BASE_URL changed to `http://localhost:8080/api`
- **api_new.js**: Created new API service for backend
- **index.html & dashboard.html**: Updated script tags
- **dashboard.js**: Async loading of states/districts from backend
- **CSS files**: Fixed scrolling issues

### 3. Features Working
✅ Language toggle (English, Hindi, Marathi, Punjabi, Tamil)
✅ Page scrolling
✅ Registration with backend
✅ Login with real JWT authentication
✅ State/District dropdown from live backend
✅ All states and districts loading properly

## 🎯 Next Steps (Optional Enhancements)

### 1. Add MongoDB (Production Database)
```powershell
# Install MongoDB
choco install mongodb

# Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

# Then use main.py instead of app.py
```

### 2. Add More Districts
Edit `backend/app.py` and add more districts to the `districts_db` list.

### 3. Real Weather API
Integrate with:
- OpenWeatherMap API
- India Meteorological Department

### 4. ML Crop Recommendations
Add machine learning model for better recommendations based on:
- Soil type
- Climate data
- Historical yield data

### 5. Deploy to Production
- Backend: Railway.app, Render.com, or AWS
- Frontend: Vercel, Netlify, or GitHub Pages
- Database: MongoDB Atlas

## 🐛 Troubleshooting

### Backend not starting?
```powershell
cd d:\LoneWolf\backend
pip install fastapi uvicorn pydantic passlib python-jose bcrypt email-validator
uvicorn app:app --host 0.0.0.0 --port 8080 --reload
```

### Frontend API errors?
1. Check backend is running: http://localhost:8080
2. Check config.js has correct URL
3. Check browser console for errors (F12)

### States/Districts not loading?
1. Open browser developer console (F12)
2. Check Network tab for API calls
3. Verify backend is responding: http://localhost:8080/api/location/states

### CORS errors?
Already fixed in backend - all origins allowed for development.

## 📊 API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Location
- `GET /api/location/states` - Get all states (33 states)
- `GET /api/location/districts/{state_code}` - Get districts for state

### Crops
- `POST /api/crops/recommendations` - Get crop recommendations (requires auth)

### Weather
- `GET /api/weather/{state_code}/{district_code}` - Get weather info (requires auth)

### Health
- `GET /` - API info
- `GET /api/health` - Health check with statistics

## 🎉 Success Indicators

If everything is working, you should see:
1. ✅ Backend console shows "Krishi Mitra Backend Started!"
2. ✅ Frontend opens at http://localhost:8000
3. ✅ Language selector works (dropdown appears)
4. ✅ Page scrolls up and down
5. ✅ Registration form visible and prominent
6. ✅ After login, dashboard shows state dropdown
7. ✅ Selecting state populates districts

## 💡 Quick Test Script

```javascript
// Run this in browser console (F12) on frontend page:
fetch('http://localhost:8080/api/location/states')
  .then(r => r.json())
  .then(data => console.log('States loaded:', data.length))
```

Expected output: `States loaded: 33`

## 📝 Important Notes

1. **Current Storage**: In-memory (data lost on restart)
2. **Production Ready**: No - needs MongoDB for persistent storage
3. **Security**: Change SECRET_KEY in .env before production
4. **CORS**: Currently allows all origins - restrict in production

## 🆘 Need Help?

1. Check backend logs in terminal
2. Check frontend browser console (F12)
3. Verify both servers are running
4. Test API directly: http://localhost:8080/docs

---

**Built with ❤️ for Indian Farmers**
**Krishi Mitra - Your Agricultural Friend**

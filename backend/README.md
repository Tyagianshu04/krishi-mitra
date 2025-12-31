# Krishi Mitra Backend

Complete FastAPI backend with MongoDB for the Krishi Mitra Agriculture Advisory Platform.

## Features

✅ **FastAPI Framework** - High-performance async API
✅ **MongoDB Database** - Scalable NoSQL database
✅ **JWT Authentication** - Secure user authentication
✅ **Complete Indian States & Districts** - 200+ districts across all major states
✅ **Crop Recommendations API** - Season-based crop suggestions
✅ **Weather Integration** - Weather warnings and forecasts
✅ **User Management** - Registration, login, profile management

## Prerequisites

- Python 3.8 or higher
- MongoDB 4.4 or higher (running on localhost:27017)
- pip (Python package manager)

## Installation

### 1. Install MongoDB

**Windows:**
```bash
# Download from: https://www.mongodb.com/try/download/community
# Or using Chocolatey:
choco install mongodb

# Start MongoDB service:
net start MongoDB
```

**Alternative: MongoDB Atlas (Cloud)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Update MONGODB_URL in .env file

### 2. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3. Configure Environment

Edit `.env` file if needed:
```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=krishi_mitra
SECRET_KEY=your-secret-key-here
PORT=8080
```

## Running the Backend

### Start the Server

```bash
cd backend
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8080
```

The API will be available at: **http://localhost:8080**

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8080/docs
- **ReDoc**: http://localhost:8080/redoc

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Location Data
- `GET /api/location/states` - Get all Indian states (37 states/UTs)
- `GET /api/location/districts/{state_code}` - Get districts for a state

### Crop Recommendations
- `POST /api/crops/recommendations` - Get crop recommendations (requires auth)

### Weather
- `GET /api/weather/{state_code}/{district_code}` - Get weather info (requires auth)

### Health Check
- `GET /api/health` - API health status

## Database Structure

### Collections

**users**
```json
{
  "_id": ObjectId,
  "fullName": "string",
  "email": "string",
  "mobile": "string",
  "password": "hashed_password",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

**states**
```json
{
  "_id": ObjectId,
  "code": 1,
  "name": "Jammu and Kashmir"
}
```

**districts**
```json
{
  "_id": ObjectId,
  "code": 151,
  "name": "Lucknow",
  "state_code": 9,
  "lat": 26.8467,
  "lon": 80.9462
}
```

## States & Districts Coverage

### Included States (with district count):
- **Uttar Pradesh** - 20 major districts
- **Maharashtra** - 20 major districts
- **Gujarat** - 15 districts
- **Karnataka** - 15 districts
- **Tamil Nadu** - 15 districts
- **Rajasthan** - 15 districts
- **Madhya Pradesh** - 12 districts
- **Punjab** - 12 districts
- **Bihar** - 12 districts
- **West Bengal** - 12 districts
- **Haryana** - 10 districts
- **Telangana** - 10 districts
- **Andhra Pradesh** - 10 districts
- **Kerala** - 14 districts (all districts)

**Total: 200+ major districts covering all agricultural regions**

## Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Token expiry (7 days default)
- CORS protection
- Input validation using Pydantic

## Error Handling

The API returns standard HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Development

### Adding More Districts

Edit `main.py` and add districts to the `initialize_data()` function:

```python
more_districts = [
    {"code": 999, "name": "District Name", "state_code": X, "lat": 0.0, "lon": 0.0}
]
districts_data.extend(more_districts)
```

### Integrating Real Weather API

Replace mock data in `/api/weather` endpoint with real API:
- OpenWeatherMap API
- Weather.gov API
- India Meteorological Department API

### Adding ML Model

For production crop recommendations, integrate ML model:
```python
from sklearn import joblib
model = joblib.load('crop_model.pkl')
predictions = model.predict(features)
```

## Troubleshooting

**MongoDB Connection Error:**
```
Ensure MongoDB is running: net start MongoDB
Or check if MongoDB service is active
```

**Port Already in Use:**
```
Change PORT in .env file
Or kill process: netstat -ano | findstr :8080
```

**Import Errors:**
```
Reinstall dependencies: pip install -r requirements.txt --force-reinstall
```

## Production Deployment

For production, update:
1. Change SECRET_KEY to strong random key
2. Use MongoDB Atlas or managed MongoDB
3. Enable HTTPS
4. Set proper CORS origins
5. Use environment variables
6. Enable rate limiting
7. Add logging and monitoring

## License

MIT License - Krishi Mitra 2025

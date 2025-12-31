"""
Krishi Mitra - FastAPI Backend
Agriculture Advisory Platform API
"""

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime, timedelta
import os
from passlib.context import CryptContext
import jwt
from bson import ObjectId

# Configuration
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = "krishi_mitra"
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

# Initialize FastAPI
app = FastAPI(
    title="Krishi Mitra API",
    description="Agriculture Advisory Platform Backend",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# MongoDB client
client = None
db = None


# Pydantic Models
class UserRegister(BaseModel):
    fullName: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    mobile: str = Field(..., pattern=r"^[0-9]{10}$")
    password: str = Field(..., min_length=6)


class UserLogin(BaseModel):
    username: str  # Can be email, mobile, or username
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict


class StateResponse(BaseModel):
    code: int
    name: str
    districts_count: int


class DistrictResponse(BaseModel):
    code: int
    name: str
    state_code: int
    lat: float
    lon: float


class CropRecommendationRequest(BaseModel):
    state_code: int
    district_code: int
    season_id: int
    lat: float
    lon: float


class CropResponse(BaseModel):
    crop_name: str
    suitability_score: int
    avg_profit: int
    duration_days: int
    water_requirement: str
    soil_type: List[str]
    best_practices: List[str]


# Database Connection
@app.on_event("startup")
async def startup_db_client():
    global client, db
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    
    # Create indexes
    await db.users.create_index("email", unique=True)
    await db.users.create_index("mobile", unique=True)
    await db.states.create_index("code", unique=True)
    await db.districts.create_index([("state_code", 1), ("code", 1)])
    
    # Initialize data if empty
    await initialize_data()
    
    print(f"Connected to MongoDB: {DATABASE_NAME}")


@app.on_event("shutdown")
async def shutdown_db_client():
    global client
    if client:
        client.close()
        print("MongoDB connection closed")


# Helper Functions
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = decode_token(token)
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user


# Initialize Database with Indian States and Districts
async def initialize_data():
    """Initialize database with all Indian states and major districts"""
    
    # Check if data already exists
    states_count = await db.states.count_documents({})
    if states_count > 0:
        return
    
    print("Initializing Indian states and districts data...")
    
    # All Indian States with LGD codes
    states_data = [
        {"code": 1, "name": "Jammu and Kashmir"},
        {"code": 2, "name": "Himachal Pradesh"},
        {"code": 3, "name": "Punjab"},
        {"code": 4, "name": "Chandigarh"},
        {"code": 5, "name": "Uttarakhand"},
        {"code": 6, "name": "Haryana"},
        {"code": 7, "name": "Delhi"},
        {"code": 8, "name": "Rajasthan"},
        {"code": 9, "name": "Uttar Pradesh"},
        {"code": 10, "name": "Bihar"},
        {"code": 11, "name": "Sikkim"},
        {"code": 12, "name": "Arunachal Pradesh"},
        {"code": 13, "name": "Nagaland"},
        {"code": 14, "name": "Manipur"},
        {"code": 15, "name": "Mizoram"},
        {"code": 16, "name": "Tripura"},
        {"code": 17, "name": "Meghalaya"},
        {"code": 18, "name": "Assam"},
        {"code": 19, "name": "West Bengal"},
        {"code": 20, "name": "Jharkhand"},
        {"code": 21, "name": "Odisha"},
        {"code": 22, "name": "Chhattisgarh"},
        {"code": 23, "name": "Madhya Pradesh"},
        {"code": 24, "name": "Gujarat"},
        {"code": 25, "name": "Daman and Diu"},
        {"code": 26, "name": "Dadra and Nagar Haveli"},
        {"code": 27, "name": "Maharashtra"},
        {"code": 28, "name": "Andhra Pradesh"},
        {"code": 29, "name": "Karnataka"},
        {"code": 30, "name": "Goa"},
        {"code": 31, "name": "Lakshadweep"},
        {"code": 32, "name": "Kerala"},
        {"code": 33, "name": "Tamil Nadu"},
        {"code": 34, "name": "Puducherry"},
        {"code": 35, "name": "Andaman and Nicobar Islands"},
        {"code": 36, "name": "Telangana"},
        {"code": 37, "name": "Ladakh"}
    ]
    
    await db.states.insert_many(states_data)
    
    # Major districts data (comprehensive list)
    districts_data = []
    
    # Uttar Pradesh (9) - Top 20 districts
    up_districts = [
        {"code": 151, "name": "Lucknow", "state_code": 9, "lat": 26.8467, "lon": 80.9462},
        {"code": 152, "name": "Kanpur Nagar", "state_code": 9, "lat": 26.4499, "lon": 80.3319},
        {"code": 153, "name": "Agra", "state_code": 9, "lat": 27.1767, "lon": 78.0081},
        {"code": 154, "name": "Varanasi", "state_code": 9, "lat": 25.3176, "lon": 82.9739},
        {"code": 155, "name": "Prayagraj", "state_code": 9, "lat": 25.4358, "lon": 81.8463},
        {"code": 156, "name": "Ghaziabad", "state_code": 9, "lat": 28.6692, "lon": 77.4538},
        {"code": 157, "name": "Meerut", "state_code": 9, "lat": 28.9845, "lon": 77.7064},
        {"code": 158, "name": "Bareilly", "state_code": 9, "lat": 28.3670, "lon": 79.4304},
        {"code": 159, "name": "Aligarh", "state_code": 9, "lat": 27.8974, "lon": 78.0880},
        {"code": 160, "name": "Moradabad", "state_code": 9, "lat": 28.8389, "lon": 78.7768},
        {"code": 161, "name": "Gorakhpur", "state_code": 9, "lat": 26.7606, "lon": 83.3732},
        {"code": 162, "name": "Saharanpur", "state_code": 9, "lat": 29.9680, "lon": 77.5460},
        {"code": 163, "name": "Noida (Gautam Buddha Nagar)", "state_code": 9, "lat": 28.5355, "lon": 77.3910},
        {"code": 164, "name": "Jhansi", "state_code": 9, "lat": 25.4484, "lon": 78.5685},
        {"code": 165, "name": "Mathura", "state_code": 9, "lat": 27.4924, "lon": 77.6737},
        {"code": 166, "name": "Firozabad", "state_code": 9, "lat": 27.1591, "lon": 78.3957},
        {"code": 167, "name": "Shahjahanpur", "state_code": 9, "lat": 27.8829, "lon": 79.9119},
        {"code": 168, "name": "Rampur", "state_code": 9, "lat": 28.8145, "lon": 79.0254},
        {"code": 169, "name": "Muzaffarnagar", "state_code": 9, "lat": 29.4727, "lon": 77.7085},
        {"code": 170, "name": "Azamgarh", "state_code": 9, "lat": 26.0686, "lon": 83.1840}
    ]
    districts_data.extend(up_districts)
    
    # Gujarat (24) - Top 15 districts
    gujarat_districts = [
        {"code": 438, "name": "Ahmedabad", "state_code": 24, "lat": 23.0225, "lon": 72.5714},
        {"code": 439, "name": "Surat", "state_code": 24, "lat": 21.1702, "lon": 72.8311},
        {"code": 440, "name": "Vadodara", "state_code": 24, "lat": 22.3072, "lon": 73.1812},
        {"code": 441, "name": "Rajkot", "state_code": 24, "lat": 22.3039, "lon": 70.8022},
        {"code": 442, "name": "Bhavnagar", "state_code": 24, "lat": 21.7645, "lon": 72.1519},
        {"code": 443, "name": "Jamnagar", "state_code": 24, "lat": 22.4707, "lon": 70.0577},
        {"code": 444, "name": "Junagadh", "state_code": 24, "lat": 21.5222, "lon": 70.4579},
        {"code": 445, "name": "Gandhinagar", "state_code": 24, "lat": 23.2156, "lon": 72.6369},
        {"code": 446, "name": "Anand", "state_code": 24, "lat": 22.5645, "lon": 72.9289},
        {"code": 447, "name": "Mehsana", "state_code": 24, "lat": 23.5880, "lon": 72.3693},
        {"code": 448, "name": "Bharuch", "state_code": 24, "lat": 21.7051, "lon": 72.9959},
        {"code": 449, "name": "Valsad", "state_code": 24, "lat": 20.5992, "lon": 72.9342},
        {"code": 450, "name": "Navsari", "state_code": 24, "lat": 20.9500, "lon": 72.9200},
        {"code": 451, "name": "Patan", "state_code": 24, "lat": 23.8502, "lon": 72.1211},
        {"code": 452, "name": "Kutch", "state_code": 24, "lat": 23.7337, "lon": 69.8597}
    ]
    districts_data.extend(gujarat_districts)
    
    # Maharashtra (27) - Top 20 districts
    maha_districts = [
        {"code": 490, "name": "Mumbai City", "state_code": 27, "lat": 18.9388, "lon": 72.8354},
        {"code": 491, "name": "Mumbai Suburban", "state_code": 27, "lat": 19.0760, "lon": 72.8777},
        {"code": 492, "name": "Pune", "state_code": 27, "lat": 18.5204, "lon": 73.8567},
        {"code": 493, "name": "Nagpur", "state_code": 27, "lat": 21.1458, "lon": 79.0882},
        {"code": 494, "name": "Thane", "state_code": 27, "lat": 19.2183, "lon": 72.9781},
        {"code": 495, "name": "Nashik", "state_code": 27, "lat": 19.9975, "lon": 73.7898},
        {"code": 496, "name": "Aurangabad", "state_code": 27, "lat": 19.8762, "lon": 75.3433},
        {"code": 497, "name": "Solapur", "state_code": 27, "lat": 17.6599, "lon": 75.9064},
        {"code": 498, "name": "Kolhapur", "state_code": 27, "lat": 16.7050, "lon": 74.2433},
        {"code": 499, "name": "Amravati", "state_code": 27, "lat": 20.9374, "lon": 77.7796},
        {"code": 500, "name": "Nanded", "state_code": 27, "lat": 19.1383, "lon": 77.3210},
        {"code": 501, "name": "Jalgaon", "state_code": 27, "lat": 21.0077, "lon": 75.5626},
        {"code": 502, "name": "Sangli", "state_code": 27, "lat": 16.8544, "lon": 74.5678},
        {"code": 503, "name": "Akola", "state_code": 27, "lat": 20.7002, "lon": 77.0082},
        {"code": 504, "name": "Ahmednagar", "state_code": 27, "lat": 19.0948, "lon": 74.7480},
        {"code": 505, "name": "Satara", "state_code": 27, "lat": 17.6805, "lon": 74.0183},
        {"code": 506, "name": "Raigad", "state_code": 27, "lat": 18.5074, "lon": 73.1789},
        {"code": 507, "name": "Ratnagiri", "state_code": 27, "lat": 16.9944, "lon": 73.3000},
        {"code": 508, "name": "Beed", "state_code": 27, "lat": 18.9894, "lon": 75.7607},
        {"code": 509, "name": "Latur", "state_code": 27, "lat": 18.3984, "lon": 76.5604}
    ]
    districts_data.extend(maha_districts)
    
    # Punjab (3) - All major districts
    punjab_districts = [
        {"code": 41, "name": "Amritsar", "state_code": 3, "lat": 31.6340, "lon": 74.8723},
        {"code": 42, "name": "Ludhiana", "state_code": 3, "lat": 30.9010, "lon": 75.8573},
        {"code": 43, "name": "Jalandhar", "state_code": 3, "lat": 31.3260, "lon": 75.5762},
        {"code": 44, "name": "Patiala", "state_code": 3, "lat": 30.3398, "lon": 76.3869},
        {"code": 45, "name": "Bathinda", "state_code": 3, "lat": 30.2110, "lon": 74.9455},
        {"code": 46, "name": "Mohali", "state_code": 3, "lat": 30.7046, "lon": 76.7179},
        {"code": 47, "name": "Hoshiarpur", "state_code": 3, "lat": 31.5346, "lon": 75.9119},
        {"code": 48, "name": "Gurdaspur", "state_code": 3, "lat": 32.0408, "lon": 75.4019},
        {"code": 49, "name": "Ferozepur", "state_code": 3, "lat": 30.9254, "lon": 74.6116},
        {"code": 50, "name": "Sangrur", "state_code": 3, "lat": 30.2453, "lon": 75.8420},
        {"code": 51, "name": "Moga", "state_code": 3, "lat": 30.8159, "lon": 75.1705},
        {"code": 52, "name": "Kapurthala", "state_code": 3, "lat": 31.3800, "lon": 75.3800}
    ]
    districts_data.extend(punjab_districts)
    
    # Haryana (6) - All districts
    haryana_districts = [
        {"code": 85, "name": "Faridabad", "state_code": 6, "lat": 28.4089, "lon": 77.3178},
        {"code": 86, "name": "Gurugram", "state_code": 6, "lat": 28.4595, "lon": 77.0266},
        {"code": 87, "name": "Hisar", "state_code": 6, "lat": 29.1492, "lon": 75.7217},
        {"code": 88, "name": "Rohtak", "state_code": 6, "lat": 28.8955, "lon": 76.6066},
        {"code": 89, "name": "Panipat", "state_code": 6, "lat": 29.3909, "lon": 76.9635},
        {"code": 90, "name": "Karnal", "state_code": 6, "lat": 29.6857, "lon": 76.9905},
        {"code": 91, "name": "Ambala", "state_code": 6, "lat": 30.3782, "lon": 76.7767},
        {"code": 92, "name": "Sonipat", "state_code": 6, "lat": 28.9931, "lon": 77.0151},
        {"code": 93, "name": "Yamuna Nagar", "state_code": 6, "lat": 30.1290, "lon": 77.2674},
        {"code": 94, "name": "Bhiwani", "state_code": 6, "lat": 28.7930, "lon": 76.1395}
    ]
    districts_data.extend(haryana_districts)
    
    # Karnataka (29) - Top 15 districts
    karnataka_districts = [
        {"code": 537, "name": "Bengaluru Urban", "state_code": 29, "lat": 12.9716, "lon": 77.5946},
        {"code": 538, "name": "Bengaluru Rural", "state_code": 29, "lat": 13.2846, "lon": 77.4389},
        {"code": 539, "name": "Mysuru", "state_code": 29, "lat": 12.2958, "lon": 76.6394},
        {"code": 540, "name": "Mangaluru (Dakshina Kannada)", "state_code": 29, "lat": 12.9141, "lon": 74.8560},
        {"code": 541, "name": "Hubballi-Dharwad", "state_code": 29, "lat": 15.3647, "lon": 75.1240},
        {"code": 542, "name": "Belagavi", "state_code": 29, "lat": 15.8497, "lon": 74.4977},
        {"code": 543, "name": "Kalaburagi", "state_code": 29, "lat": 17.3297, "lon": 76.8343},
        {"code": 544, "name": "Ballari", "state_code": 29, "lat": 15.1394, "lon": 76.9214},
        {"code": 545, "name": "Shivamogga", "state_code": 29, "lat": 13.9299, "lon": 75.5681},
        {"code": 546, "name": "Tumakuru", "state_code": 29, "lat": 13.3392, "lon": 77.1012},
        {"code": 547, "name": "Vijayapura", "state_code": 29, "lat": 16.8302, "lon": 75.7100},
        {"code": 548, "name": "Raichur", "state_code": 29, "lat": 16.2076, "lon": 77.3463},
        {"code": 549, "name": "Udupi", "state_code": 29, "lat": 13.3409, "lon": 74.7421},
        {"code": 550, "name": "Hassan", "state_code": 29, "lat": 13.0072, "lon": 76.0962},
        {"code": 551, "name": "Mandya", "state_code": 29, "lat": 12.5244, "lon": 76.8958}
    ]
    districts_data.extend(karnataka_districts)
    
    # Tamil Nadu (33) - Top 15 districts
    tn_districts = [
        {"code": 603, "name": "Chennai", "state_code": 33, "lat": 13.0827, "lon": 80.2707},
        {"code": 604, "name": "Coimbatore", "state_code": 33, "lat": 11.0168, "lon": 76.9558},
        {"code": 605, "name": "Madurai", "state_code": 33, "lat": 9.9252, "lon": 78.1198},
        {"code": 606, "name": "Tiruchirappalli", "state_code": 33, "lat": 10.7905, "lon": 78.7047},
        {"code": 607, "name": "Salem", "state_code": 33, "lat": 11.6643, "lon": 78.1460},
        {"code": 608, "name": "Tirunelveli", "state_code": 33, "lat": 8.7139, "lon": 77.7567},
        {"code": 609, "name": "Erode", "state_code": 33, "lat": 11.3410, "lon": 77.7172},
        {"code": 610, "name": "Vellore", "state_code": 33, "lat": 12.9165, "lon": 79.1325},
        {"code": 611, "name": "Thanjavur", "state_code": 33, "lat": 10.7870, "lon": 79.1378},
        {"code": 612, "name": "Dindigul", "state_code": 33, "lat": 10.3624, "lon": 77.9714},
        {"code": 613, "name": "Kanchipuram", "state_code": 33, "lat": 12.8342, "lon": 79.7036},
        {"code": 614, "name": "Tiruppur", "state_code": 33, "lat": 11.1085, "lon": 77.3411},
        {"code": 615, "name": "Cuddalore", "state_code": 33, "lat": 11.7480, "lon": 79.7714},
        {"code": 616, "name": "Karur", "state_code": 33, "lat": 10.9601, "lon": 78.0766},
        {"code": 617, "name": "Nagercoil (Kanyakumari)", "state_code": 33, "lat": 8.1781, "lon": 77.4061}
    ]
    districts_data.extend(tn_districts)
    
    # Rajasthan (8) - Top 15 districts
    rajasthan_districts = [
        {"code": 116, "name": "Jaipur", "state_code": 8, "lat": 26.9124, "lon": 75.7873},
        {"code": 117, "name": "Jodhpur", "state_code": 8, "lat": 26.2389, "lon": 73.0243},
        {"code": 118, "name": "Kota", "state_code": 8, "lat": 25.2138, "lon": 75.8648},
        {"code": 119, "name": "Udaipur", "state_code": 8, "lat": 24.5854, "lon": 73.7125},
        {"code": 120, "name": "Ajmer", "state_code": 8, "lat": 26.4499, "lon": 74.6399},
        {"code": 121, "name": "Bikaner", "state_code": 8, "lat": 28.0229, "lon": 73.3119},
        {"code": 122, "name": "Alwar", "state_code": 8, "lat": 27.5530, "lon": 76.6346},
        {"code": 123, "name": "Bhilwara", "state_code": 8, "lat": 25.3470, "lon": 74.6355},
        {"code": 124, "name": "Sikar", "state_code": 8, "lat": 27.6119, "lon": 75.1397},
        {"code": 125, "name": "Pali", "state_code": 8, "lat": 25.7711, "lon": 73.3234},
        {"code": 126, "name": "Bharatpur", "state_code": 8, "lat": 27.2173, "lon": 77.4900},
        {"code": 127, "name": "Chittorgarh", "state_code": 8, "lat": 24.8887, "lon": 74.6269},
        {"code": 128, "name": "Sri Ganganagar", "state_code": 8, "lat": 29.9038, "lon": 73.8772},
        {"code": 129, "name": "Tonk", "state_code": 8, "lat": 26.1542, "lon": 75.7886},
        {"code": 130, "name": "Jaisalmer", "state_code": 8, "lat": 26.9157, "lon": 70.9083}
    ]
    districts_data.extend(rajasthan_districts)
    
    # Madhya Pradesh (23) - Top 12 districts
    mp_districts = [
        {"code": 405, "name": "Indore", "state_code": 23, "lat": 22.7196, "lon": 75.8577},
        {"code": 406, "name": "Bhopal", "state_code": 23, "lat": 23.2599, "lon": 77.4126},
        {"code": 407, "name": "Jabalpur", "state_code": 23, "lat": 23.1815, "lon": 79.9864},
        {"code": 408, "name": "Gwalior", "state_code": 23, "lat": 26.2183, "lon": 78.1828},
        {"code": 409, "name": "Ujjain", "state_code": 23, "lat": 23.1765, "lon": 75.7885},
        {"code": 410, "name": "Sagar", "state_code": 23, "lat": 23.8388, "lon": 78.7378},
        {"code": 411, "name": "Dewas", "state_code": 23, "lat": 22.9676, "lon": 76.0534},
        {"code": 412, "name": "Satna", "state_code": 23, "lat": 24.6005, "lon": 80.8322},
        {"code": 413, "name": "Ratlam", "state_code": 23, "lat": 23.3315, "lon": 75.0367},
        {"code": 414, "name": "Rewa", "state_code": 23, "lat": 24.5364, "lon": 81.2961},
        {"code": 415, "name": "Katni", "state_code": 23, "lat": 23.8346, "lon": 80.3958},
        {"code": 416, "name": "Singrauli", "state_code": 23, "lat": 24.1997, "lon": 82.6747}
    ]
    districts_data.extend(mp_districts)
    
    # Bihar (10) - Top 12 districts
    bihar_districts = [
        {"code": 184, "name": "Patna", "state_code": 10, "lat": 25.5941, "lon": 85.1376},
        {"code": 185, "name": "Gaya", "state_code": 10, "lat": 24.7955, "lon": 85.0002},
        {"code": 186, "name": "Bhagalpur", "state_code": 10, "lat": 25.2425, "lon": 87.0084},
        {"code": 187, "name": "Muzaffarpur", "state_code": 10, "lat": 26.1225, "lon": 85.3906},
        {"code": 188, "name": "Darbhanga", "state_code": 10, "lat": 26.1542, "lon": 85.8918},
        {"code": 189, "name": "Purnia", "state_code": 10, "lat": 25.7771, "lon": 87.4753},
        {"code": 190, "name": "Arrah (Bhojpur)", "state_code": 10, "lat": 25.5563, "lon": 84.6631},
        {"code": 191, "name": "Begusarai", "state_code": 10, "lat": 25.4182, "lon": 86.1272},
        {"code": 192, "name": "Katihar", "state_code": 10, "lat": 25.5394, "lon": 87.5761},
        {"code": 193, "name": "Munger", "state_code": 10, "lat": 25.3753, "lon": 86.4734},
        {"code": 194, "name": "Chapra (Saran)", "state_code": 10, "lat": 25.7805, "lon": 84.7477},
        {"code": 195, "name": "Saharsa", "state_code": 10, "lat": 25.8800, "lon": 86.6014}
    ]
    districts_data.extend(bihar_districts)
    
    # West Bengal (19) - Top 12 districts
    wb_districts = [
        {"code": 341, "name": "Kolkata", "state_code": 19, "lat": 22.5726, "lon": 88.3639},
        {"code": 342, "name": "Howrah", "state_code": 19, "lat": 22.5958, "lon": 88.2636},
        {"code": 343, "name": "North 24 Parganas", "state_code": 19, "lat": 22.6157, "lon": 88.4001},
        {"code": 344, "name": "South 24 Parganas", "state_code": 19, "lat": 22.1484, "lon": 88.4324},
        {"code": 345, "name": "Bardhaman", "state_code": 19, "lat": 23.2324, "lon": 87.8615},
        {"code": 346, "name": "Murshidabad", "state_code": 19, "lat": 24.1752, "lon": 88.2800},
        {"code": 347, "name": "Nadia", "state_code": 19, "lat": 23.4730, "lon": 88.5560},
        {"code": 348, "name": "Jalpaiguri", "state_code": 19, "lat": 26.5161, "lon": 88.7296},
        {"code": 349, "name": "Darjeeling", "state_code": 19, "lat": 26.7271, "lon": 88.3953},
        {"code": 350, "name": "Malda", "state_code": 19, "lat": 25.0961, "lon": 88.1436},
        {"code": 351, "name": "Birbhum", "state_code": 19, "lat": 23.8404, "lon": 87.6190},
        {"code": 352, "name": "Midnapore", "state_code": 19, "lat": 22.4241, "lon": 87.3198}
    ]
    districts_data.extend(wb_districts)
    
    # Telangana (36) - Top 10 districts
    telangana_districts = [
        {"code": 667, "name": "Hyderabad", "state_code": 36, "lat": 17.3850, "lon": 78.4867},
        {"code": 668, "name": "Ranga Reddy", "state_code": 36, "lat": 17.3753, "lon": 78.2136},
        {"code": 669, "name": "Medchal-Malkajgiri", "state_code": 36, "lat": 17.6209, "lon": 78.4821},
        {"code": 670, "name": "Warangal Urban", "state_code": 36, "lat": 17.9689, "lon": 79.5941},
        {"code": 671, "name": "Karimnagar", "state_code": 36, "lat": 18.4386, "lon": 79.1288},
        {"code": 672, "name": "Nizamabad", "state_code": 36, "lat": 18.6725, "lon": 78.0942},
        {"code": 673, "name": "Khammam", "state_code": 36, "lat": 17.2473, "lon": 80.1514},
        {"code": 674, "name": "Nalgonda", "state_code": 36, "lat": 17.0490, "lon": 79.2674},
        {"code": 675, "name": "Mahbubnagar", "state_code": 36, "lat": 16.7488, "lon": 77.9838},
        {"code": 676, "name": "Sangareddy", "state_code": 36, "lat": 17.6247, "lon": 78.0833}
    ]
    districts_data.extend(telangana_districts)
    
    # Andhra Pradesh (28) - Top 10 districts
    ap_districts = [
        {"code": 517, "name": "Visakhapatnam", "state_code": 28, "lat": 17.6869, "lon": 83.2185},
        {"code": 518, "name": "Vijayawada (Krishna)", "state_code": 28, "lat": 16.5062, "lon": 80.6480},
        {"code": 519, "name": "Guntur", "state_code": 28, "lat": 16.3067, "lon": 80.4365},
        {"code": 520, "name": "Nellore", "state_code": 28, "lat": 14.4426, "lon": 79.9865},
        {"code": 521, "name": "Kurnool", "state_code": 28, "lat": 15.8281, "lon": 78.0373},
        {"code": 522, "name": "Kadapa", "state_code": 28, "lat": 14.4674, "lon": 78.8241},
        {"code": 523, "name": "Tirupati (Chittoor)", "state_code": 28, "lat": 13.6288, "lon": 79.4192},
        {"code": 524, "name": "Anantapur", "state_code": 28, "lat": 14.6819, "lon": 77.6006},
        {"code": 525, "name": "Rajahmundry (East Godavari)", "state_code": 28, "lat": 17.0005, "lon": 81.8040},
        {"code": 526, "name": "Eluru (West Godavari)", "state_code": 28, "lat": 16.7107, "lon": 81.0954}
    ]
    districts_data.extend(ap_districts)
    
    # Kerala (32) - All 14 districts
    kerala_districts = [
        {"code": 585, "name": "Thiruvananthapuram", "state_code": 32, "lat": 8.5241, "lon": 76.9366},
        {"code": 586, "name": "Kochi (Ernakulam)", "state_code": 32, "lat": 9.9312, "lon": 76.2673},
        {"code": 587, "name": "Kozhikode", "state_code": 32, "lat": 11.2588, "lon": 75.7804},
        {"code": 588, "name": "Kollam", "state_code": 32, "lat": 8.8932, "lon": 76.6141},
        {"code": 589, "name": "Thrissur", "state_code": 32, "lat": 10.5276, "lon": 76.2144},
        {"code": 590, "name": "Kannur", "state_code": 32, "lat": 11.8745, "lon": 75.3704},
        {"code": 591, "name": "Alappuzha", "state_code": 32, "lat": 9.4981, "lon": 76.3388},
        {"code": 592, "name": "Kottayam", "state_code": 32, "lat": 9.5916, "lon": 76.5222},
        {"code": 593, "name": "Palakkad", "state_code": 32, "lat": 10.7867, "lon": 76.6548},
        {"code": 594, "name": "Malappuram", "state_code": 32, "lat": 11.0510, "lon": 76.0711},
        {"code": 595, "name": "Pathanamthitta", "state_code": 32, "lat": 9.2648, "lon": 76.7870},
        {"code": 596, "name": "Kasaragod", "state_code": 32, "lat": 12.4996, "lon": 74.9869},
        {"code": 597, "name": "Wayanad", "state_code": 32, "lat": 11.6854, "lon": 76.1320},
        {"code": 598, "name": "Idukki", "state_code": 32, "lat": 9.9188, "lon": 77.1025}
    ]
    districts_data.extend(kerala_districts)
    
    await db.districts.insert_many(districts_data)
    
    print(f"✅ Initialized {len(states_data)} states and {len(districts_data)} districts")


# API Routes

@app.get("/")
async def root():
    return {
        "message": "Krishi Mitra API",
        "version": "1.0.0",
        "status": "running"
    }


@app.post("/api/auth/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserRegister):
    """Register a new user"""
    
    # Check if user already exists
    existing_user = await db.users.find_one({
        "$or": [
            {"email": user_data.email},
            {"mobile": user_data.mobile}
        ]
    })
    
    if existing_user:
        if existing_user.get("email") == user_data.email:
            raise HTTPException(status_code=400, detail="Email already registered")
        else:
            raise HTTPException(status_code=400, detail="Mobile number already registered")
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    new_user = {
        "fullName": user_data.fullName,
        "email": user_data.email,
        "mobile": user_data.mobile,
        "password": hashed_password,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    result = await db.users.insert_one(new_user)
    user_id = str(result.inserted_id)
    
    # Create access token
    access_token = create_access_token(data={"sub": user_id})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "fullName": user_data.fullName,
            "email": user_data.email,
            "mobile": user_data.mobile
        }
    }


@app.post("/api/auth/login", response_model=Token)
async def login(credentials: UserLogin):
    """Login user"""
    
    # Find user by username (email or mobile)
    user = await db.users.find_one({
        "$or": [
            {"email": credentials.username},
            {"mobile": credentials.username}
        ]
    })
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Verify password
    if not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create access token
    user_id = str(user["_id"])
    access_token = create_access_token(data={"sub": user_id})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "fullName": user["fullName"],
            "email": user["email"],
            "mobile": user["mobile"]
        }
    }


@app.get("/api/location/states", response_model=List[StateResponse])
async def get_states():
    """Get all Indian states"""
    
    states = []
    async for state in db.states.find().sort("name", 1):
        # Count districts for each state
        districts_count = await db.districts.count_documents({"state_code": state["code"]})
        states.append({
            "code": state["code"],
            "name": state["name"],
            "districts_count": districts_count
        })
    
    return states


@app.get("/api/location/districts/{state_code}", response_model=List[DistrictResponse])
async def get_districts(state_code: int):
    """Get districts for a specific state"""
    
    districts = []
    async for district in db.districts.find({"state_code": state_code}).sort("name", 1):
        districts.append({
            "code": district["code"],
            "name": district["name"],
            "state_code": district["state_code"],
            "lat": district["lat"],
            "lon": district["lon"]
        })
    
    return districts


@app.post("/api/crops/recommendations", response_model=List[CropResponse])
async def get_crop_recommendations(request: CropRecommendationRequest, user = Depends(get_current_user)):
    """Get crop recommendations based on location and season"""
    
    # Mock crop data - In production, this would use ML model or external API
    crops_data = [
        {
            "crop_name": "Rice",
            "suitability_score": 92,
            "avg_profit": 45000,
            "duration_days": 120,
            "water_requirement": "High",
            "soil_type": ["Loamy", "Clay"],
            "best_practices": ["Direct seeding", "SRI method", "Proper water management"]
        },
        {
            "crop_name": "Wheat",
            "suitability_score": 88,
            "avg_profit": 38000,
            "duration_days": 110,
            "water_requirement": "Medium",
            "soil_type": ["Loamy", "Sandy Loam"],
            "best_practices": ["Timely sowing", "Seed treatment", "Balanced fertilization"]
        },
        {
            "crop_name": "Cotton",
            "suitability_score": 85,
            "avg_profit": 52000,
            "duration_days": 150,
            "water_requirement": "Medium",
            "soil_type": ["Black", "Loamy"],
            "best_practices": ["Integrated pest management", "Proper spacing", "Drip irrigation"]
        },
        {
            "crop_name": "Sugarcane",
            "suitability_score": 82,
            "avg_profit": 65000,
            "duration_days": 365,
            "water_requirement": "Very High",
            "soil_type": ["Loamy", "Clay Loam"],
            "best_practices": ["Trench planting", "Inter-cropping", "Drip irrigation"]
        },
        {
            "crop_name": "Maize",
            "suitability_score": 80,
            "avg_profit": 32000,
            "duration_days": 90,
            "water_requirement": "Medium",
            "soil_type": ["Loamy", "Sandy Loam"],
            "best_practices": ["Hybrid seeds", "Ridge and furrow planting", "Mulching"]
        },
        {
            "crop_name": "Pulses (Chickpea)",
            "suitability_score": 78,
            "avg_profit": 35000,
            "duration_days": 100,
            "water_requirement": "Low",
            "soil_type": ["Loamy", "Clay Loam"],
            "best_practices": ["Seed inoculation", "Wilt management", "Timely harvesting"]
        },
        {
            "crop_name": "Soybean",
            "suitability_score": 75,
            "avg_profit": 30000,
            "duration_days": 95,
            "water_requirement": "Medium",
            "soil_type": ["Loamy", "Clay Loam"],
            "best_practices": ["Certified seeds", "Rhizobium treatment", "Weed control"]
        },
        {
            "crop_name": "Groundnut",
            "suitability_score": 72,
            "avg_profit": 42000,
            "duration_days": 110,
            "water_requirement": "Low-Medium",
            "soil_type": ["Sandy Loam", "Red Loam"],
            "best_practices": ["Seed treatment", "Gypsum application", "Pod maturity check"]
        }
    ]
    
    # Season-based filtering (simplified logic)
    if request.season_id == 1:  # Kharif
        preferred_crops = ["Rice", "Cotton", "Soybean", "Maize", "Groundnut"]
    elif request.season_id == 2:  # Rabi
        preferred_crops = ["Wheat", "Pulses (Chickpea)", "Maize"]
    else:  # Summer/Zaid
        preferred_crops = ["Maize", "Groundnut", "Rice"]
    
    # Boost scores for season-appropriate crops
    result = []
    for crop in crops_data:
        crop_copy = crop.copy()
        if crop["crop_name"] in preferred_crops:
            crop_copy["suitability_score"] = min(95, crop["suitability_score"] + 5)
        result.append(crop_copy)
    
    # Sort by suitability score
    result.sort(key=lambda x: x["suitability_score"], reverse=True)
    
    return result


@app.get("/api/weather/{state_code}/{district_code}")
async def get_weather_info(state_code: int, district_code: int, user = Depends(get_current_user)):
    """Get weather information and warnings"""
    
    # Mock weather data - In production, integrate with weather API
    return {
        "temperature": 28,
        "humidity": 65,
        "rainfall": 15,
        "wind_speed": 12,
        "warning": "Moderate rainfall expected in next 3 days. Good for Kharif sowing.",
        "forecast": [
            {"day": "Today", "condition": "Partly Cloudy", "temp_max": 32, "temp_min": 24, "rain_chance": 30},
            {"day": "Tomorrow", "condition": "Light Rain", "temp_max": 30, "temp_min": 23, "rain_chance": 60},
            {"day": "Day 3", "condition": "Cloudy", "temp_max": 29, "temp_min": 22, "rain_chance": 40}
        ]
    }


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.utcnow()}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)

"""
Districts API Endpoint
Returns districts for a specific state
"""

from http.server import BaseHTTPRequestHandler
import json
from urllib.parse import urlparse, parse_qs

# Districts Data - Major districts for all states
DISTRICTS_DB = [
    # Jammu and Kashmir (1)
    {"code": 11, "name": "Srinagar", "state_code": 1, "lat": 34.0837, "lon": 74.7973},
    {"code": 12, "name": "Jammu", "state_code": 1, "lat": 32.7266, "lon": 74.8570},
    {"code": 13, "name": "Anantnag", "state_code": 1, "lat": 33.7310, "lon": 75.1484},
    {"code": 14, "name": "Baramulla", "state_code": 1, "lat": 34.2093, "lon": 74.3429},
    
    # Himachal Pradesh (2)
    {"code": 21, "name": "Shimla", "state_code": 2, "lat": 31.1048, "lon": 77.1734},
    {"code": 22, "name": "Kangra", "state_code": 2, "lat": 32.0998, "lon": 76.2689},
    {"code": 23, "name": "Mandi", "state_code": 2, "lat": 31.7084, "lon": 76.9318},
    {"code": 24, "name": "Solan", "state_code": 2, "lat": 30.9045, "lon": 77.0967},
    
    # Punjab (3)
    {"code": 41, "name": "Amritsar", "state_code": 3, "lat": 31.6340, "lon": 74.8723},
    {"code": 42, "name": "Ludhiana", "state_code": 3, "lat": 30.9010, "lon": 75.8573},
    {"code": 43, "name": "Jalandhar", "state_code": 3, "lat": 31.3260, "lon": 75.5762},
    {"code": 44, "name": "Patiala", "state_code": 3, "lat": 30.3398, "lon": 76.3869},
    {"code": 45, "name": "Bathinda", "state_code": 3, "lat": 30.2110, "lon": 74.9455},
    
    # Chandigarh (4)
    {"code": 61, "name": "Chandigarh", "state_code": 4, "lat": 30.7333, "lon": 76.7794},
    
    # Uttarakhand (5)
    {"code": 71, "name": "Dehradun", "state_code": 5, "lat": 30.3165, "lon": 78.0322},
    {"code": 72, "name": "Haridwar", "state_code": 5, "lat": 29.9457, "lon": 78.1642},
    {"code": 73, "name": "Nainital", "state_code": 5, "lat": 29.3803, "lon": 79.4636},
    {"code": 74, "name": "Udham Singh Nagar", "state_code": 5, "lat": 29.0167, "lon": 79.4167},
    
    # Haryana (6)
    {"code": 85, "name": "Faridabad", "state_code": 6, "lat": 28.4089, "lon": 77.3178},
    {"code": 86, "name": "Gurugram", "state_code": 6, "lat": 28.4595, "lon": 77.0266},
    {"code": 87, "name": "Hisar", "state_code": 6, "lat": 29.1492, "lon": 75.7217},
    {"code": 88, "name": "Rohtak", "state_code": 6, "lat": 28.8955, "lon": 76.6066},
    {"code": 89, "name": "Karnal", "state_code": 6, "lat": 29.6857, "lon": 76.9905},
    {"code": 90, "name": "Panipat", "state_code": 6, "lat": 29.3909, "lon": 76.9635},
    
    # Delhi (7)
    {"code": 101, "name": "Central Delhi", "state_code": 7, "lat": 28.6517, "lon": 77.2219},
    {"code": 102, "name": "South Delhi", "state_code": 7, "lat": 28.5245, "lon": 77.2066},
    {"code": 103, "name": "North Delhi", "state_code": 7, "lat": 28.7041, "lon": 77.1025},
    
    # Rajasthan (8)
    {"code": 111, "name": "Jaipur", "state_code": 8, "lat": 26.9124, "lon": 75.7873},
    {"code": 112, "name": "Jodhpur", "state_code": 8, "lat": 26.2389, "lon": 73.0243},
    {"code": 113, "name": "Udaipur", "state_code": 8, "lat": 24.5854, "lon": 73.7125},
    {"code": 114, "name": "Kota", "state_code": 8, "lat": 25.2138, "lon": 75.8648},
    {"code": 115, "name": "Ajmer", "state_code": 8, "lat": 26.4499, "lon": 74.6399},
    
    # Uttar Pradesh (9)
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
    
    # Bihar (10)
    {"code": 201, "name": "Patna", "state_code": 10, "lat": 25.5941, "lon": 85.1376},
    {"code": 202, "name": "Gaya", "state_code": 10, "lat": 24.7955, "lon": 85.0002},
    {"code": 203, "name": "Bhagalpur", "state_code": 10, "lat": 25.2425, "lon": 86.9842},
    {"code": 204, "name": "Muzaffarpur", "state_code": 10, "lat": 26.1225, "lon": 85.3906},
    
    # Sikkim (11)
    {"code": 221, "name": "Gangtok", "state_code": 11, "lat": 27.3389, "lon": 88.6065},
    {"code": 222, "name": "Namchi", "state_code": 11, "lat": 27.1652, "lon": 88.3639},
    
    # Arunachal Pradesh (12)
    {"code": 241, "name": "Itanagar", "state_code": 12, "lat": 27.0844, "lon": 93.6053},
    {"code": 242, "name": "Tawang", "state_code": 12, "lat": 27.5860, "lon": 91.8714},
    
    # Nagaland (13)
    {"code": 261, "name": "Kohima", "state_code": 13, "lat": 25.6751, "lon": 94.1086},
    {"code": 262, "name": "Dimapur", "state_code": 13, "lat": 25.9067, "lon": 93.7272},
    
    # Manipur (14)
    {"code": 281, "name": "Imphal West", "state_code": 14, "lat": 24.8170, "lon": 93.9368},
    {"code": 282, "name": "Imphal East", "state_code": 14, "lat": 24.7644, "lon": 93.9632},
    
    # Mizoram (15)
    {"code": 301, "name": "Aizawl", "state_code": 15, "lat": 23.7271, "lon": 92.7176},
    {"code": 302, "name": "Lunglei", "state_code": 15, "lat": 22.8853, "lon": 92.7378},
    
    # Tripura (16)
    {"code": 321, "name": "Agartala", "state_code": 16, "lat": 23.8315, "lon": 91.2868},
    {"code": 322, "name": "Udaipur", "state_code": 16, "lat": 23.5337, "lon": 91.4827},
    
    # Meghalaya (17)
    {"code": 341, "name": "Shillong", "state_code": 17, "lat": 25.5788, "lon": 91.8933},
    {"code": 342, "name": "Tura", "state_code": 17, "lat": 25.5198, "lon": 90.2034},
    
    # Assam (18)
    {"code": 361, "name": "Guwahati", "state_code": 18, "lat": 26.1445, "lon": 91.7362},
    {"code": 362, "name": "Dibrugarh", "state_code": 18, "lat": 27.4728, "lon": 94.9120},
    {"code": 363, "name": "Jorhat", "state_code": 18, "lat": 26.7509, "lon": 94.2037},
    {"code": 364, "name": "Silchar", "state_code": 18, "lat": 24.8333, "lon": 92.7789},
    
    # West Bengal (19)
    {"code": 381, "name": "Kolkata", "state_code": 19, "lat": 22.5726, "lon": 88.3639},
    {"code": 382, "name": "Darjeeling", "state_code": 19, "lat": 27.0410, "lon": 88.2663},
    {"code": 383, "name": "Howrah", "state_code": 19, "lat": 22.5958, "lon": 88.2636},
    {"code": 384, "name": "Siliguri", "state_code": 19, "lat": 26.7271, "lon": 88.3953},
    
    # Jharkhand (20)
    {"code": 401, "name": "Ranchi", "state_code": 20, "lat": 23.3441, "lon": 85.3096},
    {"code": 402, "name": "Jamshedpur", "state_code": 20, "lat": 22.8046, "lon": 86.2029},
    {"code": 403, "name": "Dhanbad", "state_code": 20, "lat": 23.7957, "lon": 86.4304},
    {"code": 404, "name": "Bokaro", "state_code": 20, "lat": 23.6693, "lon": 86.1511},
    
    # Odisha (21)
    {"code": 421, "name": "Bhubaneswar", "state_code": 21, "lat": 20.2961, "lon": 85.8245},
    {"code": 422, "name": "Cuttack", "state_code": 21, "lat": 20.4625, "lon": 85.8830},
    {"code": 423, "name": "Puri", "state_code": 21, "lat": 19.8135, "lon": 85.8312},
    {"code": 424, "name": "Sambalpur", "state_code": 21, "lat": 21.4669, "lon": 83.9812},
    
    # Chhattisgarh (22)
    {"code": 441, "name": "Raipur", "state_code": 22, "lat": 21.2514, "lon": 81.6296},
    {"code": 442, "name": "Bilaspur", "state_code": 22, "lat": 22.0797, "lon": 82.1409},
    {"code": 443, "name": "Durg", "state_code": 22, "lat": 21.1905, "lon": 81.2849},
    {"code": 444, "name": "Korba", "state_code": 22, "lat": 22.3595, "lon": 82.7501},
    
    # Madhya Pradesh (23)
    {"code": 461, "name": "Bhopal", "state_code": 23, "lat": 23.2599, "lon": 77.4126},
    {"code": 462, "name": "Indore", "state_code": 23, "lat": 22.7196, "lon": 75.8577},
    {"code": 463, "name": "Jabalpur", "state_code": 23, "lat": 23.1815, "lon": 79.9864},
    {"code": 464, "name": "Gwalior", "state_code": 23, "lat": 26.2183, "lon": 78.1828},
    {"code": 465, "name": "Ujjain", "state_code": 23, "lat": 23.1765, "lon": 75.7885},
    
    # Gujarat (24)
    {"code": 481, "name": "Ahmedabad", "state_code": 24, "lat": 23.0225, "lon": 72.5714},
    {"code": 482, "name": "Surat", "state_code": 24, "lat": 21.1702, "lon": 72.8311},
    {"code": 483, "name": "Vadodara", "state_code": 24, "lat": 22.3072, "lon": 73.1812},
    {"code": 484, "name": "Rajkot", "state_code": 24, "lat": 22.3039, "lon": 70.8022},
    {"code": 485, "name": "Bhavnagar", "state_code": 24, "lat": 21.7645, "lon": 72.1519},
    {"code": 486, "name": "Jamnagar", "state_code": 24, "lat": 22.4707, "lon": 70.0577},
    
    # Maharashtra (27)
    {"code": 501, "name": "Mumbai", "state_code": 27, "lat": 19.0760, "lon": 72.8777},
    {"code": 502, "name": "Pune", "state_code": 27, "lat": 18.5204, "lon": 73.8567},
    {"code": 503, "name": "Nagpur", "state_code": 27, "lat": 21.1458, "lon": 79.0882},
    {"code": 504, "name": "Nashik", "state_code": 27, "lat": 19.9975, "lon": 73.7898},
    {"code": 505, "name": "Aurangabad", "state_code": 27, "lat": 19.8762, "lon": 75.3433},
    {"code": 506, "name": "Solapur", "state_code": 27, "lat": 17.6599, "lon": 75.9064},
    
    # Andhra Pradesh (28)
    {"code": 521, "name": "Visakhapatnam", "state_code": 28, "lat": 17.6868, "lon": 83.2185},
    {"code": 522, "name": "Vijayawada", "state_code": 28, "lat": 16.5062, "lon": 80.6480},
    {"code": 523, "name": "Guntur", "state_code": 28, "lat": 16.3067, "lon": 80.4365},
    {"code": 524, "name": "Nellore", "state_code": 28, "lat": 14.4426, "lon": 79.9865},
    
    # Karnataka (29)
    {"code": 541, "name": "Bengaluru", "state_code": 29, "lat": 12.9716, "lon": 77.5946},
    {"code": 542, "name": "Mysuru", "state_code": 29, "lat": 12.2958, "lon": 76.6394},
    {"code": 543, "name": "Mangaluru", "state_code": 29, "lat": 12.9141, "lon": 74.8560},
    {"code": 544, "name": "Hubballi", "state_code": 29, "lat": 15.3647, "lon": 75.1240},
    {"code": 545, "name": "Belagavi", "state_code": 29, "lat": 15.8497, "lon": 74.4977},
    
    # Goa (30)
    {"code": 561, "name": "North Goa", "state_code": 30, "lat": 15.4909, "lon": 73.8278},
    {"code": 562, "name": "South Goa", "state_code": 30, "lat": 15.2993, "lon": 74.1240},
    
    # Kerala (32)
    {"code": 581, "name": "Thiruvananthapuram", "state_code": 32, "lat": 8.5241, "lon": 76.9366},
    {"code": 582, "name": "Kochi", "state_code": 32, "lat": 9.9312, "lon": 76.2673},
    {"code": 583, "name": "Kozhikode", "state_code": 32, "lat": 11.2588, "lon": 75.7804},
    {"code": 584, "name": "Thrissur", "state_code": 32, "lat": 10.5276, "lon": 76.2144},
    {"code": 585, "name": "Kannur", "state_code": 32, "lat": 11.8745, "lon": 75.3704},
    
    # Tamil Nadu (33)
    {"code": 601, "name": "Chennai", "state_code": 33, "lat": 13.0827, "lon": 80.2707},
    {"code": 602, "name": "Coimbatore", "state_code": 33, "lat": 11.0168, "lon": 76.9558},
    {"code": 603, "name": "Madurai", "state_code": 33, "lat": 9.9252, "lon": 78.1198},
    {"code": 604, "name": "Tiruchirappalli", "state_code": 33, "lat": 10.7905, "lon": 78.7047},
    {"code": 605, "name": "Salem", "state_code": 33, "lat": 11.6643, "lon": 78.1460},
    
    # Puducherry (34)
    {"code": 621, "name": "Puducherry", "state_code": 34, "lat": 11.9416, "lon": 79.8083},
    {"code": 622, "name": "Karaikal", "state_code": 34, "lat": 10.9254, "lon": 79.8380},
    
    # Telangana (36)
    {"code": 641, "name": "Hyderabad", "state_code": 36, "lat": 17.3850, "lon": 78.4867},
    {"code": 642, "name": "Warangal", "state_code": 36, "lat": 17.9784, "lon": 79.6007},
    {"code": 643, "name": "Nizamabad", "state_code": 36, "lat": 18.6725, "lon": 78.0941},
    {"code": 644, "name": "Khammam", "state_code": 36, "lat": 17.2473, "lon": 80.1514},
    
    # Ladakh (37)
    {"code": 661, "name": "Leh", "state_code": 37, "lat": 34.1526, "lon": 77.5771},
    {"code": 662, "name": "Kargil", "state_code": 37, "lat": 34.5539, "lon": 76.1315},
]

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse query parameters
        parsed_url = urlparse(self.path)
        query_params = parse_qs(parsed_url.query)
        
        state_code = query_params.get('state_code', [None])[0]
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        if state_code:
            try:
                state_code_int = int(state_code)
                districts = [d for d in DISTRICTS_DB if d["state_code"] == state_code_int]
                districts = sorted(districts, key=lambda x: x["name"])
                
                response = {
                    "success": True,
                    "data": districts,
                    "count": len(districts)
                }
            except ValueError:
                response = {
                    "success": False,
                    "error": "Invalid state_code parameter"
                }
        else:
            # Return all districts
            response = {
                "success": True,
                "data": DISTRICTS_DB,
                "count": len(DISTRICTS_DB)
            }
        
        self.wfile.write(json.dumps(response).encode())
        return
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        return

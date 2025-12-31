"""
Crop Recommendations API Endpoint
Returns crop recommendations based on location and season
"""

from http.server import BaseHTTPRequestHandler
import json
from urllib.parse import urlparse, parse_qs

# Crop Data
CROPS_DATA = [
    {
        "crop_name": "Rice",
        "suitability_score": 92,
        "avg_profit": 45000,
        "duration_days": 120,
        "water_requirement": "High",
        "soil_type": ["Loamy", "Clay"],
        "best_practices": ["Direct seeding", "SRI method", "Proper water management"],
        "season": "Kharif"
    },
    {
        "crop_name": "Wheat",
        "suitability_score": 88,
        "avg_profit": 38000,
        "duration_days": 110,
        "water_requirement": "Medium",
        "soil_type": ["Loamy", "Sandy Loam"],
        "best_practices": ["Timely sowing", "Seed treatment", "Balanced fertilization"],
        "season": "Rabi"
    },
    {
        "crop_name": "Cotton",
        "suitability_score": 85,
        "avg_profit": 52000,
        "duration_days": 150,
        "water_requirement": "Medium",
        "soil_type": ["Black", "Loamy"],
        "best_practices": ["Integrated pest management", "Proper spacing"],
        "season": "Kharif"
    },
    {
        "crop_name": "Sugarcane",
        "suitability_score": 82,
        "avg_profit": 65000,
        "duration_days": 365,
        "water_requirement": "Very High",
        "soil_type": ["Loamy", "Clay Loam"],
        "best_practices": ["Drip irrigation", "Inter-cropping"],
        "season": "Annual"
    },
    {
        "crop_name": "Maize",
        "suitability_score": 80,
        "avg_profit": 32000,
        "duration_days": 90,
        "water_requirement": "Medium",
        "soil_type": ["Loamy", "Sandy Loam"],
        "best_practices": ["Hybrid seeds", "Mulching"],
        "season": "Kharif"
    },
    {
        "crop_name": "Soybean",
        "suitability_score": 78,
        "avg_profit": 35000,
        "duration_days": 100,
        "water_requirement": "Medium",
        "soil_type": ["Loamy", "Clay"],
        "best_practices": ["Rhizobium inoculation", "Proper drainage"],
        "season": "Kharif"
    },
    {
        "crop_name": "Mustard",
        "suitability_score": 75,
        "avg_profit": 28000,
        "duration_days": 110,
        "water_requirement": "Low",
        "soil_type": ["Sandy Loam", "Loamy"],
        "best_practices": ["Timely irrigation", "Aphid management"],
        "season": "Rabi"
    },
    {
        "crop_name": "Chickpea",
        "suitability_score": 72,
        "avg_profit": 30000,
        "duration_days": 100,
        "water_requirement": "Low",
        "soil_type": ["Loamy", "Sandy"],
        "best_practices": ["Seed treatment", "Pod borer management"],
        "season": "Rabi"
    },
    {
        "crop_name": "Groundnut",
        "suitability_score": 70,
        "avg_profit": 40000,
        "duration_days": 110,
        "water_requirement": "Medium",
        "soil_type": ["Sandy Loam", "Red"],
        "best_practices": ["Gypsum application", "Proper earthing up"],
        "season": "Kharif"
    },
    {
        "crop_name": "Sunflower",
        "suitability_score": 68,
        "avg_profit": 25000,
        "duration_days": 90,
        "water_requirement": "Medium",
        "soil_type": ["Loamy", "Black"],
        "best_practices": ["Bee pollination", "Head rot management"],
        "season": "Rabi"
    }
]

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse query parameters
        parsed_url = urlparse(self.path)
        query_params = parse_qs(parsed_url.query)
        
        season = query_params.get('season', [None])[0]
        state_code = query_params.get('state_code', [None])[0]
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        # Filter by season if provided
        crops = CROPS_DATA.copy()
        if season:
            crops = [c for c in crops if c["season"].lower() == season.lower() or c["season"] == "Annual"]
        
        # Sort by suitability score
        crops = sorted(crops, key=lambda x: x["suitability_score"], reverse=True)
        
        response = {
            "success": True,
            "data": crops,
            "count": len(crops)
        }
        
        self.wfile.write(json.dumps(response).encode())
        return
    
    def do_POST(self):
        # Handle POST for crop recommendations
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        try:
            request_data = json.loads(post_data) if post_data else {}
            season_id = request_data.get('season_id', 1)
            
            # Map season_id to season name
            season_map = {1: "Kharif", 2: "Rabi", 3: "Zaid"}
            season = season_map.get(season_id, "Kharif")
            
            crops = [c for c in CROPS_DATA if c["season"].lower() == season.lower() or c["season"] == "Annual"]
            crops = sorted(crops, key=lambda x: x["suitability_score"], reverse=True)
            
            response = {
                "success": True,
                "data": crops,
                "count": len(crops),
                "season": season
            }
        except Exception as e:
            response = {
                "success": False,
                "error": str(e)
            }
        
        self.wfile.write(json.dumps(response).encode())
        return
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        return

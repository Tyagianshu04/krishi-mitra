"""
States API Endpoint
Returns all Indian states with their districts
"""

from http.server import BaseHTTPRequestHandler
import json
from urllib.parse import urlparse, parse_qs

# Indian States Data
STATES_DB = [
    {"code": 1, "name": "Jammu and Kashmir", "districts_count": 4},
    {"code": 2, "name": "Himachal Pradesh", "districts_count": 4},
    {"code": 3, "name": "Punjab", "districts_count": 5},
    {"code": 4, "name": "Chandigarh", "districts_count": 1},
    {"code": 5, "name": "Uttarakhand", "districts_count": 4},
    {"code": 6, "name": "Haryana", "districts_count": 6},
    {"code": 7, "name": "Delhi", "districts_count": 3},
    {"code": 8, "name": "Rajasthan", "districts_count": 5},
    {"code": 9, "name": "Uttar Pradesh", "districts_count": 10},
    {"code": 10, "name": "Bihar", "districts_count": 4},
    {"code": 11, "name": "Sikkim", "districts_count": 2},
    {"code": 12, "name": "Arunachal Pradesh", "districts_count": 2},
    {"code": 13, "name": "Nagaland", "districts_count": 2},
    {"code": 14, "name": "Manipur", "districts_count": 2},
    {"code": 15, "name": "Mizoram", "districts_count": 2},
    {"code": 16, "name": "Tripura", "districts_count": 2},
    {"code": 17, "name": "Meghalaya", "districts_count": 2},
    {"code": 18, "name": "Assam", "districts_count": 4},
    {"code": 19, "name": "West Bengal", "districts_count": 4},
    {"code": 20, "name": "Jharkhand", "districts_count": 4},
    {"code": 21, "name": "Odisha", "districts_count": 4},
    {"code": 22, "name": "Chhattisgarh", "districts_count": 4},
    {"code": 23, "name": "Madhya Pradesh", "districts_count": 5},
    {"code": 24, "name": "Gujarat", "districts_count": 6},
    {"code": 27, "name": "Maharashtra", "districts_count": 6},
    {"code": 28, "name": "Andhra Pradesh", "districts_count": 4},
    {"code": 29, "name": "Karnataka", "districts_count": 5},
    {"code": 30, "name": "Goa", "districts_count": 2},
    {"code": 32, "name": "Kerala", "districts_count": 5},
    {"code": 33, "name": "Tamil Nadu", "districts_count": 5},
    {"code": 34, "name": "Puducherry", "districts_count": 2},
    {"code": 36, "name": "Telangana", "districts_count": 4},
    {"code": 37, "name": "Ladakh", "districts_count": 2}
]

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        # Sort by name
        sorted_states = sorted(STATES_DB, key=lambda x: x["name"])
        
        response = {
            "success": True,
            "data": sorted_states,
            "count": len(sorted_states)
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

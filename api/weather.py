"""
Weather API Endpoint
Returns weather information for a location
"""

from http.server import BaseHTTPRequestHandler
import json
from urllib.parse import urlparse, parse_qs
import random

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse query parameters
        parsed_url = urlparse(self.path)
        query_params = parse_qs(parsed_url.query)
        
        state_code = query_params.get('state_code', ['0'])[0]
        district_code = query_params.get('district_code', ['0'])[0]
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        # Generate realistic weather data
        base_temp = 28 + random.randint(-5, 5)
        humidity = 55 + random.randint(0, 30)
        
        conditions = ["Partly Cloudy", "Sunny", "Light Rain", "Cloudy", "Clear"]
        warnings = [
            "Moderate rainfall expected. Good for Kharif sowing.",
            "Clear skies expected. Ideal for harvesting.",
            "Light showers possible. Plan irrigation accordingly.",
            "Hot and dry conditions. Ensure adequate irrigation.",
            "Pleasant weather. Good for field activities."
        ]
        
        response = {
            "success": True,
            "data": {
                "temperature": base_temp,
                "humidity": humidity,
                "rainfall": random.randint(0, 20),
                "wind_speed": random.randint(5, 20),
                "condition": random.choice(conditions),
                "warning": random.choice(warnings),
                "forecast": [
                    {
                        "day": "Today",
                        "condition": random.choice(conditions),
                        "temp_max": base_temp + 4,
                        "temp_min": base_temp - 4
                    },
                    {
                        "day": "Tomorrow",
                        "condition": random.choice(conditions),
                        "temp_max": base_temp + 3,
                        "temp_min": base_temp - 5
                    },
                    {
                        "day": "Day 3",
                        "condition": random.choice(conditions),
                        "temp_max": base_temp + 2,
                        "temp_min": base_temp - 3
                    },
                    {
                        "day": "Day 4",
                        "condition": random.choice(conditions),
                        "temp_max": base_temp + 5,
                        "temp_min": base_temp - 2
                    },
                    {
                        "day": "Day 5",
                        "condition": random.choice(conditions),
                        "temp_max": base_temp + 3,
                        "temp_min": base_temp - 4
                    }
                ]
            }
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

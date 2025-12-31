"""
Krishi Mitra - Vercel Serverless API
Agriculture Advisory Platform
"""

from http.server import BaseHTTPRequestHandler
import json
from datetime import datetime

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        response = {
            "message": "Krishi Mitra API",
            "version": "1.0.0",
            "status": "running",
            "timestamp": datetime.utcnow().isoformat(),
            "endpoints": {
                "auth": "/api/auth",
                "states": "/api/states",
                "crops": "/api/crops",
                "weather": "/api/weather",
                "health": "/api/health"
            }
        }
        
        self.wfile.write(json.dumps(response).encode())
        return

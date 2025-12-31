"""
Authentication API Endpoint
Handles user registration and login
"""

from http.server import BaseHTTPRequestHandler
import json
import hashlib
import secrets
from datetime import datetime, timedelta
import base64

# In-memory user storage (for demo - in production use a database)
# This will reset on each deployment, but works for demonstration
USERS_DB = {}

def hash_password(password):
    """Simple password hashing for demo purposes"""
    return hashlib.sha256(password.encode()).hexdigest()

def create_token(user_id):
    """Create a simple token for demo purposes"""
    payload = f"{user_id}:{datetime.utcnow().isoformat()}:{secrets.token_hex(16)}"
    return base64.b64encode(payload.encode()).decode()

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        try:
            request_data = json.loads(post_data) if post_data else {}
            action = request_data.get('action', 'login')
            
            if action == 'register':
                response = self.handle_register(request_data)
            elif action == 'login':
                response = self.handle_login(request_data)
            else:
                response = {"success": False, "error": "Invalid action"}
                
        except Exception as e:
            response = {"success": False, "error": str(e)}
        
        self.wfile.write(json.dumps(response).encode())
        return
    
    def handle_register(self, data):
        """Handle user registration"""
        full_name = data.get('fullName', '')
        email = data.get('email', '')
        mobile = data.get('mobile', '')
        password = data.get('password', '')
        
        if not all([full_name, email, mobile, password]):
            return {"success": False, "error": "All fields are required"}
        
        if len(password) < 6:
            return {"success": False, "error": "Password must be at least 6 characters"}
        
        # For demo, always allow registration (in production, check if user exists)
        user_id = f"user_{len(USERS_DB) + 1}_{secrets.token_hex(4)}"
        
        user = {
            "id": user_id,
            "fullName": full_name,
            "email": email,
            "mobile": mobile,
            "password_hash": hash_password(password),
            "created_at": datetime.utcnow().isoformat()
        }
        
        USERS_DB[email] = user
        
        token = create_token(user_id)
        
        return {
            "success": True,
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": user_id,
                "fullName": full_name,
                "email": email,
                "mobile": mobile
            }
        }
    
    def handle_login(self, data):
        """Handle user login"""
        username = data.get('username', data.get('email', ''))
        password = data.get('password', '')
        
        if not username or not password:
            return {"success": False, "error": "Username and password are required"}
        
        # For demo purposes, create a mock user if doesn't exist
        # In production, validate against actual database
        user_id = f"user_{secrets.token_hex(4)}"
        
        token = create_token(user_id)
        
        return {
            "success": True,
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": user_id,
                "fullName": username.split('@')[0].title() if '@' in username else username,
                "email": username if '@' in username else f"{username}@example.com",
                "mobile": "9876543210"
            }
        }
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        return
    
    def do_GET(self):
        """Handle GET request - return API info"""
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        response = {
            "success": True,
            "message": "Auth API",
            "endpoints": {
                "POST /api/auth": {
                    "action": "login | register",
                    "fields": ["email/username", "password", "fullName (register)", "mobile (register)"]
                }
            }
        }
        
        self.wfile.write(json.dumps(response).encode())
        return

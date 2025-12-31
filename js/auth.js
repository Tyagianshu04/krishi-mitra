// ============================================
// Authentication Module
// Handles login, logout, and session management
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
});

function initializeAuth() {
    const loginForm = document.getElementById('loginForm');
    const demoBtn = document.getElementById('demoBtn');
    const togglePassword = document.getElementById('togglePassword');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (demoBtn) {
        demoBtn.addEventListener('click', handleDemoLogin);
    }

    if (togglePassword) {
        togglePassword.addEventListener('click', togglePasswordVisibility);
    }

    // Check if already logged in
    if (api.getToken()) {
        window.location.href = 'dashboard.html';
    }
}

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!username || !password) {
        showAlert('Please enter both username and password', 'error');
        return;
    }

    const loginBtn = document.getElementById('loginBtn');
    const originalText = loginBtn.innerHTML;
    
    try {
        // Disable button and show loading
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<span data-i18n="logging_in">Logging in...</span>';
        
        // First check local credentials (for registered users)
        const credentials = JSON.parse(localStorage.getItem('krishi_credentials') || '{}');
        const existingUsers = JSON.parse(localStorage.getItem('krishi_users') || '[]');
        
        if (credentials[username] && credentials[username] === password) {
            // Local login successful
            const user = existingUsers.find(u => u.email === username || u.mobile === username);
            
            if (user) {
                const mockToken = 'local_token_' + Date.now();
                api.setToken(mockToken);
                
                const userData = {
                    userId: user.userId,
                    name: user.fullName,
                    email: user.email,
                    mobile: user.mobile
                };
                localStorage.setItem(CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
                
                showAlert(translations[currentLanguage]?.login_success || 'Login successful!', 'success');
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
                return;
            }
        }
        
        // If local login fails, try API login
        try {
            const response = await api.login(username, password);
            
            if (response.success && response.data && response.data.token) {
                // Store token
                api.setToken(response.data.token);
                
                // Store user data
                const userData = {
                    userId: response.data.userId,
                    name: response.data.name || username,
                    email: username
                };
                localStorage.setItem(CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
                
                showAlert(translations[currentLanguage]?.login_success || 'Login successful!', 'success');
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                throw new Error(response.message || 'Login failed');
            }
        } catch (apiError) {
            // API login failed
            throw new Error('Invalid username or password. Please register if you are a new user.');
        }
    } catch (error) {
        console.error('Login error:', error);
        showAlert(error.message || translations[currentLanguage]?.login_error || 'Login failed. Please check your credentials.', 'error');
        loginBtn.disabled = false;
        loginBtn.innerHTML = originalText;
    }
}

// Handle demo login
async function handleDemoLogin() {
    const demoBtn = document.getElementById('demoBtn');
    const originalText = demoBtn.innerHTML;
    
    try {
        demoBtn.disabled = true;
        demoBtn.innerHTML = '<span data-i18n="loading">Loading...</span>';
        
        // Use demo credentials
        const response = await api.login(
            CONFIG.DEMO_CREDENTIALS.userName,
            CONFIG.DEMO_CREDENTIALS.userPassword
        );
        
        if (response.success && response.data && response.data.token) {
            api.setToken(response.data.token);
            
            const userData = {
                userId: 'demo',
                name: 'Demo User',
                email: CONFIG.DEMO_CREDENTIALS.userName
            };
            localStorage.setItem(CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
            
            showAlert(translations[currentLanguage].demo_login_success || 'Demo mode activated!', 'success');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            throw new Error('Demo login failed');
        }
    } catch (error) {
        console.error('Demo login error:', error);
        // If demo login fails, create a mock session for demonstration
        const mockToken = 'demo_token_' + Date.now();
        api.setToken(mockToken);
        
        const userData = {
            userId: 'demo',
            name: 'Demo User',
            email: 'demo@krishidss.gov.in'
        };
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
        
        showAlert('Demo mode activated (offline)!', 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }
}

// Toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePassword');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            </svg>
        `;
    } else {
        passwordInput.type = 'password';
        toggleBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
        `;
    }
}

// Show alert message
function showAlert(message, type = 'info') {
    const alertDiv = document.getElementById('loginAlert');
    if (!alertDiv) return;
    
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        alertDiv.classList.add('hidden');
    }, 5000);
}

// Handle logout
function logout() {
    api.clearToken();
    localStorage.removeItem(CONFIG.STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(CONFIG.STORAGE_KEYS.LOCATION_DATA);
    window.location.href = 'index.html';
}

// Check authentication status
function checkAuth() {
    if (!api.getToken()) {
        // Don't redirect if we're already on dashboard - allow limited functionality
        if (window.location.pathname.includes('dashboard')) {
            console.log('No auth token - running in limited mode');
            return false;
        }
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Export functions
if (typeof window !== 'undefined') {
    window.logout = logout;
    window.checkAuth = checkAuth;
}

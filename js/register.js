// ============================================
// Registration Module
// Handles user registration
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeRegistration();
});

function initializeRegistration() {
    const registerForm = document.getElementById('registerForm');
    const togglePassword = document.getElementById('togglePassword');

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }

    if (togglePassword) {
        togglePassword.addEventListener('click', togglePasswordVisibility);
    }

    // Check if already logged in
    if (api.getToken()) {
        window.location.href = 'dashboard.html';
    }
}

// Handle registration form submission
async function handleRegistration(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAccept = document.getElementById('termsAccept').checked;
    
    // Validation
    if (!fullName || !email || !mobile || !password) {
        showAlert('Please fill in all required fields', 'error');
        return;
    }

    if (password.length < 6) {
        showAlert('Password must be at least 6 characters long', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'error');
        return;
    }

    if (!termsAccept) {
        showAlert('Please accept the Terms and Conditions', 'error');
        return;
    }

    // Validate mobile number
    if (!/^[0-9]{10}$/.test(mobile)) {
        showAlert('Please enter a valid 10-digit mobile number', 'error');
        return;
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }

    const registerBtn = document.getElementById('registerBtn');
    const originalText = registerBtn.innerHTML;
    
    try {
        // Disable button and show loading
        registerBtn.disabled = true;
        registerBtn.innerHTML = '<span data-i18n="registering">Registering...</span>';
        
        // Store user data in localStorage (demo mode - in production, this would be sent to backend)
        const userData = {
            fullName: fullName,
            email: email,
            mobile: mobile,
            registeredDate: new Date().toISOString(),
            userId: 'user_' + Date.now()
        };

        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('krishi_users') || '[]');
        const userExists = existingUsers.some(u => u.email === email || u.mobile === mobile);

        if (userExists) {
            showAlert('User with this email or mobile already exists. Please login.', 'error');
            registerBtn.disabled = false;
            registerBtn.innerHTML = originalText;
            return;
        }

        // Add new user
        existingUsers.push(userData);
        localStorage.setItem('krishi_users', JSON.stringify(existingUsers));

        // Store credentials for login (In production, this would be handled by backend)
        const credentials = JSON.parse(localStorage.getItem('krishi_credentials') || '{}');
        credentials[email] = password;
        credentials[mobile] = password;
        localStorage.setItem('krishi_credentials', JSON.stringify(credentials));

        showAlert('Registration successful! Redirecting to login...', 'success');
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        
    } catch (error) {
        console.error('Registration error:', error);
        showAlert('Registration failed. Please try again.', 'error');
        registerBtn.disabled = false;
        registerBtn.innerHTML = originalText;
    }
}

// Toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('regPassword');
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
    const alertDiv = document.getElementById('registerAlert');
    if (!alertDiv) return;
    
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        alertDiv.classList.add('hidden');
    }, 5000);
}

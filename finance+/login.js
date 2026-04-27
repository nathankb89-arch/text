
        const loginForm = document.getElementById('loginForm');
        const messageEl = document.getElementById('message');
        const forgotLink = document.getElementById('forgotLink');

        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = loginForm.email.value.trim();
            const password = loginForm.password.value.trim();

            if (!email || !password) {
                showMessage('Please enter both email and password.', 'error');
                return;
            }

            if (!email.includes('@')) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate login validation
            if (email === 'user@example.com' && password === 'password') {
                showMessage('Login successful. Redirecting...', 'success');
                // Save login info to localStorage
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('userEmail', email);
                setTimeout(() => {
                    window.location.href = '/dashboard.html';
                }, 1200);
            } else {
                showMessage('Invalid email or password. Please try again.', 'error');
            }
        });

        forgotLink.addEventListener('click', function (event) {
            event.preventDefault();
            showMessage('Password recovery link sent to your email.', 'success');
        });

        function showMessage(text, type) {
            messageEl.textContent = text;
            messageEl.className = 'message ' + type;
            messageEl.style.display = 'block';
        }
        document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Simple mock user data (in a real app, this would be from a backend)
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Save session data
        localStorage.setItem('currentUser', JSON.stringify(user));
        if (remember) {
            localStorage.setItem('rememberMe', 'true');
        }
        // Redirect to profile page
        window.location.href = 'profile.html';
    } else {
        document.getElementById('message').textContent = 'Invalid email or password.';
        document.getElementById('message').style.color = 'red';
    }
});

// Handle forgot password (simple alert for demo)
document.getElementById('forgotLink').addEventListener('click', function(event) {
    event.preventDefault();
    alert('Forgot password functionality not implemented yet.');
});

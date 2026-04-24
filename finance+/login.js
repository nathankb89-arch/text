
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

            showMessage('Login successful. Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = '#';
            }, 1200);
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
            const messageDiv = document.getElementById('message');

            // Simulate login validation
            if (email === 'user@example.com' && password === 'password') {
                messageDiv.textContent = 'Login successful! Redirecting...';
                messageDiv.style.color = 'green';
                setTimeout(() => {
                    window.location.href = '/dashboard.html';
                }, 2000);
            } else {
                messageDiv.textContent = 'Invalid email or password. Please try again.';
                messageDiv.style.color = 'red';
            }
        });
    
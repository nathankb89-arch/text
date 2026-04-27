 document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const message = document.getElementById('message');
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            message.style.display = 'none';
            message.className = 'message';

            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                message.textContent = 'All fields are required.';
                message.classList.add('error');
                message.style.display = 'block';
                return;
            }

            if (password !== confirmPassword) {
                message.textContent = 'Passwords do not match.';
                message.classList.add('error');
                message.style.display = 'block';
                return;
            }

            if (password.length < 6) {
                message.textContent = 'Password must be at least 6 characters long.';
                message.classList.add('error');
                message.style.display = 'block';
                return;
            }

            // Simulate successful signup (in a real app, send to server)
            message.textContent = 'Sign up successful! Welcome to Finance+.';
            message.classList.add('success');
            message.style.display = 'block';
            document.getElementById('signupForm').reset();
        });
        window.location.href = 'profile.html';
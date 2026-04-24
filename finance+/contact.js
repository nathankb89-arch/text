 function handleSubmit(event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            const messageBox = document.getElementById('messageBox');

            // Validation
            if (!name || !email || !subject || !message) {
                showMessage('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }

            if (message.length < 10) {
                showMessage('Message must be at least 10 characters long', 'error');
                return;
            }

            // Simulate form submission
            console.log({
                name: name,
                email: email,
                subject: subject,
                message: message,
                timestamp: new Date().toLocaleString()
            });

            showMessage('Thank you! Your message has been sent successfully. We will respond soon.', 'success');
            document.getElementById('contactForm').reset();

            // Clear success message after 5 seconds
            setTimeout(() => {
                messageBox.style.display = 'none';
            }, 5000);
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function showMessage(text, type) {
            const messageBox = document.getElementById('messageBox');
            messageBox.textContent = text;
            messageBox.className = `message ${type}`;
            messageBox.style.display = 'block';
        }

        function navigateTo(page) {
            if (page === 'home') {
                window.location.href = 'index.html';
            } else if (page === 'contact') {
                window.location.href = 'contact.html';
            }
        }
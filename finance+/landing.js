 let messages = [];

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            if (message) {
                messages.push(message);
                displayMessages();
                input.value = '';
            }
        }

        function displayMessages() {
            const messagesDiv = document.getElementById('messages');
            messagesDiv.innerHTML = messages.map(msg => `<p>${msg}</p>`).join('');
        }

        function openModal(type) {
            const modal = document.getElementById('modal');
            const title = document.getElementById('modalTitle');
            const content = document.getElementById('modalContent');
            if (type === 'login') {
                title.textContent = 'Login';
                content.innerHTML = '<form><input type="email" placeholder="Email"><input type="password" placeholder="Password"><button type="submit">Login</button></form>';
            } else if (type === 'signup') {
                title.textContent = 'Sign Up';
                content.innerHTML = '<form><input type="text" placeholder="Name"><input type="email" placeholder="Email"><input type="password" placeholder="Password"><button type="submit">Sign Up</button></form>';
            } else if (type === 'getStarted') {
                title.textContent = 'Get Started';
                content.textContent = 'Welcome! Start managing your finances today.';
            } else {
                title.textContent = 'Feature';
                content.textContent = 'More details about this feature.';
            }
            modal.style.display = 'block';
        }

        function closeModal() {
            document.getElementById('modal').style.display = 'none';
        }

        window.onclick = function(event) {
            const modal = document.getElementById('modal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }
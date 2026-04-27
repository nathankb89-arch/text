  function showMessage(text, type = 'success') {
            const messageEl = document.getElementById('message');
            messageEl.textContent = text;
            messageEl.className = `message ${type}`;
            messageEl.style.display = 'block';
            setTimeout(() => {
                messageEl.style.display = 'none';
            }, 3000);
        }

        function updateProfile(event) {
            event.preventDefault();
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            
            if (!firstName || !lastName || !email) {
                showMessage('Please fill in all required fields', 'error');
                return;
            }

            document.getElementById('userName').textContent = `${firstName} ${lastName}`;
            document.getElementById('userEmail').textContent = email;
            document.getElementById('avatar').textContent = (firstName[0] + lastName[0]).toUpperCase();
            
            showMessage('Profile updated successfully!', 'success');
        }

        function changePassword(event) {
            event.preventDefault();
            const current = document.getElementById('currentPassword').value;
            const newPass = document.getElementById('newPassword').value;
            const confirm = document.getElementById('confirmPassword').value;

            if (!current || !newPass || !confirm) {
                showMessage('Please fill in all password fields', 'error');
                return;
            }

            if (newPass !== confirm) {
                showMessage('New passwords do not match', 'error');
                return;
            }

            if (newPass.length < 8) {
                showMessage('Password must be at least 8 characters', 'error');
                return;
            }

            resetPasswordForm();
            showMessage('Password changed successfully!', 'success');
        }

        function resetForm() {
            document.querySelector('form').reset();
        }

        function resetPasswordForm() {
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
        }

        function navigate(page) {
            showMessage(`Navigating to ${page}...`, 'success');
        }

        function addGoal(event) {
            event.preventDefault();
            const goal = {
                name: document.getElementById('goalName').value,
                targetAmount: parseFloat(document.getElementById('targetAmount').value),
                currentAmount: parseFloat(document.getElementById('currentAmount').value),
                deadline: document.getElementById('deadline').value
            };
            if (!goal.name || isNaN(goal.targetAmount) || isNaN(goal.currentAmount) || !goal.deadline) {
                showMessage('Please fill in all goal fields correctly', 'error');
                return;
            }
            showMessage(`Goal "${goal.name}" added successfully!`, 'success');
            document.getElementById('goalForm').reset();
        }
        
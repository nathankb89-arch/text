let goals = JSON.parse(localStorage.getItem('savingsGoals')) || [];

        function addGoal(event) {
            event.preventDefault();
            const nameInput = document.getElementById('goalName');
            const amountInput = document.getElementById('goalAmount');
            const currentInput = document.getElementById('currentAmount');
            
            const name = nameInput.value;
            const target = parseFloat(amountInput.value);
            const current = parseFloat(currentInput.value);

            if (name && target > 0 && current >= 0 && current <= target) {
                const goal = {
                    id: Date.now(),
                    name: name,
                    target: target,
                    current: current
                };
                goals.push(goal);
                saveGoals();
                displayGoals();
                updateStatistics();
                
                // Clear form
                nameInput.value = '';
                amountInput.value = '';
                currentInput.value = '';
                
                // Show success message
                showSuccessMessage();
                closeModal();
            } else if (current > target) {
                alert('Current amount cannot exceed target amount!');
            }
        }

        function saveGoals() {
            localStorage.setItem('savingsGoals', JSON.stringify(goals));
        }

        function updateStatistics() {
            const totalGoals = goals.length;
            const totalSaved = goals.reduce((sum, goal) => sum + goal.current, 0);
            const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
            const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

            document.getElementById('totalGoals').textContent = totalGoals;
            document.getElementById('totalSaved').textContent = '$' + totalSaved.toFixed(2);
            document.getElementById('totalTarget').textContent = '$' + totalTarget.toFixed(2);
            document.getElementById('overallProgress').textContent = overallProgress.toFixed(1) + '%';
        }

        function displayGoals() {
            const container = document.getElementById('goalsContainer');
            container.innerHTML = '';
            
            if (goals.length === 0) {
                container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 2rem;">No goals yet. Start by adding your first goal! 🎯</p>';
                return;
            }
            
            goals.forEach(goal => {
                const progress = (goal.current / goal.target) * 100;
                const isComplete = progress >= 100;
                const card = document.createElement('div');
                card.className = 'goal-card';
                card.innerHTML = `
                    <div class="goal-card-content">
                        ${isComplete ? '<div class="goal-status complete">✨ GOAL COMPLETED!</div>' : '<div class="goal-status incomplete">In Progress</div>'}
                        <h3>${goal.name}</h3>
                        <div class="goal-amounts">
                            <span class="goal-current">Saved: $${goal.current.toFixed(2)}</span>
                            <span class="goal-target">Target: $${goal.target.toFixed(2)}</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${Math.min(progress, 100)}%"></div>
                        </div>
                        <div class="progress-text">
                            <span>Progress</span>
                            <span class="progress-percentage">${progress.toFixed(1)}%</span>
                        </div>
                        <div class="goal-buttons">
                            <button class="btn-update" onclick="updateProgress(${goal.id})">📈 Update</button>
                            <button class="btn-delete" onclick="deleteGoal(${goal.id})">🗑️ Delete</button>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        function updateProgress(id) {
            const goal = goals.find(g => g.id === id);
            if (goal) {
                const newAmount = prompt(`Update current saved amount for "${goal.name}":\\n\\nCurrent: $${goal.current.toFixed(2)}\\nTarget: $${goal.target.toFixed(2)}`, goal.current);
                if (newAmount !== null) {
                    const amount = parseFloat(newAmount);
                    if (!isNaN(amount) && amount >= 0) {
                        if (amount > goal.target) {
                            alert('Amount cannot exceed target!');
                        } else {
                            const oldProgress = (goal.current / goal.target) * 100;
                            goal.current = amount;
                            const newProgress = (goal.current / goal.target) * 100;
                            
                            saveGoals();
                            displayGoals();
                            updateStatistics();
                            
                            if (newProgress >= 100 && oldProgress < 100) {
                                showCelebration(goal.name);
                            }
                        }
                    }
                }
            }
        }

        function deleteGoal(id) {
            if (confirm('Are you sure you want to delete this goal?')) {
                goals = goals.filter(g => g.id !== id);
                saveGoals();
                displayGoals();
                updateStatistics();
            }
        }

        function showSuccessMessage() {
            const message = document.getElementById('successMessage');
            message.style.display = 'block';
            setTimeout(() => {
                message.style.display = 'none';
            }, 3000);
        }

        function showCelebration(goalName) {
            alert(`🎉 Congratulations! You've completed your goal: ${goalName}! Keep up the great work!`);
        }

        function openModal(type) {
            const modal = document.getElementById('modal');
            const title = document.getElementById('modalTitle');
            const content = document.getElementById('modalContent');
            if (type === 'login') {
                title.textContent = 'Login';
                content.innerHTML = '<form><input type="email" placeholder="Email" required><input type="password" placeholder="Password" required><button type="submit">Login</button></form>';
            } else if (type === 'signup') {
                title.textContent = 'Sign Up';
                content.innerHTML = '<form><input type="text" placeholder="Name" required><input type="email" placeholder="Email" required><input type="password" placeholder="Password" required><button type="submit">Sign Up</button></form>';
            } else if (type === 'addGoal') {
                title.textContent = '✨ Add New Goal';
                content.innerHTML = `
                    <form onsubmit="addGoal(event)" style="display: flex; flex-direction: column; gap: 1rem;">
                        <input type="text" id="modalGoalName" placeholder="Goal Name" style="padding: 0.8rem; border: 2px solid #e9ecef; border-radius: 8px; font-size: 1rem;" required>
                        <input type="number" id="modalGoalAmount" placeholder="Target Amount ($)" style="padding: 0.8rem; border: 2px solid #e9ecef; border-radius: 8px; font-size: 1rem;" required>
                        <input type="number" id="modalCurrentAmount" placeholder="Current Saved ($)" style="padding: 0.8rem; border: 2px solid #e9ecef; border-radius: 8px; font-size: 1rem;" required>
                        <button type="submit" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 0.8rem; border: none; border-radius: 8px; font-size: 1rem; font-weight: 700; cursor: pointer;">Add Goal</button>
                    </form>
                `;
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

        // Load goals on page load
        displayGoals();
        updateStatistics();
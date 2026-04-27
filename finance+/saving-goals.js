
        const API_URL = 'https://jsonplaceholder.typicode.com/posts';
        let goals = [];

        // Initialize app
        window.addEventListener('DOMContentLoaded', () => {
            loadGoals();
        });

        async function loadGoals() {
            try {
                document.getElementById('loading').style.display = 'block';
                const response = await fetch(API_URL);
                const data = await response.json();
                
                // Mock data transformation
                goals = data.slice(0, 3).map((item, index) => ({
                    id: item.id,
                    name: ['Vacation Fund', 'Emergency Fund', 'Car Purchase'][index],
                    targetAmount: [5000, 3000, 15000][index],
                    currentAmount: [2500, 1500, 7500][index],
                    deadline: new Date(Date.now() + (index + 1) * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                }));

                displayGoals();
            } catch (error) {
                showMessage('Failed to load goals', 'error');
                console.error('Error:', error);
            } finally {
                document.getElementById('loading').style.display = 'none';
            }
        }

        function displayGoals() {
            const container = document.getElementById('goalsContainer');
            
            if (goals.length === 0) {
                container.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">No savings goals yet. Create one to get started!</p>';
                return;
            }

            container.innerHTML = goals.map(goal => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100;
                const remaining = goal.targetAmount - goal.currentAmount;

                return `
                    <div class="goal-card">
                        <h3>${goal.name}</h3>
                        <div class="goal-amount">
                            <span>$${goal.currentAmount.toFixed(2)}</span>
                            <span>$${goal.targetAmount.toFixed(2)}</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <p>${Math.round(progress)}% Complete</p>
                        <p style="color: #e74c3c;">Remaining: $${remaining.toFixed(2)}</p>
                        ${goal.deadline ? `<p>📅 Target: ${new Date(goal.deadline).toLocaleDateString()}</p>` : ''}
                        <div class="goal-actions">
                            <button class="btn btn-small" onclick="editGoal(${goal.id})">Edit</button>
                            <button class="btn btn-small btn-delete" onclick="deleteGoal(${goal.id})">Delete</button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function addGoal(event) {
            event.preventDefault();

            const goal = {
                id: Date.now(),
                name: document.getElementById('goalName').value,
                targetAmount: parseFloat(document.getElementById('targetAmount').value),
                currentAmount: parseFloat(document.getElementById('currentAmount').value),
                deadline: document.getElementById('deadline').value
            };

            goals.push(goal);
            showMessage('Goal added successfully!', 'success');
            document.getElementById('goalForm').reset();
            displayGoals();
        }

        function deleteGoal(id) {
            if (confirm('Are you sure you want to delete this goal?')) {
                goals = goals.filter(goal => goal.id !== id);
                showMessage('Goal deleted', 'success');
                displayGoals();
            }
        }

        function editGoal(id) {
            const goal = goals.find(g => g.id === id);
            if (goal) {
                document.getElementById('goalName').value = goal.name;
                document.getElementById('targetAmount').value = goal.targetAmount;
                document.getElementById('currentAmount').value = goal.currentAmount;
                document.getElementById('deadline').value = goal.deadline;
                goals = goals.filter(g => g.id !== id);
                scrollToForm();
            }
        }

        function refreshGoals() {
            loadGoals();
        }

        function scrollToForm() {
            document.getElementById('goalForm').scrollIntoView({ behavior: 'smooth' });
        }

        function showMessage(text, type) {
            const messageEl = document.getElementById('message');
            messageEl.textContent = text;
            messageEl.className = `message ${type} show`;
            
            setTimeout(() => {
                messageEl.classList.remove('show');
            }, 4000);
        }
     function showMessage(text, type = 'success') {
            const messageEl = document.getElementById('message');
            messageEl.textContent = text;
            messageEl.className = `message ${type} show`;

            setTimeout(() => {
                messageEl.classList.remove('show');
            }, 4000);
        }
   
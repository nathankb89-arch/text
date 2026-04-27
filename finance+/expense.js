
        // Initialize date input with today's date
        document.getElementById('expenseDate').valueAsDate = new Date();

        // Load expenses from localStorage
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

        // Add expense
        document.getElementById('expenseForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const expense = {
                id: Date.now(),
                name: document.getElementById('expenseName').value,
                amount: parseFloat(document.getElementById('expenseAmount').value),
                category: document.getElementById('expenseCategory').value,
                date: document.getElementById('expenseDate').value,
                description: document.getElementById('expenseDescription').value
            };

            expenses.push(expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            
            showMessage('Expense added successfully!', 'success');
            this.reset();
            document.getElementById('expenseDate').valueAsDate = new Date();
            updateUI();
        });

        // Delete expense
        function deleteExpense(id) {
            expenses = expenses.filter(e => e.id !== id);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            showMessage('Expense deleted!', 'success');
            updateUI();
        }

        // Update UI
        function updateUI() {
            displayExpenses();
            updateStats();
        }

        // Display expenses
        function displayExpenses() {
            const list = document.getElementById('expensesList');
            
            if (expenses.length === 0) {
                list.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No expenses yet. Add one to get started!</p>';
                return;
            }

            list.innerHTML = expenses.map(expense => `
                <div class="investment-item">
                    <div>
                        <h4>${expense.name}</h4>
                        <div class="expense-details">
                            <strong>${expense.category}</strong> • ${expense.date}
                            <br><small>${expense.description || 'No description'}</small>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div class="investment-value">$${expense.amount.toFixed(2)}</div>
                        <button class="btn btn-danger" onclick="deleteExpense(${expense.id})">Delete</button>
                    </div>
                </div>
            `).join('');
        }

        // Update statistics
        function updateStats() {
            const total = expenses.reduce((sum, e) => sum + e.amount, 0);
            const count = expenses.length;
            const average = count > 0 ? total / count : 0;
            
            document.getElementById('totalExpenses').textContent = '$' + total.toFixed(2);
            document.getElementById('monthlyAverage').textContent = '$' + average.toFixed(2);
            document.getElementById('expenseCount').textContent = count;

            // Top category
            if (expenses.length > 0) {
                const categories = {};
                expenses.forEach(e => {
                    categories[e.category] = (categories[e.category] || 0) + e.amount;
                });
                const topCat = Object.keys(categories).reduce((a, b) => 
                    categories[a] > categories[b] ? a : b
                );
                document.getElementById('topCategory').textContent = topCat;
            }
        }

        // Show message
        function showMessage(msg, type) {
            const box = document.getElementById('messageBox');
            box.textContent = msg;
            box.className = 'message ' + type;
            box.style.display = 'block';
            setTimeout(() => box.style.display = 'none', 3000);
        }

       // Delete expense
        function deleteExpense(id) {
            if (confirm('Are you sure you want to delete this expense?')) {
            expenses = expenses.filter(e => e.id !== id);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            showMessage('Expense deleted!', 'success');
            updateUI();
            }
        }


        // Initial load
        updateUI();

    
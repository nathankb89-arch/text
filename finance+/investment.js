
        let currentUser = null;
        let investments = [];

        function handleLogin(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username && password) {
                currentUser = username;
                investments = [];
                showMessage('Login successful!', 'success');
                document.getElementById('loginSection').style.display = 'none';
                document.getElementById('portfolioContainer').style.display = 'block';
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
                updatePortfolioDisplay();
            }
        }

        function logout() {
            currentUser = null;
            investments = [];
            document.getElementById('loginSection').style.display = 'flex';
            document.getElementById('portfolioContainer').style.display = 'none';
            document.getElementById('addInvestmentForm').classList.add('hidden');
        }

        function handleAddInvestment(event) {
            event.preventDefault();
            const investment = {
                id: Date.now(),
                name: document.getElementById('investmentName').value,
                type: document.getElementById('investmentType').value,
                initialAmount: parseFloat(document.getElementById('investmentAmount').value),
                currentValue: parseFloat(document.getElementById('currentValue').value)
            };

            investments.push(investment);
            document.getElementById('investmentName').value = '';
            document.getElementById('investmentType').value = '';
            document.getElementById('investmentAmount').value = '';
            document.getElementById('currentValue').value = '';
            hideAddForm();
            updatePortfolioDisplay();
            showMessage('Investment added successfully!', 'success');
        }

        function deleteInvestment(id) {
            investments = investments.filter(inv => inv.id !== id);
            updatePortfolioDisplay();
            showMessage('Investment removed!', 'success');
        }

        function updatePortfolioDisplay() {
            const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
            const totalGain = investments.reduce((sum, inv) => sum + (inv.currentValue - inv.initialAmount), 0);

            document.getElementById('totalValue').textContent = '$' + totalValue.toFixed(2);
            document.getElementById('totalGain').textContent = '$' + totalGain.toFixed(2);
            document.getElementById('investmentCount').textContent = investments.length;

            const investmentsList = document.getElementById('investmentsList');
            investmentsList.innerHTML = '';

            if (investments.length === 0) {
                investmentsList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No investments yet. Add one to get started!</p>';
                return;
            }

            investments.forEach(inv => {
                const gain = inv.currentValue - inv.initialAmount;
                const gainPercent = ((gain / inv.initialAmount) * 100).toFixed(2);
                const gainClass = gain >= 0 ? 'positive' : 'negative';

                const item = document.createElement('div');
                item.className = 'investment-item';
                item.innerHTML = `
                    <div>
                        <h4>${inv.name}</h4>
                        <p style="font-size: 0.9rem; color: #666;">${inv.type}</p>
                        <p style="font-size: 0.85rem; color: #999;">Initial: $${inv.initialAmount.toFixed(2)}</p>
                    </div>
                    <div style="text-align: right;">
                        <div class="investment-value">$${inv.currentValue.toFixed(2)}</div>
                        <p style="color: ${gain >= 0 ? '#27ae60' : '#e74c3c'}; margin: 0.5rem 0;">${gain >= 0 ? '+' : ''}$${gain.toFixed(2)} (${gainPercent}%)</p>
                        <button class="btn btn-danger" onclick="deleteInvestment(${inv.id})">Remove</button>
                    </div>
                `;
                investmentsList.appendChild(item);
            });
        }

        function showAddForm() {
            document.getElementById('addInvestmentForm').classList.remove('hidden');
        }

        function hideAddForm() {
            document.getElementById('addInvestmentForm').classList.add('hidden');
        }

        function showMessage(text, type) {
            const messageEl = document.getElementById('message');
            messageEl.textContent = text;
            messageEl.className = 'message ' + type;
            messageEl.style.display = 'block';
            setTimeout(() => {
                messageEl.style.display = 'none';
            }, 3000);
        }
    
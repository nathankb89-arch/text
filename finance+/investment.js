
            const form = document.getElementById('investment-form');
            const message = document.getElementById('message');
            const investmentsList = document.getElementById('investments-list');
            const totalValueEl = document.getElementById('total-value');
            const numInvestmentsEl = document.getElementById('num-investments');
            const topPerformingEl = document.getElementById('top-performing');

            let investments = JSON.parse(localStorage.getItem('investments')) || [];

            function displayInvestments() {
                investmentsList.innerHTML = '';
                if (investments.length === 0) {
                    investmentsList.innerHTML = '<div class="empty-state">No investments added yet. Add your first investment above!</div>';
                    return;
                }
                investments.forEach((inv, index) => {
                    const item = document.createElement('div');
                    item.className = 'post-item';
                    item.innerHTML = `
                        <div class="post-header">
                            <div class="post-author">${inv.name}</div>
                            <div class="post-category">${inv.type}</div>
                        </div>
                        <div class="post-title">Invested: $${inv.amount} | Current: $${inv.currentValue}</div>
                        <div class="post-content">${inv.notes || 'No notes'}</div>
                        <button onclick="confirmDelete(${index})" style="background: #e74c3c; color: white; border: none; padding: 0.5rem; border-radius: 5px; cursor: pointer;">Delete</button>
                    `;
                    investmentsList.appendChild(item);
                });
                updateStats();
            }

            function updateStats() {
                const totalValue = investments.reduce((sum, inv) => sum + parseFloat(inv.currentValue), 0);
                totalValueEl.textContent = `$${totalValue.toFixed(2)}`;
                numInvestmentsEl.textContent = investments.length;
                if (investments.length > 0) {
                    const top = investments.reduce((prev, current) => (parseFloat(current.currentValue) > parseFloat(prev.currentValue)) ? current : prev);
                    topPerformingEl.textContent = top.name;
                } else {
                    topPerformingEl.textContent = 'N/A';
                }
            }

            function showMessage(text, type) {
                message.textContent = text;
                message.className = `message ${type}`;
                message.style.display = 'block';
                setTimeout(() => {
                    message.style.display = 'none';
                }, 3000);
            }

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('investment-name').value;
                const type = document.getElementById('investment-type').value;
                const amount = document.getElementById('investment-amount').value;
                const currentValue = document.getElementById('current-value').value;
                const notes = document.getElementById('notes').value;

                if (!name || !type || !amount || !currentValue) {
                    showMessage('Please fill in all required fields.', 'error');
                    return;
                }

                investments.push({ name, type, amount, currentValue, notes, createdAt: new Date().toISOString() });
                localStorage.setItem('investments', JSON.stringify(investments));
                form.reset();
                displayInvestments();
                showMessage('Investment added successfully!', 'success');
            });

            function confirmDelete(index) {
                if (confirm('Are you sure you want to delete this investment?')) {
                    deleteInvestment(index);
                }
            }

            function deleteInvestment(index) {
                investments.splice(index, 1);
                localStorage.setItem('investments', JSON.stringify(investments));
                displayInvestments();
                showMessage('Investment deleted.', 'success');
            }

            displayInvestments();

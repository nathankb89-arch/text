let participants = JSON.parse(localStorage.getItem('jointParticipants')) || [];
        let transactions = JSON.parse(localStorage.getItem('jointTransactions')) || [];
        let balance = parseFloat(localStorage.getItem('jointBalance')) || 0;

        function updateUI() {
            document.getElementById('totalBalance').textContent = `$${balance.toFixed(2)}`;
            document.getElementById('participantCount').textContent = participants.length;
            renderParticipants();
            renderTransactions();
        }

        function renderParticipants() {
            const list = document.getElementById('participantsList');
            if (participants.length === 0) {
                list.innerHTML = '<div class="empty-state">No participants added yet.</div>';
                return;
            }
            list.innerHTML = participants.map((p, index) => `
                <div class="post-item">
                    <div class="post-header">
                        <div class="post-author">${p.name}</div>
                        <button class="btn-danger btn-small" onclick="removeParticipant(${index})">Remove</button>
                    </div>
                    <div class="post-content">${p.email}</div>
                </div>
            `).join('');
        }

        function renderTransactions() {
            const list = document.getElementById('transactionHistory');
            if (transactions.length === 0) {
                list.innerHTML = '<div class="empty-state">No transactions yet.</div>';
                return;
            }
            list.innerHTML = transactions.map(t => `
                <div class="post-item">
                    <div class="post-header">
                        <div class="post-author">$${t.amount.toFixed(2)}</div>
                        <div class="post-date">${new Date(t.date).toLocaleDateString()}</div>
                    </div>
                    <div class="post-content">${t.description}</div>
                </div>
            `).join('');
        }

        function showMessage(text, type) {
            const msg = document.getElementById('message');
            msg.textContent = text;
            msg.className = `message ${type}`;
            msg.style.display = 'block';
            setTimeout(() => msg.style.display = 'none', 3000);
        }

        document.getElementById('addParticipantForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('participantName').value.trim();
            const email = document.getElementById('participantEmail').value.trim();
            if (name && email) {
                participants.push({ name, email });
                localStorage.setItem('jointParticipants', JSON.stringify(participants));
                updateUI();
                this.reset();
                showMessage('Participant added successfully!', 'success');
            }
        });

        document.getElementById('addFundsForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('amount').value);
            const description = document.getElementById('description').value.trim();
            if (amount > 0 && description) {
                balance += amount;
                transactions.push({ amount, description, date: new Date().toISOString() });
                localStorage.setItem('jointBalance', balance);
                localStorage.setItem('jointTransactions', JSON.stringify(transactions));
                updateUI();
                this.reset();
                showMessage('Funds added successfully!', 'success');
            }
        });

        function removeParticipant(index) {
            participants.splice(index, 1);
            localStorage.setItem('jointParticipants', JSON.stringify(participants));
            updateUI();
            showMessage('Participant removed!', 'success');
        }

        updateUI();
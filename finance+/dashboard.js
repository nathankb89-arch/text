  // Sample data
        let balance = 5250.00;
        const transactions = [
            { description: 'Grocery Shopping', amount: -150.00 },
            { description: 'Salary Deposit', amount: 3000.00 },
            { description: 'Utility Bill', amount: -200.00 }
        ];

        // Function to update balance display
        function updateBalanceDisplay() {
            document.getElementById('balance').textContent = `$${balance.toFixed(2)}`;
        }

        // Function to display transactions
        function displayTransactions() {
            const list = document.getElementById('transactions');
            list.innerHTML = '';
            transactions.forEach(tx => {
                const li = document.createElement('li');
                li.textContent = `${tx.description}: $${tx.amount.toFixed(2)}`;
                list.appendChild(li);
            });
        }

        // Function to add a sample transaction
        function addTransaction() {
            const newTx = { description: 'New Expense', amount: -50.00 };
            transactions.push(newTx);
            balance += newTx.amount;
            updateBalanceDisplay();
            displayTransactions();
        }

        // Function to update balance (simulate)
        function updateBalance() {
            balance += 100.00; // Simulate adding $100
            updateBalanceDisplay();
        }

        // Initialize
        updateBalanceDisplay();
        displayTransactions();
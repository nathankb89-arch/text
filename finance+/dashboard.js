    let portfolioItems = [];

    function showMessage(type, text) {
        const messageEl = document.getElementById('message');
        messageEl.className = `message ${type}`;
        messageEl.textContent = text;
        messageEl.style.display = 'block';
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }

    async function fetchStockData(symbol) {
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=YOUR_API_KEY`);
            const data = await response.json();
            return data['Global Quote'];
        } catch (error) {
            console.error('Error fetching stock data:', error);
            return null;
        }
    }

    function filterStats(period) {
        const buttons = document.querySelectorAll('.stats-overview .filters button');
        buttons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        // Fetch and update stats based on period
        fetchPortfolioStats(period);
    }

    async function fetchPortfolioStats(period) {
        // Simulate API call for portfolio stats; replace with real endpoint
        try {
            const response = await fetch(`/api/portfolio/stats?period=${period}`);
            const stats = await response.json();
            // Update UI with stats, e.g., document.getElementById('totalValue').textContent = stats.totalValue;
            showMessage('success', `Stats updated for ${period}`);
        } catch (error) {
            showMessage('error', 'Failed to fetch stats');
        }
    }

    async function addPortfolioItem() {
        const asset = document.getElementById('asset').value;
        const amount = document.getElementById('amount').value;
        const symbol = document.getElementById('symbol').value;
        const date = document.getElementById('date').value;

        if (!amount || !symbol || !date) {
            showMessage('error', 'Please fill in all fields.');
            return;
        }

        // Fetch current price for the symbol
        const stockData = await fetchStockData(symbol);
        const currentPrice = stockData ? parseFloat(stockData['05. price']) : 0;

        portfolioItems.push({ asset, amount, symbol, date, currentPrice });
        showMessage('success', 'Portfolio item added successfully!');
        clearForm();
        renderPortfolio();
    }

    function clearForm() {
        document.getElementById('portfolioForm').reset();
    }

    function renderPortfolio() {
        const portfolioList = document.getElementById('portfolioList');
        portfolioList.innerHTML = '';
        portfolioItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.asset} (${item.symbol}): ${item.amount} shares @ $${item.currentPrice} (Added: ${item.date})`;
            portfolioList.appendChild(li);
        });
    }
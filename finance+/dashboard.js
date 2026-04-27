   const state = {
    currentFilter: "all",
    portfolio: JSON.parse(localStorage.getItem("financePlusPortfolio") || "[]"),
    marketStats: {
        balance: 45230,
        investments: 32450,
        savings: 12780,
        expenses: 8500
    }
};

window.addEventListener("DOMContentLoaded", initDashboard);

function initDashboard() {
    renderPortfolioItems();
    loadMarketData();
    loadLatestPosts();
}

function showMessage(type, text) {
    const messageEl = document.getElementById("message");
    if (!messageEl) return;
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
    messageEl.style.display = "block";

    clearTimeout(window.financeMessageTimeout);
    window.financeMessageTimeout = setTimeout(() => {
        messageEl.style.display = "none";
    }, 3500);
}

function filterStats(period) {
    state.currentFilter = period;
    const buttons = document.querySelectorAll(".filters button");
    buttons.forEach((button) => {
        button.classList.toggle("active", button.textContent.toLowerCase().includes(period));
    });

    const summary = document.querySelector(".stats-overview .summary p");
    if (summary) {
        const totals = {
            all: 125000,
            week: 124200,
            month: 123500,
            year: 125000
        };
        summary.textContent = `Total Portfolio: ${formatCurrency(totals[period] || totals.all)}`;
    }

    showMessage("success", `Showing stats for ${period}.`);
}

function clearForm() {
    const form = document.getElementById("portfolioForm");
    if (form) form.reset();
}

function addPortfolioItem() {
    const asset = document.getElementById("asset")?.value;
    const amount = Number(document.getElementById("amount")?.value);
    const symbol = document.getElementById("symbol")?.value.trim();
    const date = document.getElementById("date")?.value;

    if (!asset || !amount || !symbol || !date) {
        showMessage("error", "Please fill out every field before adding an item.");
        return;
    }

    const item = {
        asset,
        amount,
        symbol,
        date,
        addedAt: new Date().toISOString()
    };

    state.portfolio.unshift(item);
    localStorage.setItem("financePlusPortfolio", JSON.stringify(state.portfolio));
    renderPortfolioItems();
    clearForm();
    showMessage("success", `${symbol.toUpperCase()} added to portfolio.`);
}

function renderPortfolioItems() {
    let container = document.getElementById("portfolioItems");
    if (!container) {
        container = document.createElement("div");
        container.id = "portfolioItems";
        container.className = "portfolio-items";
        const portfolioCard = document.querySelector(".portfolio-card");
        if (portfolioCard) portfolioCard.appendChild(container);
    }

    if (state.portfolio.length === 0) {
        container.innerHTML = "<p class='empty'>No portfolio items yet. Add one to start tracking.</p>";
        return;
    }

    container.innerHTML = state.portfolio
        .map(
            (item) => `
            <div class="portfolio-item">
                <div class="portfolio-row">
                    <strong>${item.symbol.toUpperCase()}</strong>
                    <span>${item.asset}</span>
                </div>
                <div class="portfolio-row">
                    <span>Amount: ${formatNumber(item.amount)}</span>
                    <span>Purchased: ${item.date}</span>
                </div>
            </div>
        `
        )
        .join("");
}

function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(value);
}

function formatNumber(value) {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2
    }).format(value);
}

async function loadMarketData() {
    const statusBoxes = document.querySelectorAll(".stat-box");
    if (!statusBoxes.length) return;

    try {
        const [bitcoinResponse, fxResponse] = await Promise.all([
            fetch("https://api.coindesk.com/v1/bpi/currentprice/USD.json"),
            fetch("https://api.exchangerate.host/latest?base=USD&symbols=EUR,GBP,JPY")
        ]);

        if (!bitcoinResponse.ok || !fxResponse.ok) throw new Error("Market API error");

        const bitcoinData = await bitcoinResponse.json();
        const fxData = await fxResponse.json();
        const bitcoinPrice = bitcoinData.bpi?.USD?.rate_float || 47000;
        const eurRate = fxData.rates?.EUR || 0.93;

        const dynamicStats = {
            balance: state.marketStats.balance + Math.round(bitcoinPrice * 0.3),
            investments: state.marketStats.investments,
            savings: state.marketStats.savings + Math.round(eurRate * 2400),
            expenses: state.marketStats.expenses
        };

        const values = [
            { value: dynamicStats.balance, change: "+5.2%" },
            { value: dynamicStats.investments, change: "+3.8%" },
            { value: dynamicStats.savings, change: "+1.5%" },
            { value: dynamicStats.expenses, change: "-2.1%" }
        ];

        statusBoxes.forEach((box, index) => {
            const valueElement = box.querySelector(".stat-value");
            const changeElement = box.querySelector(".stat-change");
            if (valueElement) valueElement.textContent = formatCurrency(values[index].value);
            if (changeElement) changeElement.textContent = values[index].change;
        });

        const summary = document.querySelector(".stats-overview .summary p");
        if (summary) {
            summary.textContent = `Total Portfolio: ${formatCurrency(
                dynamicStats.balance + dynamicStats.investments + dynamicStats.savings - dynamicStats.expenses
            )}`;
        }

        showMessage("success", `Live data updated: BTC ${formatCurrency(bitcoinPrice)}, USD/EUR ${eurRate.toFixed(4)}.`);
    } catch (error) {
        console.error(error);
        showMessage("error", "Unable to fetch market data right now.");
    }
}

async function loadLatestPosts() {
    try {
        const [bitcoinResponse, fxResponse] = await Promise.all([
            fetch("https://api.coindesk.com/v1/bpi/currentprice/USD.json"),
            fetch("https://api.exchangerate.host/latest?base=USD&symbols=EUR,GBP,JPY")
        ]);

        if (!bitcoinResponse.ok || !fxResponse.ok) throw new Error("News API error");

        const bitcoinData = await bitcoinResponse.json();
        const fxData = await fxResponse.json();
        const bitcoinPrice = bitcoinData.bpi?.USD?.rate_float || 0;
        const eurRate = fxData.rates?.EUR || 0;
        const gbpRate = fxData.rates?.GBP || 0;

        const posts = [
            {
                author: "Finance+ API",
                category: "Crypto",
                title: "Bitcoin Live Price Update",
                content: `Bitcoin is trading at ${formatCurrency(bitcoinPrice)}. Keep an eye on volatility and diversification.`
            },
            {
                author: "Exchange Desk",
                category: "Forex",
                title: "USD Currency Snapshot",
                content: `USD currently trades at ${eurRate.toFixed(4)} EUR and ${gbpRate.toFixed(4)} GBP.`
            }
        ];

        const postsContainer = document.getElementById("posts");
        if (postsContainer) {
            postsContainer.innerHTML = posts
                .map(
                    (post) => `
                    <div class="post-item">
                        <div class="post-header">
                            <div class="post-author">${post.author}</div>
                            <div class="post-category">${post.category}</div>
                        </div>
                        <div class="post-title">${post.title}</div>
                        <div class="post-content">${post.content}</div>
                    </div>`
                )
                .join("");
        }
    } catch (error) {
        console.error(error);
        showMessage("error", "Unable to load the latest market posts.");
    }
}
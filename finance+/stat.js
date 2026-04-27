     const metricSets = {
            today: {
                activeUsers: 8700,
                savings: 12450,
                growth: 4.8,
                session: 12,
                tickets: 28,
                rating: 4.7,
                changes: {
                    activeUsers: '+7.1%',
                    savings: '+12.3%',
                    growth: '+0.8%',
                    session: '+6.5%',
                    tickets: '-4.5%',
                    rating: '+0.1'
                }
            },
            last7: {
                activeUsers: 54000,
                savings: 83210,
                growth: 5.6,
                session: 11,
                tickets: 190,
                rating: 4.68,
                changes: {
                    activeUsers: '+9.3%',
                    savings: '+15.7%',
                    growth: '+0.9%',
                    session: '+5.1%',
                    tickets: '-6.8%',
                    rating: '+0.08'
                }
            },
            last30: {
                activeUsers: 218000,
                savings: 343000,
                growth: 6.4,
                session: 10.2,
                tickets: 720,
                rating: 4.71,
                changes: {
                    activeUsers: '+11.2%',
                    savings: '+19.4%',
                    growth: '+1.2%',
                    session: '+4.4%',
                    tickets: '-8.2%',
                    rating: '+0.12'
                }
            }
        };

        const statMap = {
            statDAU: 'activeUsers',
            statSavings: 'savings',
            statGrowth: 'growth',
            statSession: 'session',
            statTickets: 'tickets',
            statRating: 'rating'
        };

        const changeMap = {
            changeDAU: 'activeUsers',
            changeSavings: 'savings',
            changeGrowth: 'growth',
            changeSession: 'session',
            changeTickets: 'tickets',
            changeRating: 'rating'
        };

        function formatNumber(value, key) {
            if (key === 'savings') return '$' + value.toLocaleString();
            if (key === 'growth' || key === 'rating') return value.toFixed(1) + (key === 'growth' ? '%' : '');
            if (key === 'session') return value + ' min';
            return value.toLocaleString();
        }

        function showMessage(type, text) {
            const msg = document.getElementById('statusMessage');
            msg.textContent = text;
            msg.className = 'message ' + type;
            msg.style.display = 'block';
            clearTimeout(msg.hideTimeout);
            msg.hideTimeout = setTimeout(() => msg.style.display = 'none', 4200);
        }

        function updateStats(period) {
            const data = metricSets[period];
            if (!data) return;
            Object.keys(statMap).forEach(id => {
                const key = statMap[id];
                document.getElementById(id).textContent = formatNumber(data[key], key);
            });
            Object.keys(changeMap).forEach(id => {
                const key = changeMap[id];
                document.getElementById(id).textContent = data.changes[key];
            });
            document.getElementById('activePeriod').textContent =
                period === 'today' ? 'Today' : period === 'last7' ? 'Last 7 Days' : 'Last 30 Days';
            document.getElementById('lastUpdated').textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            document.querySelectorAll('.stats-overview button').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.period === period);
            });
            document.getElementById('reportPeriod').value = period;
            showMessage('success', 'Finance+ statistics updated for ' + document.getElementById('activePeriod').textContent + '.');
        }

        function scrollToSection(id) {
            const elem = document.getElementById(id);
            if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function downloadReport() {
            const period = document.getElementById('reportPeriod').value;
            const data = metricSets[period];
            const lines = [
                'Metric,Value,Change',
                `Daily Active Users,${data.activeUsers},${data.changes.activeUsers}`,
                `Monthly Savings,${data.savings},${data.changes.savings}`,
                `Growth Rate,${data.growth}%,${data.changes.growth}`,
                `Avg Session Length,${data.session} min,${data.changes.session}`,
                `Support Requests,${data.tickets},${data.changes.tickets}`,
                `App Rating,${data.rating},${data.changes.rating}`
            ];
            const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `financeplus_stats_${period}.csv`;
            link.click();
            URL.revokeObjectURL(link.href);
            showMessage('success', 'Report downloaded successfully.');
        }

        function copySummary() {
            const period = document.getElementById('reportPeriod').value;
            const data = metricSets[period];
            const summary = `Finance+ ${document.getElementById('activePeriod').textContent} summary:\n`
                + `DAU: ${data.activeUsers}\n`
                + `Savings: $${data.savings}\n`
                + `Growth: ${data.growth}%\n`
                + `Session: ${data.session} min\n`
                + `Tickets: ${data.tickets}\n`
                + `Rating: ${data.rating}`;
            navigator.clipboard.writeText(summary).then(() => {
                showMessage('success', 'Summary copied to clipboard.');
            }, () => {
                showMessage('error', 'Unable to copy summary. Please try again.');
            });
        }

        document.getElementById('btnRefresh').addEventListener('click', () => {
            updateStats(document.getElementById('reportPeriod').value);
        });
        document.getElementById('btnDownload').addEventListener('click', downloadReport);
        document.getElementById('btnCopy').addEventListener('click', copySummary);

        document.querySelectorAll('.stats-overview button').forEach(button => {
            button.addEventListener('click', () => updateStats(button.dataset.period));
        });

        updateStats('today');
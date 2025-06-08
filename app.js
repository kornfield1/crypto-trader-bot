/**
 * Main application script for the CryptoTrader Bot
 */

// DOM Elements
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

// Global state
let marketData = [];
let tradeHistory = [];
let latestSignals = [];
let refreshInterval = 30; // seconds
let refreshTimer = null;

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize internationalization
    i18n.init();
    
    // Initialize charts
    charts.init();
    
    // Setup navigation
    setupNavigation();
    
    // Load initial data
    loadDashboardData();
    loadMarketData();
    loadSignalsData();
    loadTradesData();
    
    // Setup form submissions
    setupFormSubmissions();
    
    // Setup refresh interval
    setupRefreshInterval();
    
    // Setup event listeners
    setupEventListeners();
});

/**
 * Setup navigation between sections
 */
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
            
            // Update active nav link
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
            
            // Refresh data for the active section
            switch (targetId) {
                case 'dashboard':
                    loadDashboardData();
                    break;
                case 'market':
                    loadMarketData();
                    break;
                case 'signals':
                    loadSignalsData();
                    break;
                case 'trades':
                    loadTradesData();
                    break;
            }
        });
    });
}

/**
 * Load dashboard data
 */
async function loadDashboardData() {
    try {
        // Load bot status
        const statusResponse = await api.getBotStatus();
        if (statusResponse.status === 'success') {
            const botStatus = statusResponse.data;
            
            // Update status indicators
            document.getElementById('uptime').textContent = botStatus.uptime;
            document.getElementById('trades-today').textContent = botStatus.trades_today;
            document.getElementById('active-pairs').textContent = botStatus.active_symbols.length;
            document.getElementById('profit-today').textContent = formatCurrency(botStatus.profit_today);
            document.getElementById('profit-percent').textContent = formatPercentage(botStatus.profit_today / 100);
            document.getElementById('total-profit').textContent = formatCurrency(botStatus.total_profit);
            
            // Set profit/loss class
            if (botStatus.profit_today > 0) {
                document.getElementById('profit-today').classList.add('profit');
                document.getElementById('profit-today').classList.remove('loss');
            } else {
                document.getElementById('profit-today').classList.add('loss');
                document.getElementById('profit-today').classList.remove('profit');
            }
            
            if (botStatus.total_profit > 0) {
                document.getElementById('total-profit').classList.add('profit');
                document.getElementById('total-profit').classList.remove('loss');
            } else {
                document.getElementById('total-profit').classList.add('loss');
                document.getElementById('total-profit').classList.remove('profit');
            }
        }
        
        // Load recent trades
        const tradesResponse = await api.getTradeHistory();
        if (tradesResponse.status === 'success') {
            tradeHistory = tradesResponse.data;
            
            // Display recent trades (top 5)
            const recentTradesEl = document.getElementById('recent-trades');
            recentTradesEl.innerHTML = '';
            
            const recentTrades = tradeHistory.slice(0, 5);
            recentTrades.forEach(trade => {
                const row = document.createElement('tr');
                
                // Format date
                const date = new Date(trade.timestamp);
                const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                
                // Determine profit/loss class
                let profitLossClass = '';
                if (trade.profit_loss > 0) {
                    profitLossClass = 'profit';
                } else if (trade.profit_loss < 0) {
                    profitLossClass = 'loss';
                }
                
                row.innerHTML = `
                    <td>${formattedDate}</td>
                    <td>${trade.symbol}/USDT</td>
                    <td class="${trade.type === 'buy' ? 'text-success' : 'text-danger'}">${i18n.t('trades.' + trade.type)}</td>
                    <td>${formatCurrency(trade.price)}</td>
                    <td>${trade.quantity.toFixed(4)}</td>
                    <td>${formatCurrency(trade.total)}</td>
                    <td class="${profitLossClass}">${trade.profit_loss !== null ? formatCurrency(trade.profit_loss) : '-'}</td>
                `;
                
                recentTradesEl.appendChild(row);
            });
        }
        
        // Load latest signals
        const latestSignalsEl = document.getElementById('latest-signals');
        latestSignalsEl.innerHTML = '';
        
        // Get signals for BTC, ETH, and ADA
        const symbols = ['BTC', 'ETH', 'ADA'];
        latestSignals = [];
        
        for (const symbol of symbols) {
            const signalsResponse = await api.getTradingSignals(symbol);
            if (signalsResponse.status === 'success') {
                latestSignals = [...latestSignals, ...signalsResponse.signals];
            }
        }
        
        // Sort by timestamp (most recent first)
        latestSignals.sort((a, b) => b.timestamp - a.timestamp);
        
        // Display latest signals (top 3)
        const recentSignals = latestSignals.slice(0, 3);
        recentSignals.forEach(signal => {
            const signalItem = document.createElement('div');
            signalItem.className = `signal-item ${signal.type.includes('buy') ? 'buy' : 'sell'}`;
            
            // Format date
            const date = new Date(signal.timestamp);
            const today = new Date();
            let formattedDate = '';
            
            if (date.toDateString() === today.toDateString()) {
                formattedDate = i18n.t('signals.today') + ', ' + date.toLocaleTimeString();
            } else {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                if (date.toDateString() === yesterday.toDateString()) {
                    formattedDate = i18n.t('signals.yesterday') + ', ' + date.toLocaleTimeString();
                } else {
                    formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                }
            }
            
            signalItem.innerHTML = `
                <div class="signal-icon">
                    <i class="bi bi-${signal.type.includes('buy') ? 'arrow-up' : 'arrow-down'}-circle-fill"></i>
                </div>
                <div class="signal-info">
                    <div class="signal-title">${signal.symbol}/USDT <span class="signal-type">${i18n.t('signals.' + signal.type)}</span></div>
                    <div class="signal-details">
                        <span class="signal-time">${formattedDate}</span>
                        <span class="signal-confidence">${signal.confidence}%</span>
                    </div>
                </div>
            `;
            
            latestSignalsEl.appendChild(signalItem);
        });
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

/**
 * Load market data
 */
async function loadMarketData() {
    try {
        const response = await api.getRealtimeMarket();
        if (response.status === 'success') {
            marketData = response.data;
            
            // Display market data
            const marketDataEl = document.getElementById('market-data');
            marketDataEl.innerHTML = '';
            
            marketData.forEach(coin => {
                const row = document.createElement('tr');
                
                // Determine change class
                const changeClass = coin.change_24h >= 0 ? 'text-success' : 'text-danger';
                
                row.innerHTML = `
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="img/coins/${coin.symbol.toLowerCase()}.png" alt="${coin.name}" class="coin-icon" onerror="this.src='img/coins/generic.png'">
                            <div>
                                <div class="fw-bold">${coin.name}</div>
                                <div class="text-muted">${coin.symbol}</div>
                            </div>
                        </div>
                    </td>
                    <td>${formatCurrency(coin.price)}</td>
                    <td class="${changeClass}">${coin.change_24h >= 0 ? '+' : ''}${coin.change_24h.toFixed(2)}%</td>
                    <td>${formatCurrency(coin.volume_24h, 0)}</td>
                    <td>${formatCurrency(coin.market_cap, 0)}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="viewCoinDetails('${coin.symbol}')">${i18n.t('market.viewChart')}</button>
                    </td>
                `;
                
                marketDataEl.appendChild(row);
            });
            
            // Update technical analysis for current selected coin
            const symbol = document.getElementById('detail-chart-symbol').value;
            updateTechnicalAnalysis(symbol);
        }
    } catch (error) {
        console.error('Error loading market data:', error);
    }
}

/**
 * View coin details
 */
function viewCoinDetails(symbol) {
    // Switch to market tab
    document.querySelector('[href="#market"]').click();
    
    // Set the selected coin
    document.getElementById('detail-chart-symbol').value = symbol;
    
    // Update the chart
    charts.updateDetailChart();
}

/**
 * Load signals data
 */
async function loadSignalsData() {
    try {
        const signalsList = document.getElementById('signals-list');
        signalsList.innerHTML = '';
        
        // Get signals for top coins
        const symbols = ['BTC', 'ETH', 'BNB', 'XRP', 'ADA', 'SOL', 'DOT', 'DOGE', 'AVAX', 'MATIC'];
        latestSignals = [];
        
        for (const symbol of symbols) {
            const response = await api.getTradingSignals(symbol);
            if (response.status === 'success') {
                latestSignals = [...latestSignals, ...response.signals];
            }
        }
        
        // Sort by timestamp (most recent first)
        latestSignals.sort((a, b) => b.timestamp - a.timestamp);
        
        // Apply filters
        const coinFilter = document.getElementById('signal-coin').value;
        const typeFilter = document.getElementById('signal-type').value;
        const dateFilter = document.getElementById('signal-date').value;
        const confidenceFilter = document.getElementById('signal-confidence').value;
        
        let filteredSignals = latestSignals;
        
        if (coinFilter !== 'all') {
            filteredSignals = filteredSignals.filter(signal => signal.symbol === coinFilter);
        }
        
        if (typeFilter !== 'all') {
            filteredSignals = filteredSignals.filter(signal => signal.type === typeFilter);
        }
        
        if (dateFilter !== 'all') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            
            const weekStart = new Date(today);
            weekStart.setDate(weekStart.getDate() - weekStart.getDay());
            
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            
            switch (dateFilter) {
                case 'today':
                    filteredSignals = filteredSignals.filter(signal => new Date(signal.timestamp) >= today);
                    break;
                case 'yesterday':
                    filteredSignals = filteredSignals.filter(signal => {
                        const date = new Date(signal.timestamp);
                        return date >= yesterday && date < today;
                    });
                    break;
                case 'week':
                    filteredSignals = filteredSignals.filter(signal => new Date(signal.timestamp) >= weekStart);
                    break;
                case 'month':
                    filteredSignals = filteredSignals.filter(signal => new Date(signal.timestamp) >= monthStart);
                    break;
            }
        }
        
        if (confidenceFilter !== 'all') {
            switch (confidenceFilter) {
                case 'high':
                    filteredSignals = filteredSignals.filter(signal => signal.confidence > 80);
                    break;
                case 'medium':
                    filteredSignals = filteredSignals.filter(signal => signal.confidence >= 60 && signal.confidence <= 80);
                    break;
                case 'low':
                    filteredSignals = filteredSignals.filter(signal => signal.confidence < 60);
                    break;
            }
        }
        
        // Display signals
        if (filteredSignals.length === 0) {
            signalsList.innerHTML = `<div class="text-center p-4">${i18n.t('signals.noSignals')}</div>`;
        } else {
            filteredSignals.forEach(signal => {
                const signalItem = document.createElement('div');
                signalItem.className = 'card mb-3';
                
                // Format date
                const date = new Date(signal.timestamp);
                const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                
                // Determine signal type class
                let signalTypeClass = '';
                if (signal.type.includes('buy')) {
                    signalTypeClass = 'success';
                } else if (signal.type.includes('sell')) {
                    signalTypeClass = 'danger';
                }
                
                signalItem.innerHTML = `
                    <div class="card-header bg-${signalTypeClass} text-white">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="mb-0">${signal.symbol}/USDT - ${i18n.t('signals.' + signal.type)}</h5>
                            <span class="badge bg-light text-dark">${signal.confidence}% ${i18n.t('signals.confidence')}</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <p><strong>${i18n.t('signals.basedOn')}</strong> ${signal.indicators.join(', ')}</p>
                        <p><strong>${i18n.t('signals.time')}:</strong> ${formattedDate}</p>
                    </div>
                `;
                
                signalsList.appendChild(signalItem);
            });
        }
    } catch (error) {
        console.error('Error loading signals data:', error);
    }
}

/**
 * Load trades data
 */
async function loadTradesData() {
    try {
        const response = await api.getTradeHistory();
        if (response.status === 'success') {
            tradeHistory = response.data;
            
            // Apply filters
            const coinFilter = document.getElementById('trade-coin').value;
            const typeFilter = document.getElementById('trade-type').value;
            const dateFilter = document.getElementById('trade-date').value;
            const resultFilter = document.getElementById('trade-result').value;
            
            let filteredTrades = tradeHistory;
            
            if (coinFilter !== 'all') {
                filteredTrades = filteredTrades.filter(trade => trade.symbol === coinFilter);
            }
            
            if (typeFilter !== 'all') {
                filteredTrades = filteredTrades.filter(trade => trade.type === typeFilter);
            }
            
            if (dateFilter !== 'all') {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                
                const weekStart = new Date(today);
                weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                
                switch (dateFilter) {
                    case 'today':
                        filteredTrades = filteredTrades.filter(trade => new Date(trade.timestamp) >= today);
                        break;
                    case 'yesterday':
                        filteredTrades = filteredTrades.filter(trade => {
                            const date = new Date(trade.timestamp);
                            return date >= yesterday && date < today;
                        });
                        break;
                    case 'week':
                        filteredTrades = filteredTrades.filter(trade => new Date(trade.timestamp) >= weekStart);
                        break;
                    case 'month':
                        filteredTrades = filteredTrades.filter(trade => new Date(trade.timestamp) >= monthStart);
                        break;
                }
            }
            
            if (resultFilter !== 'all') {
                switch (resultFilter) {
                    case 'profit':
                        filteredTrades = filteredTrades.filter(trade => trade.profit_loss > 0);
                        break;
                    case 'loss':
                        filteredTrades = filteredTrades.filter(trade => trade.profit_loss < 0);
                        break;
                }
            }
            
            // Display trades
            const tradesHistoryEl = document.getElementById('trades-history');
            tradesHistoryEl.innerHTML = '';
            
            filteredTrades.forEach(trade => {
                const row = document.createElement('tr');
                
                // Format date
                const date = new Date(trade.timestamp);
                const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                
                // Determine profit/loss class
                let profitLossClass = '';
                if (trade.profit_loss > 0) {
                    profitLossClass = 'text-success';
                } else if (trade.profit_loss < 0) {
                    profitLossClass = 'text-danger';
                }
                
                row.innerHTML = `
                    <td>${formattedDate}</td>
                    <td>${trade.symbol}/USDT</td>
                    <td class="${trade.type === 'buy' ? 'text-success' : 'text-danger'}">${i18n.t('trades.' + trade.type)}</td>
                    <td>${formatCurrency(trade.price)}</td>
                    <td>${trade.quantity.toFixed(4)}</td>
                    <td>${formatCurrency(trade.total)}</td>
                    <td class="${profitLossClass}">${trade.profit_loss !== null ? formatCurrency(trade.profit_loss) : '-'}</td>
                    <td><span class="badge bg-${trade.status === 'completed' ? 'success' : trade.status === 'cancelled' ? 'danger' : 'warning'}">${i18n.t('trades.' + trade.status)}</span></td>
                `;
                
                tradesHistoryEl.appendChild(row);
            });
            
            // Update summary
            document.getElementById('total-trades').textContent = filteredTrades.length;
            
            // Calculate net profit
            const netProfit = filteredTrades.reduce((total, trade) => {
                return total + (trade.profit_loss || 0);
            }, 0);
            
            document.getElementById('net-profit').textContent = formatCurrency(netProfit);
            document.getElementById('net-profit').className = netProfit >= 0 ? 'text-success' : 'text-danger';
        }
    } catch (error) {
        console.error('Error loading trades data:', error);
    }
}

/**
 * Setup form submissions
 */
function setupFormSubmissions() {
    // Bot settings form
    document.getElementById('bot-settings-form').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification(i18n.t('notifications.settingsSaved'));
    });
    
    // Indicators settings form
    document.getElementById('indicators-settings-form').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification(i18n.t('notifications.settingsSaved'));
    });
    
    // App settings form
    document.getElementById('app-settings-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update language
        const language = document.getElementById('app-language').value;
        i18n.setLanguage(language);
        
        // Update theme
        const theme = document.getElementById('app-theme').value;
        setTheme(theme);
        
        // Update refresh interval
        refreshInterval = parseInt(document.getElementById('refresh-interval').value);
        setupRefreshInterval();
        
        showNotification(i18n.t('notifications.settingsSaved'));
    });
}

/**
 * Setup refresh interval
 */
function setupRefreshInterval() {
    // Clear existing timer
    if (refreshTimer) {
        clearInterval(refreshTimer);
    }
    
    // Set new timer
    refreshTimer = setInterval(() => {
        const activeSection = document.querySelector('.section.active');
        if (activeSection) {
            switch (activeSection.id) {
                case 'dashboard':
                    loadDashboardData();
                    break;
                case 'market':
                    loadMarketData();
                    break;
                case 'signals':
                    loadSignalsData();
                    break;
                case 'trades':
                    loadTradesData();
                    break;
            }
        }
    }, refreshInterval * 1000);
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Filter changes in signals section
    document.querySelectorAll('#signal-coin, #signal-type, #signal-date, #signal-confidence').forEach(element => {
        element.addEventListener('change', loadSignalsData);
    });
    
    // Filter changes in trades section
    document.querySelectorAll('#trade-coin, #trade-type, #trade-date, #trade-result').forEach(element => {
        element.addEventListener('change', loadTradesData);
    });
    
    // Market search
    document.getElementById('market-search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#market-data tr');
        
        rows.forEach(row => {
            const coinName = row.querySelector('td:first-child').textContent.toLowerCase();
            if (coinName.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
    
    // Language change event
    document.addEventListener('languageChanged', function() {
        // Reload current section data
        const activeSection = document.querySelector('.section.active');
        if (activeSection) {
            switch (activeSection.id) {
                case 'dashboard':
                    loadDashboardData();
                    break;
                case 'market':
                    loadMarketData();
                    break;
                case 'signals':
                    loadSignalsData();
                    break;
                case 'trades':
                    loadTradesData();
                    break;
            }
        }
    });
}

/**
 * Set theme
 */
function setTheme(theme) {
    const body = document.body;
    
    if (theme === 'light') {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
    } else if (theme === 'dark') {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    } else if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
        } else {
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
        }
    }
    
    // Store theme preference
    localStorage.setItem('app_theme', theme);
}

/**
 * Show notification
 */
function showNotification(message) {
    // Check if notifications are enabled
    const notificationsEnabled = document.getElementById('enable-notifications').checked;
    if (!notificationsEnabled) {
        return;
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Format currency
 */
function formatCurrency(value, decimals = 2) {
    return '$' + value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

/**
 * Format percentage
 */
function formatPercentage(value) {
    return (value >= 0 ? '+' : '') + (value * 100).toFixed(2) + '%';
}

/**
 * Update technical analysis
 */
function updateTechnicalAnalysis(symbol) {
    try {
        api.getTechnicalAnalysis(symbol).then(response => {
            if (response.status === 'success') {
                const analysis = response.data;
                const technicalAnalysisEl = document.getElementById('technical-analysis');
                
                // Update coin name and recommendation
                technicalAnalysisEl.querySelector('.coin-name').textContent = `${analysis.name} (${analysis.symbol})`;
                
                const recommendationEl = technicalAnalysisEl.querySelector('.recommendation');
                recommendationEl.textContent = i18n.t(`signals.${analysis.recommendation}`);
                recommendationEl.className = `recommendation ${analysis.recommendation.includes('buy') ? 'buy' : analysis.recommendation.includes('sell') ? 'sell' : 'hold'}`;
                
                // Update indicators
                // (This would be expanded with real data)
            }
        });
    } catch (error) {
        console.error('Error updating technical analysis:', error);
    }
}

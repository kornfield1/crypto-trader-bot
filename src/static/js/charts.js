/**
 * Charts module for the CryptoTrader Bot
 */

// Chart instances
let priceChart = null;
let detailChart = null;

/**
 * Initialize charts
 */
function initCharts() {
    // Set Chart.js defaults
    Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--chart-text').trim();
    Chart.defaults.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--chart-grid').trim();
    
    // Initialize price chart
    initPriceChart();
    
    // Initialize detail chart
    initDetailChart();
    
    // Add event listeners for chart controls
    document.querySelectorAll('#chart-symbol, [data-timeframe]').forEach(element => {
        element.addEventListener('change', updatePriceChart);
        element.addEventListener('click', function() {
            if (this.getAttribute('data-timeframe')) {
                document.querySelectorAll('[data-timeframe]').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                updatePriceChart();
            }
        });
    });
    
    document.querySelectorAll('#detail-chart-symbol').forEach(element => {
        element.addEventListener('change', updateDetailChart);
    });
}

/**
 * Initialize price chart
 */
function initPriceChart() {
    const ctx = document.getElementById('price-chart').getContext('2d');
    
    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Price',
                data: [],
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim(),
                backgroundColor: hexToRgba(getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim(), 0.1),
                borderWidth: 2,
                pointRadius: 0,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        color: hexToRgba(getComputedStyle(document.documentElement).getPropertyValue('--chart-grid').trim(), 0.1)
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            }
        }
    });
    
    // Load initial data
    updatePriceChart();
}

/**
 * Initialize detail chart
 */
function initDetailChart() {
    const ctx = document.getElementById('detail-chart').getContext('2d');
    
    detailChart = new Chart(ctx, {
        type: 'candlestick',
        data: {
            datasets: [{
                label: 'Price',
                data: []
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        color: hexToRgba(getComputedStyle(document.documentElement).getPropertyValue('--chart-grid').trim(), 0.1)
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            }
        }
    });
    
    // Load initial data
    updateDetailChart();
}

/**
 * Update price chart with new data
 */
async function updatePriceChart() {
    const symbol = document.getElementById('chart-symbol').value;
    const timeframeBtn = document.querySelector('[data-timeframe].active');
    const timeframe = timeframeBtn ? timeframeBtn.getAttribute('data-timeframe') : '1d';
    
    let days = 30;
    switch (timeframe) {
        case '1d':
            days = 1;
            break;
        case '1w':
            days = 7;
            break;
        case '1m':
            days = 30;
            break;
        case '3m':
            days = 90;
            break;
    }
    
    try {
        const response = await api.getPriceData(symbol, days);
        
        if (response.status === 'success') {
            const chartData = response.data.map(item => ({
                x: new Date(item.timestamp),
                y: item.close
            }));
            
            priceChart.data.datasets[0].label = `${response.name} (${response.symbol})`;
            priceChart.data.datasets[0].data = chartData;
            priceChart.options.scales.x.time.unit = days <= 7 ? 'hour' : 'day';
            priceChart.update();
        }
    } catch (error) {
        console.error('Error updating price chart:', error);
    }
}

/**
 * Update detail chart with new data
 */
async function updateDetailChart() {
    const symbol = document.getElementById('detail-chart-symbol').value;
    
    try {
        const response = await api.getPriceData(symbol, 30);
        
        if (response.status === 'success') {
            const chartData = response.data.map(item => ({
                x: new Date(item.timestamp),
                o: item.open,
                h: item.high,
                l: item.low,
                c: item.close
            }));
            
            detailChart.data.datasets[0].label = `${response.name} (${response.symbol})`;
            detailChart.data.datasets[0].data = chartData;
            detailChart.update();
            
            // Also update technical analysis
            updateTechnicalAnalysis(symbol);
        }
    } catch (error) {
        console.error('Error updating detail chart:', error);
    }
}

/**
 * Update technical analysis section
 */
async function updateTechnicalAnalysis(symbol) {
    try {
        const response = await api.getTechnicalAnalysis(symbol);
        
        if (response.status === 'success') {
            const analysis = response.data;
            const technicalAnalysisEl = document.getElementById('technical-analysis');
            
            // Update coin name and recommendation
            technicalAnalysisEl.querySelector('.coin-name').textContent = `${analysis.name} (${analysis.symbol})`;
            
            const recommendationEl = technicalAnalysisEl.querySelector('.recommendation');
            recommendationEl.textContent = i18n.t(`signals.${analysis.recommendation}`);
            recommendationEl.className = `recommendation ${analysis.recommendation.includes('buy') ? 'buy' : analysis.recommendation.includes('sell') ? 'sell' : 'hold'}`;
            
            // Update RSI
            const rsiValue = technicalAnalysisEl.querySelector('.indicator:nth-child(1) .indicator-value');
            const rsiStatus = technicalAnalysisEl.querySelector('.indicator:nth-child(1) .indicator-status');
            rsiValue.textContent = analysis.indicators.rsi;
            
            let rsiStatusClass = 'neutral';
            let rsiStatusText = 'neutral';
            if (analysis.indicators.rsi > 70) {
                rsiStatusClass = 'sell';
                rsiStatusText = 'signals.sell';
            } else if (analysis.indicators.rsi < 30) {
                rsiStatusClass = 'buy';
                rsiStatusText = 'signals.buy';
            }
            rsiStatus.className = `indicator-status ${rsiStatusClass}`;
            rsiStatus.textContent = i18n.t(rsiStatusText);
            
            // Update MACD
            const macdValue = technicalAnalysisEl.querySelector('.indicator:nth-child(2) .indicator-value');
            const macdStatus = technicalAnalysisEl.querySelector('.indicator:nth-child(2) .indicator-status');
            macdValue.textContent = analysis.indicators.macd.value;
            
            let macdStatusClass = 'neutral';
            let macdStatusText = 'neutral';
            if (analysis.indicators.macd.value > analysis.indicators.macd.signal) {
                macdStatusClass = 'buy';
                macdStatusText = 'signals.buy';
            } else if (analysis.indicators.macd.value < analysis.indicators.macd.signal) {
                macdStatusClass = 'sell';
                macdStatusText = 'signals.sell';
            }
            macdStatus.className = `indicator-status ${macdStatusClass}`;
            macdStatus.textContent = i18n.t(macdStatusText);
            
            // Update trend
            const trendIndicator = technicalAnalysisEl.querySelector('.trend-indicator');
            trendIndicator.className = `trend-indicator ${analysis.trend.includes('bull') ? 'bullish' : 'bearish'}`;
            trendIndicator.querySelector('span').textContent = i18n.t(`market.${analysis.trend.includes('bull') ? 'bullish' : 'bearish'}`);
        }
    } catch (error) {
        console.error('Error updating technical analysis:', error);
    }
}

/**
 * Convert hex color to rgba
 */
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Export functions
window.charts = {
    init: initCharts,
    updatePriceChart,
    updateDetailChart
};

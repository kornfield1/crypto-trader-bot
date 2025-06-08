/**
 * Internationalization module for the CryptoTrader Bot
 */

// Available languages
const LANGUAGES = {
    pt: 'Português',
    en: 'English'
};

// Default language
let currentLanguage = 'pt';

// Translations
const translations = {
    pt: {
        // Navigation
        "nav.dashboard": "Dashboard",
        "nav.market": "Mercado",
        "nav.signals": "Sinais",
        "nav.trades": "Operações",
        "nav.settings": "Configurações",
        
        // Dashboard
        "dashboard.title": "Dashboard",
        "dashboard.status": "Status",
        "dashboard.online": "Online",
        "dashboard.offline": "Offline",
        "dashboard.uptime": "Tempo ativo:",
        "dashboard.todayTrades": "Operações Hoje",
        "dashboard.activePairs": "Pares ativos:",
        "dashboard.todayProfit": "Lucro Hoje",
        "dashboard.profitPercent": "Percentual:",
        "dashboard.totalProfit": "Lucro Total",
        "dashboard.since": "Desde:",
        "dashboard.priceChart": "Gráfico de Preços",
        "dashboard.latestSignals": "Últimos Sinais",
        "dashboard.viewAllSignals": "Ver Todos os Sinais",
        "dashboard.recentTrades": "Operações Recentes",
        "dashboard.viewAllTrades": "Ver Todas as Operações",
        
        // Market
        "market.title": "Mercado",
        "market.overview": "Visão Geral do Mercado",
        "market.searchCoin": "Buscar moeda...",
        "market.coin": "Moeda",
        "market.price": "Preço",
        "market.change24h": "Variação 24h",
        "market.volume24h": "Volume 24h",
        "market.marketCap": "Cap. de Mercado",
        "market.action": "Ação",
        "market.detailedChart": "Gráfico Detalhado",
        "market.technicalAnalysis": "Análise Técnica",
        "market.oscillators": "Osciladores",
        "market.movingAverages": "Médias Móveis",
        "market.trend": "Tendência",
        "market.bullish": "Altista",
        "market.bearish": "Baixista",
        "market.neutral": "Neutro",
        "market.viewChart": "Ver Gráfico",
        
        // Signals
        "signals.title": "Sinais de Trading",
        "signals.filter": "Filtrar Sinais",
        "signals.coin": "Moeda",
        "signals.allCoins": "Todas as Moedas",
        "signals.type": "Tipo",
        "signals.allTypes": "Todos os Tipos",
        "signals.buy": "Compra",
        "signals.sell": "Venda",
        "signals.strongBuy": "Compra Forte",
        "signals.strongSell": "Venda Forte",
        "signals.date": "Data",
        "signals.allDates": "Todas as Datas",
        "signals.today": "Hoje",
        "signals.yesterday": "Ontem",
        "signals.thisWeek": "Esta Semana",
        "signals.thisMonth": "Este Mês",
        "signals.confidence": "Confiança",
        "signals.allLevels": "Todos os Níveis",
        "signals.high": "Alta (>80%)",
        "signals.medium": "Média (60-80%)",
        "signals.low": "Baixa (<60%)",
        "signals.list": "Lista de Sinais",
        "signals.noSignals": "Nenhum sinal encontrado",
        "signals.basedOn": "Baseado em:",
        "signals.time": "Hora:",
        
        // Trades
        "trades.title": "Histórico de Operações",
        "trades.filter": "Filtrar Operações",
        "trades.coin": "Moeda",
        "trades.allCoins": "Todas as Moedas",
        "trades.type": "Tipo",
        "trades.allTypes": "Todos os Tipos",
        "trades.buy": "Compra",
        "trades.sell": "Venda",
        "trades.dateRange": "Período",
        "trades.allDates": "Todas as Datas",
        "trades.today": "Hoje",
        "trades.yesterday": "Ontem",
        "trades.thisWeek": "Esta Semana",
        "trades.thisMonth": "Este Mês",
        "trades.result": "Resultado",
        "trades.allResults": "Todos os Resultados",
        "trades.profit": "Lucro",
        "trades.loss": "Perda",
        "trades.history": "Histórico de Operações",
        "trades.totalTrades": "Total:",
        "trades.netProfit": "Lucro Líquido:",
        "trades.date": "Data",
        "trades.pair": "Par",
        "trades.price": "Preço",
        "trades.amount": "Quantidade",
        "trades.total": "Total",
        "trades.profitLoss": "Lucro/Perda",
        "trades.status": "Status",
        "trades.completed": "Concluída",
        "trades.cancelled": "Cancelada",
        "trades.pending": "Pendente",
        
        // Settings
        "settings.title": "Configurações",
        "settings.botSettings": "Configurações do Bot",
        "settings.riskProfile": "Perfil de Risco",
        "settings.conservative": "Conservador",
        "settings.moderate": "Moderado",
        "settings.aggressive": "Agressivo",
        "settings.tradingPairs": "Pares de Trading",
        "settings.pairsHelp": "Selecione múltiplos pares segurando Ctrl/Cmd",
        "settings.capitalPerTrade": "Capital por Operação (USD)",
        "settings.maxOpenTrades": "Máximo de Operações Abertas",
        "settings.tradingTimeframe": "Timeframe de Trading",
        "settings.1m": "1 minuto",
        "settings.5m": "5 minutos",
        "settings.15m": "15 minutos",
        "settings.30m": "30 minutos",
        "settings.1h": "1 hora",
        "settings.4h": "4 horas",
        "settings.1d": "1 dia",
        "settings.saveSettings": "Salvar Configurações",
        "settings.indicators": "Configurações de Indicadores",
        "settings.rsi": "RSI",
        "settings.period": "Período",
        "settings.overbought": "Sobrecomprado",
        "settings.oversold": "Sobrevendido",
        "settings.macd": "MACD",
        "settings.fastPeriod": "Período Rápido",
        "settings.slowPeriod": "Período Lento",
        "settings.signalPeriod": "Período de Sinal",
        "settings.bollingerBands": "Bandas de Bollinger",
        "settings.deviation": "Desvio",
        "settings.movingAverages": "Médias Móveis",
        "settings.fastMA": "MA Rápida",
        "settings.slowMA": "MA Lenta",
        "settings.saveIndicators": "Salvar Indicadores",
        "settings.appSettings": "Configurações da Aplicação",
        "settings.language": "Idioma",
        "settings.portuguese": "Português",
        "settings.english": "English",
        "settings.theme": "Tema",
        "settings.light": "Claro",
        "settings.dark": "Escuro",
        "settings.auto": "Automático",
        "settings.refreshInterval": "Intervalo de Atualização (segundos)",
        "settings.chartStyle": "Estilo de Gráfico",
        "settings.candlestick": "Candlestick",
        "settings.line": "Linha",
        "settings.area": "Área",
        "settings.enableNotifications": "Habilitar notificações no navegador",
        "settings.saveAppSettings": "Salvar Configurações da Aplicação",
        
        // Footer
        "footer.copyright": "© 2025 CryptoTrader Bot. Todos os direitos reservados.",
        "footer.version": "Versão 1.0.0",
        
        // Notifications
        "notifications.settingsSaved": "Configurações salvas com sucesso!",
        "notifications.error": "Ocorreu um erro. Tente novamente.",
        "notifications.newSignal": "Novo sinal de trading detectado!",
        "notifications.tradeExecuted": "Operação executada com sucesso!"
    },
    en: {
        // Navigation
        "nav.dashboard": "Dashboard",
        "nav.market": "Market",
        "nav.signals": "Signals",
        "nav.trades": "Trades",
        "nav.settings": "Settings",
        
        // Dashboard
        "dashboard.title": "Dashboard",
        "dashboard.status": "Status",
        "dashboard.online": "Online",
        "dashboard.offline": "Offline",
        "dashboard.uptime": "Uptime:",
        "dashboard.todayTrades": "Today's Trades",
        "dashboard.activePairs": "Active pairs:",
        "dashboard.todayProfit": "Today's Profit",
        "dashboard.profitPercent": "Percentage:",
        "dashboard.totalProfit": "Total Profit",
        "dashboard.since": "Since:",
        "dashboard.priceChart": "Price Chart",
        "dashboard.latestSignals": "Latest Signals",
        "dashboard.viewAllSignals": "View All Signals",
        "dashboard.recentTrades": "Recent Trades",
        "dashboard.viewAllTrades": "View All Trades",
        
        // Market
        "market.title": "Market",
        "market.overview": "Market Overview",
        "market.searchCoin": "Search coin...",
        "market.coin": "Coin",
        "market.price": "Price",
        "market.change24h": "24h Change",
        "market.volume24h": "24h Volume",
        "market.marketCap": "Market Cap",
        "market.action": "Action",
        "market.detailedChart": "Detailed Chart",
        "market.technicalAnalysis": "Technical Analysis",
        "market.oscillators": "Oscillators",
        "market.movingAverages": "Moving Averages",
        "market.trend": "Trend",
        "market.bullish": "Bullish",
        "market.bearish": "Bearish",
        "market.neutral": "Neutral",
        "market.viewChart": "View Chart",
        
        // Signals
        "signals.title": "Trading Signals",
        "signals.filter": "Filter Signals",
        "signals.coin": "Coin",
        "signals.allCoins": "All Coins",
        "signals.type": "Type",
        "signals.allTypes": "All Types",
        "signals.buy": "Buy",
        "signals.sell": "Sell",
        "signals.strongBuy": "Strong Buy",
        "signals.strongSell": "Strong Sell",
        "signals.date": "Date",
        "signals.allDates": "All Dates",
        "signals.today": "Today",
        "signals.yesterday": "Yesterday",
        "signals.thisWeek": "This Week",
        "signals.thisMonth": "This Month",
        "signals.confidence": "Confidence",
        "signals.allLevels": "All Levels",
        "signals.high": "High (>80%)",
        "signals.medium": "Medium (60-80%)",
        "signals.low": "Low (<60%)",
        "signals.list": "Signal List",
        "signals.noSignals": "No signals found",
        "signals.basedOn": "Based on:",
        "signals.time": "Time:",
        
        // Trades
        "trades.title": "Trade History",
        "trades.filter": "Filter Trades",
        "trades.coin": "Coin",
        "trades.allCoins": "All Coins",
        "trades.type": "Type",
        "trades.allTypes": "All Types",
        "trades.buy": "Buy",
        "trades.sell": "Sell",
        "trades.dateRange": "Date Range",
        "trades.allDates": "All Dates",
        "trades.today": "Today",
        "trades.yesterday": "Yesterday",
        "trades.thisWeek": "This Week",
        "trades.thisMonth": "This Month",
        "trades.result": "Result",
        "trades.allResults": "All Results",
        "trades.profit": "Profit",
        "trades.loss": "Loss",
        "trades.history": "Trade History",
        "trades.totalTrades": "Total:",
        "trades.netProfit": "Net Profit:",
        "trades.date": "Date",
        "trades.pair": "Pair",
        "trades.price": "Price",
        "trades.amount": "Amount",
        "trades.total": "Total",
        "trades.profitLoss": "Profit/Loss",
        "trades.status": "Status",
        "trades.completed": "Completed",
        "trades.cancelled": "Cancelled",
        "trades.pending": "Pending",
        
        // Settings
        "settings.title": "Settings",
        "settings.botSettings": "Bot Settings",
        "settings.riskProfile": "Risk Profile",
        "settings.conservative": "Conservative",
        "settings.moderate": "Moderate",
        "settings.aggressive": "Aggressive",
        "settings.tradingPairs": "Trading Pairs",
        "settings.pairsHelp": "Select multiple pairs by holding Ctrl/Cmd",
        "settings.capitalPerTrade": "Capital per Trade (USD)",
        "settings.maxOpenTrades": "Maximum Open Trades",
        "settings.tradingTimeframe": "Trading Timeframe",
        "settings.1m": "1 minute",
        "settings.5m": "5 minutes",
        "settings.15m": "15 minutes",
        "settings.30m": "30 minutes",
        "settings.1h": "1 hour",
        "settings.4h": "4 hours",
        "settings.1d": "1 day",
        "settings.saveSettings": "Save Settings",
        "settings.indicators": "Indicator Settings",
        "settings.rsi": "RSI",
        "settings.period": "Period",
        "settings.overbought": "Overbought",
        "settings.oversold": "Oversold",
        "settings.macd": "MACD",
        "settings.fastPeriod": "Fast Period",
        "settings.slowPeriod": "Slow Period",
        "settings.signalPeriod": "Signal Period",
        "settings.bollingerBands": "Bollinger Bands",
        "settings.deviation": "Deviation",
        "settings.movingAverages": "Moving Averages",
        "settings.fastMA": "Fast MA",
        "settings.slowMA": "Slow MA",
        "settings.saveIndicators": "Save Indicators",
        "settings.appSettings": "Application Settings",
        "settings.language": "Language",
        "settings.portuguese": "Português",
        "settings.english": "English",
        "settings.theme": "Theme",
        "settings.light": "Light",
        "settings.dark": "Dark",
        "settings.auto": "Auto",
        "settings.refreshInterval": "Refresh Interval (seconds)",
        "settings.chartStyle": "Chart Style",
        "settings.candlestick": "Candlestick",
        "settings.line": "Line",
        "settings.area": "Area",
        "settings.enableNotifications": "Enable browser notifications",
        "settings.saveAppSettings": "Save Application Settings",
        
        // Footer
        "footer.copyright": "© 2025 CryptoTrader Bot. All rights reserved.",
        "footer.version": "Version 1.0.0",
        
        // Notifications
        "notifications.settingsSaved": "Settings saved successfully!",
        "notifications.error": "An error occurred. Please try again.",
        "notifications.newSignal": "New trading signal detected!",
        "notifications.tradeExecuted": "Trade executed successfully!"
    }
};

/**
 * Initialize the internationalization module
 */
function initI18n() {
    // Try to get language from localStorage
    const savedLang = localStorage.getItem('app_language');
    if (savedLang && translations[savedLang]) {
        currentLanguage = savedLang;
    }
    
    // Set initial language
    setLanguage(currentLanguage);
    
    // Add event listeners to language selector buttons
    document.querySelectorAll('.language-selector button').forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            if (lang && translations[lang]) {
                setLanguage(lang);
            }
        });
    });
}

/**
 * Set the application language
 * @param {string} lang - Language code
 */
function setLanguage(lang) {
    if (!translations[lang]) {
        console.error(`Language ${lang} not supported`);
        return;
    }
    
    currentLanguage = lang;
    localStorage.setItem('app_language', lang);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update all elements with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Update language selector buttons
    document.querySelectorAll('.language-selector button').forEach(button => {
        const buttonLang = button.getAttribute('data-lang');
        if (buttonLang === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Dispatch event for other components to react
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
}

/**
 * Get translation for a key
 * @param {string} key - Translation key
 * @param {Object} params - Parameters to replace in the translation
 * @returns {string} - Translated text
 */
function t(key, params = {}) {
    let text = translations[currentLanguage][key] || key;
    
    // Replace parameters
    Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
    });
    
    return text;
}

/**
 * Get current language
 * @returns {string} - Current language code
 */
function getCurrentLanguage() {
    return currentLanguage;
}

// Export functions
window.i18n = {
    init: initI18n,
    setLanguage,
    t,
    getCurrentLanguage
};

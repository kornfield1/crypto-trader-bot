/**
 * API client for interacting with the backend
 */

class ApiClient {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
    }

    /**
     * Make a GET request to the API
     * @param {string} endpoint - API endpoint
     * @param {Object} params - Query parameters
     * @returns {Promise<Object>} - Response data
     */
    async get(endpoint, params = {}) {
        try {
            const url = new URL(`${this.baseUrl}/api${endpoint}`, window.location.origin);
            
            // Add query parameters
            Object.keys(params).forEach(key => {
                if (params[key] !== undefined && params[key] !== null) {
                    url.searchParams.append(key, params[key]);
                }
            });
            
            const response = await fetch(url.toString());
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            throw error;
        }
    }

    /**
     * Get list of cryptocurrencies
     * @returns {Promise<Object>} - List of cryptocurrencies
     */
    async getCryptocurrencies() {
        return this.get('/cryptocurrencies');
    }

    /**
     * Get price data for a cryptocurrency
     * @param {string} symbol - Cryptocurrency symbol
     * @param {number} days - Number of days of data to retrieve
     * @returns {Promise<Object>} - Price data
     */
    async getPriceData(symbol, days = 30) {
        return this.get(`/price/${symbol}`, { days });
    }

    /**
     * Get trading signals for a cryptocurrency
     * @param {string} symbol - Cryptocurrency symbol
     * @returns {Promise<Object>} - Trading signals
     */
    async getTradingSignals(symbol) {
        return this.get(`/signals/${symbol}`);
    }

    /**
     * Get technical analysis for a cryptocurrency
     * @param {string} symbol - Cryptocurrency symbol
     * @returns {Promise<Object>} - Technical analysis
     */
    async getTechnicalAnalysis(symbol) {
        return this.get(`/analysis/${symbol}`);
    }

    /**
     * Get real-time market data
     * @returns {Promise<Object>} - Real-time market data
     */
    async getRealtimeMarket() {
        return this.get('/market/realtime');
    }

    /**
     * Get bot status
     * @returns {Promise<Object>} - Bot status
     */
    async getBotStatus() {
        return this.get('/bot/status');
    }

    /**
     * Get trade history
     * @returns {Promise<Object>} - Trade history
     */
    async getTradeHistory() {
        return this.get('/bot/trades');
    }
}

// Create global API client instance
const api = new ApiClient();

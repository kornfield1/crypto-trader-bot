from flask import Blueprint, jsonify, request
import json
import time
import random
from datetime import datetime, timedelta

# Criar blueprint para API
api_bp = Blueprint('api', __name__)

# Dados simulados para as top 30 criptomoedas
CRYPTO_DATA = {
    "BTC": {"name": "Bitcoin", "symbol": "BTC"},
    "ETH": {"name": "Ethereum", "symbol": "ETH"},
    "BNB": {"name": "Binance Coin", "symbol": "BNB"},
    "XRP": {"name": "Ripple", "symbol": "XRP"},
    "ADA": {"name": "Cardano", "symbol": "ADA"},
    "SOL": {"name": "Solana", "symbol": "SOL"},
    "DOT": {"name": "Polkadot", "symbol": "DOT"},
    "DOGE": {"name": "Dogecoin", "symbol": "DOGE"},
    "AVAX": {"name": "Avalanche", "symbol": "AVAX"},
    "MATIC": {"name": "Polygon", "symbol": "MATIC"},
    "LINK": {"name": "Chainlink", "symbol": "LINK"},
    "UNI": {"name": "Uniswap", "symbol": "UNI"},
    "ATOM": {"name": "Cosmos", "symbol": "ATOM"},
    "LTC": {"name": "Litecoin", "symbol": "LTC"},
    "ALGO": {"name": "Algorand", "symbol": "ALGO"},
    "XLM": {"name": "Stellar", "symbol": "XLM"},
    "FIL": {"name": "Filecoin", "symbol": "FIL"},
    "VET": {"name": "VeChain", "symbol": "VET"},
    "AAVE": {"name": "Aave", "symbol": "AAVE"},
    "EOS": {"name": "EOS", "symbol": "EOS"},
    "AXS": {"name": "Axie Infinity", "symbol": "AXS"},
    "XTZ": {"name": "Tezos", "symbol": "XTZ"},
    "THETA": {"name": "Theta Network", "symbol": "THETA"},
    "EGLD": {"name": "Elrond", "symbol": "EGLD"},
    "FTM": {"name": "Fantom", "symbol": "FTM"},
    "HBAR": {"name": "Hedera", "symbol": "HBAR"},
    "NEO": {"name": "NEO", "symbol": "NEO"},
    "CAKE": {"name": "PancakeSwap", "symbol": "CAKE"},
    "KSM": {"name": "Kusama", "symbol": "KSM"},
    "RUNE": {"name": "THORChain", "symbol": "RUNE"}
}

# Função para gerar preços simulados
def generate_price_data(symbol, days=30):
    base_prices = {
        "BTC": 50000, "ETH": 3000, "BNB": 400, "XRP": 0.5, "ADA": 1.2,
        "SOL": 100, "DOT": 20, "DOGE": 0.1, "AVAX": 80, "MATIC": 1.5,
        "LINK": 15, "UNI": 10, "ATOM": 25, "LTC": 150, "ALGO": 1,
        "XLM": 0.3, "FIL": 40, "VET": 0.1, "AAVE": 200, "EOS": 5,
        "AXS": 60, "XTZ": 4, "THETA": 6, "EGLD": 150, "FTM": 2,
        "HBAR": 0.2, "NEO": 40, "CAKE": 8, "KSM": 200, "RUNE": 8
    }
    
    base_price = base_prices.get(symbol, 100)  # Preço base padrão se o símbolo não estiver na lista
    volatility = 0.05  # 5% de volatilidade diária
    
    now = datetime.now()
    data = []
    
    # Gerar dados históricos
    for i in range(days, 0, -1):
        date = now - timedelta(days=i)
        # Usar o timestamp como seed para ter consistência nos dados gerados
        random.seed(int(date.timestamp()) + hash(symbol))
        
        # Calcular preço com alguma aleatoriedade, mas mantendo tendência
        daily_change = random.uniform(-volatility, volatility)
        price = base_price * (1 + daily_change)
        
        # Adicionar alguma tendência ao longo do tempo
        trend_factor = 1 + (0.01 * (days - i) / days)
        price *= trend_factor
        
        # Calcular volumes e outros dados
        volume = price * random.uniform(1000, 10000)
        high = price * (1 + random.uniform(0, 0.03))
        low = price * (1 - random.uniform(0, 0.03))
        open_price = price * (1 + random.uniform(-0.02, 0.02))
        
        data.append({
            "timestamp": int(date.timestamp() * 1000),
            "date": date.strftime("%Y-%m-%d"),
            "open": round(open_price, 2),
            "high": round(high, 2),
            "low": round(low, 2),
            "close": round(price, 2),
            "volume": round(volume, 2)
        })
    
    return data

# Função para gerar sinais de trading simulados
def generate_trading_signals(symbol):
    now = datetime.now()
    signals = []
    
    # Gerar alguns sinais aleatórios para os últimos 7 dias
    for i in range(7, 0, -1):
        date = now - timedelta(days=i)
        random.seed(int(date.timestamp()) + hash(symbol))
        
        # 30% de chance de gerar um sinal
        if random.random() < 0.3:
            signal_type = random.choice(["buy", "sell", "strong_buy", "strong_sell"])
            
            # Determinar indicadores que geraram o sinal
            indicators = []
            if random.random() < 0.5:
                indicators.append("RSI")
            if random.random() < 0.5:
                indicators.append("MACD")
            if random.random() < 0.5:
                indicators.append("Bollinger Bands")
            if random.random() < 0.5:
                indicators.append("Moving Averages")
            
            if not indicators:  # Garantir que pelo menos um indicador seja selecionado
                indicators.append(random.choice(["RSI", "MACD", "Bollinger Bands", "Moving Averages"]))
            
            signals.append({
                "timestamp": int(date.timestamp() * 1000),
                "date": date.strftime("%Y-%m-%d"),
                "type": signal_type,
                "indicators": indicators,
                "confidence": round(random.uniform(60, 95), 1)
            })
    
    return signals

# Rota para obter lista de criptomoedas
@api_bp.route('/cryptocurrencies', methods=['GET'])
def get_cryptocurrencies():
    return jsonify({
        "status": "success",
        "data": [
            {"symbol": symbol, "name": data["name"]}
            for symbol, data in CRYPTO_DATA.items()
        ]
    })

# Rota para obter dados de preço de uma criptomoeda
@api_bp.route('/price/<symbol>', methods=['GET'])
def get_price_data(symbol):
    symbol = symbol.upper()
    if symbol not in CRYPTO_DATA:
        return jsonify({"status": "error", "message": "Cryptocurrency not found"}), 404
    
    days = request.args.get('days', default=30, type=int)
    data = generate_price_data(symbol, days)
    
    return jsonify({
        "status": "success",
        "symbol": symbol,
        "name": CRYPTO_DATA[symbol]["name"],
        "data": data
    })

# Rota para obter sinais de trading
@api_bp.route('/signals/<symbol>', methods=['GET'])
def get_trading_signals(symbol):
    symbol = symbol.upper()
    if symbol not in CRYPTO_DATA:
        return jsonify({"status": "error", "message": "Cryptocurrency not found"}), 404
    
    signals = generate_trading_signals(symbol)
    
    return jsonify({
        "status": "success",
        "symbol": symbol,
        "name": CRYPTO_DATA[symbol]["name"],
        "signals": signals
    })

# Rota para obter análise técnica
@api_bp.route('/analysis/<symbol>', methods=['GET'])
def get_technical_analysis(symbol):
    symbol = symbol.upper()
    if symbol not in CRYPTO_DATA:
        return jsonify({"status": "error", "message": "Cryptocurrency not found"}), 404
    
    # Gerar dados de análise técnica simulados
    random.seed(int(time.time()) + hash(symbol))
    
    analysis = {
        "symbol": symbol,
        "name": CRYPTO_DATA[symbol]["name"],
        "timestamp": int(time.time() * 1000),
        "indicators": {
            "rsi": round(random.uniform(30, 70), 2),
            "macd": {
                "value": round(random.uniform(-2, 2), 2),
                "signal": round(random.uniform(-2, 2), 2),
                "histogram": round(random.uniform(-1, 1), 2)
            },
            "bollinger_bands": {
                "upper": round(random.uniform(105, 110), 2),
                "middle": 100,
                "lower": round(random.uniform(90, 95), 2)
            },
            "moving_averages": {
                "sma_20": round(random.uniform(95, 105), 2),
                "sma_50": round(random.uniform(95, 105), 2),
                "sma_200": round(random.uniform(95, 105), 2),
                "ema_12": round(random.uniform(95, 105), 2),
                "ema_26": round(random.uniform(95, 105), 2)
            }
        },
        "trend": random.choice(["bullish", "bearish", "neutral", "strong_bullish", "strong_bearish"]),
        "recommendation": random.choice(["buy", "sell", "hold", "strong_buy", "strong_sell"])
    }
    
    return jsonify({
        "status": "success",
        "data": analysis
    })

# Rota para obter dados de mercado em tempo real (simulados)
@api_bp.route('/market/realtime', methods=['GET'])
def get_realtime_market():
    # Selecionar 10 criptomoedas aleatórias para dados em tempo real
    selected_symbols = random.sample(list(CRYPTO_DATA.keys()), 10)
    
    market_data = []
    for symbol in selected_symbols:
        random.seed(int(time.time() * 1000) + hash(symbol))
        
        base_prices = {
            "BTC": 50000, "ETH": 3000, "BNB": 400, "XRP": 0.5, "ADA": 1.2,
            "SOL": 100, "DOT": 20, "DOGE": 0.1, "AVAX": 80, "MATIC": 1.5,
            "LINK": 15, "UNI": 10, "ATOM": 25, "LTC": 150, "ALGO": 1,
            "XLM": 0.3, "FIL": 40, "VET": 0.1, "AAVE": 200, "EOS": 5,
            "AXS": 60, "XTZ": 4, "THETA": 6, "EGLD": 150, "FTM": 2,
            "HBAR": 0.2, "NEO": 40, "CAKE": 8, "KSM": 200, "RUNE": 8
        }
        
        base_price = base_prices.get(symbol, 100)
        current_price = base_price * (1 + random.uniform(-0.05, 0.05))
        change_24h = random.uniform(-5, 5)
        
        market_data.append({
            "symbol": symbol,
            "name": CRYPTO_DATA[symbol]["name"],
            "price": round(current_price, 2),
            "change_24h": round(change_24h, 2),
            "volume_24h": round(current_price * random.uniform(10000, 100000), 2),
            "market_cap": round(current_price * random.uniform(1000000, 10000000), 2),
            "last_updated": int(time.time() * 1000)
        })
    
    return jsonify({
        "status": "success",
        "timestamp": int(time.time() * 1000),
        "data": market_data
    })

# Rota para obter status do bot (simulado)
@api_bp.route('/bot/status', methods=['GET'])
def get_bot_status():
    return jsonify({
        "status": "success",
        "data": {
            "running": True,
            "uptime": "3d 12h 45m",
            "active_symbols": ["BTC", "ETH", "BNB", "XRP", "ADA"],
            "trades_today": random.randint(5, 20),
            "profit_today": round(random.uniform(-5, 15), 2),
            "total_profit": round(random.uniform(50, 500), 2),
            "last_signal": {
                "symbol": "BTC",
                "type": "buy",
                "timestamp": int(time.time() * 1000) - 3600000  # 1 hora atrás
            }
        }
    })

# Rota para obter histórico de operações (simulado)
@api_bp.route('/bot/trades', methods=['GET'])
def get_trade_history():
    trades = []
    now = datetime.now()
    
    # Gerar histórico de operações simuladas para os últimos 30 dias
    for i in range(30, 0, -1):
        date = now - timedelta(days=i)
        random.seed(int(date.timestamp()))
        
        # Gerar entre 0 e 3 operações por dia
        for _ in range(random.randint(0, 3)):
            symbol = random.choice(list(CRYPTO_DATA.keys()))
            trade_type = random.choice(["buy", "sell"])
            
            # Preço base para o símbolo
            base_prices = {
                "BTC": 50000, "ETH": 3000, "BNB": 400, "XRP": 0.5, "ADA": 1.2,
                "SOL": 100, "DOT": 20, "DOGE": 0.1, "AVAX": 80, "MATIC": 1.5
            }
            base_price = base_prices.get(symbol, 100)
            
            # Calcular preço e quantidade
            price = base_price * (1 + random.uniform(-0.05, 0.05))
            quantity = random.uniform(0.1, 1) if base_price > 1000 else random.uniform(1, 10)
            
            # Calcular lucro/perda para operações de venda
            profit_loss = None
            if trade_type == "sell":
                profit_loss = round(random.uniform(-10, 20), 2)
            
            # Adicionar operação ao histórico
            trade_time = date.replace(
                hour=random.randint(0, 23),
                minute=random.randint(0, 59),
                second=random.randint(0, 59)
            )
            
            trades.append({
                "id": f"trade_{date.strftime('%Y%m%d')}_{len(trades)}",
                "symbol": symbol,
                "type": trade_type,
                "price": round(price, 2),
                "quantity": round(quantity, 4),
                "total": round(price * quantity, 2),
                "timestamp": int(trade_time.timestamp() * 1000),
                "date": trade_time.strftime("%Y-%m-%d %H:%M:%S"),
                "status": "completed",
                "profit_loss": profit_loss
            })
    
    # Ordenar operações por timestamp (mais recentes primeiro)
    trades.sort(key=lambda x: x["timestamp"], reverse=True)
    
    return jsonify({
        "status": "success",
        "data": trades
    })

# CryptoTrader Bot - Aplicação Web

![CryptoTrader Bot Logo](docs/images/logo.png)

## 🇵🇹 Português

### Descrição

CryptoTrader Bot é uma aplicação web para análise de mercado de criptomoedas e trading automático. A aplicação oferece uma interface intuitiva e responsiva para monitorar o mercado de criptomoedas, receber sinais de trading, visualizar análises técnicas e acompanhar o histórico de operações.

### Funcionalidades Principais

- **Dashboard** com visão geral do desempenho do bot e mercado
- **Análise de Mercado** com gráficos e indicadores técnicos em tempo real
- **Sinais de Trading** baseados em análise técnica
- **Histórico de Operações** com filtros e estatísticas
- **Configurações Personalizáveis** para adaptar às suas preferências de trading
- **Suporte a Múltiplos Idiomas** (Português e Inglês)
- **Design Responsivo** para desktop e dispositivos móveis

### Tecnologias Utilizadas

- **Backend**: Python, Flask, SQLAlchemy
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Gráficos**: Chart.js
- **API**: RESTful API
- **Internacionalização**: Suporte nativo para português e inglês

### Requisitos

- Python 3.8+
- Pip
- Navegador web moderno

### Instalação e Execução Local

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/crypto-trader-bot.git
   cd crypto-trader-bot
   ```

2. Crie e ative um ambiente virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts\activate
   ```

3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

4. Execute a aplicação:
   ```bash
   python -m src.main
   ```

5. Acesse a aplicação no navegador:
   ```
   http://localhost:5000
   ```

### Deploy no Render

1. Crie uma conta no [Render](https://render.com/) caso ainda não tenha.

2. No dashboard do Render, clique em "New" e selecione "Web Service".

3. Conecte ao seu repositório GitHub onde o projeto está hospedado.

4. Configure o serviço:
   - **Nome**: crypto-trader-bot (ou nome de sua preferência)
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn src.main:app`
   - **Plano**: Free (para testes) ou outro plano conforme necessidade

5. Clique em "Create Web Service" e aguarde o deploy.

### Criação de APK com AppGyser

1. Crie uma conta no [AppGyser](https://www.appgyver.com/) caso ainda não tenha.

2. No dashboard do AppGyser, crie um novo projeto.

3. Selecione "Web App" como tipo de projeto.

4. Configure a URL da sua aplicação web (URL do Render).

5. Personalize o ícone, splash screen e outras configurações.

6. Gere o APK através das opções de build do AppGyser.

7. Baixe o APK e instale em seu dispositivo Android.

### Estrutura do Projeto

```
crypto_trading_bot/
├── src/                   # Código-fonte principal
│   ├── models/            # Modelos de dados
│   ├── routes/            # Rotas da API
│   ├── static/            # Arquivos estáticos (CSS, JS, imagens)
│   │   ├── css/           # Folhas de estilo
│   │   ├── js/            # Scripts JavaScript
│   │   └── img/           # Imagens
│   ├── main.py            # Ponto de entrada da aplicação
│   └── __init__.py        # Inicializador do pacote
├── venv/                  # Ambiente virtual (não incluído no repositório)
├── requirements.txt       # Dependências do projeto
└── README.md              # Documentação
```

### Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

---

## 🇬🇧 English

### Description

CryptoTrader Bot is a web application for cryptocurrency market analysis and automated trading. The application offers an intuitive and responsive interface to monitor the cryptocurrency market, receive trading signals, view technical analysis, and track trading history.

### Main Features

- **Dashboard** with bot performance and market overview
- **Market Analysis** with real-time charts and technical indicators
- **Trading Signals** based on technical analysis
- **Trading History** with filters and statistics
- **Customizable Settings** to adapt to your trading preferences
- **Multiple Language Support** (Portuguese and English)
- **Responsive Design** for desktop and mobile devices

### Technologies Used

- **Backend**: Python, Flask, SQLAlchemy
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Charts**: Chart.js
- **API**: RESTful API
- **Internationalization**: Native support for Portuguese and English

### Requirements

- Python 3.8+
- Pip
- Modern web browser

### Installation and Local Execution

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/crypto-trader-bot.git
   cd crypto-trader-bot
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the application:
   ```bash
   python -m src.main
   ```

5. Access the application in your browser:
   ```
   http://localhost:5000
   ```

### Deploying on Render

1. Create a [Render](https://render.com/) account if you don't have one.

2. In the Render dashboard, click "New" and select "Web Service".

3. Connect to your GitHub repository where the project is hosted.

4. Configure the service:
   - **Name**: crypto-trader-bot (or name of your choice)
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn src.main:app`
   - **Plan**: Free (for testing) or another plan as needed

5. Click "Create Web Service" and wait for the deployment.

### Creating APK with AppGyser

1. Create an [AppGyser](https://www.appgyver.com/) account if you don't have one.

2. In the AppGyser dashboard, create a new project.

3. Select "Web App" as the project type.

4. Configure your web application URL (Render URL).

5. Customize the icon, splash screen, and other settings.

6. Generate the APK through AppGyser's build options.

7. Download the APK and install it on your Android device.

### Project Structure

```
crypto_trading_bot/
├── src/                   # Main source code
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   ├── static/            # Static files (CSS, JS, images)
│   │   ├── css/           # Stylesheets
│   │   ├── js/            # JavaScript scripts
│   │   └── img/           # Images
│   ├── main.py            # Application entry point
│   └── __init__.py        # Package initializer
├── venv/                  # Virtual environment (not included in repository)
├── requirements.txt       # Project dependencies
└── README.md              # Documentation
```

### Contributions

Contributions are welcome! Feel free to open issues or submit pull requests.

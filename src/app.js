require('dotenv-extended').load();
const RequestConfigData = require('./boundary/ct_config_client');
const mainFlow = require('./boundary/flow');

// To run main flow
(async () => {
    
    // Init object to request ct-config data
    let config = new RequestConfigData(process.env.CRYPTO_TOOL_CONFIG_URL);

    try {

        // Get Market related data
        let markets = await config.getMarkets();
        // Get Rule related data
        let rules = await config.getRules();
        // Get Symbol related data
        let symbols = await config.getSymbols();
        // Start main flow
        mainFlow(symbols, rules, markets);

    } catch (error) {
        console.log(error);
    }

})();
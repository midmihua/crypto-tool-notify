require('dotenv-extended').load();
const RequestConfigData = require('./boundary/ct_config_client');
const mainFlow = require('./boundary/flow');

// To run main flow
(async () => {
    // Init object to request ct-config data
    let config = new RequestConfigData(process.env.CRYPTO_TOOL_CONFIG_URL);
    try {
        // Get Market related data
        let targetPriceRuleRecords = await config.getTargetPriceRuleRecords();
        // Start main flow
        mainFlow(targetPriceRuleRecords);
    } catch (error) {
        console.log(error);
    }
})();
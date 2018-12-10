require('dotenv-extended').load();
const CronJob = require('cron').CronJob;
const RequestConfigData = require('./boundary/ct_config_client');
const { targetPriceRuleFlow } = require('./boundary/flow');
const RequestBinanceData = require('./markets/binance');

const binance = new RequestBinanceData();

// To run main flow
const main = (async () => {
    // Init object to request ct-config data
    let config = new RequestConfigData(process.env.CRYPTO_TOOL_CONFIG_URL);
    try {
        // RULE-1: targetPriceRule flow
        // Get list of configured rules
        let targetPriceRuleList = await config.getTargetPriceRuleRecords();
        // Start process if rules list is not empty
        if (targetPriceRuleList.length > 0) {
            // Get actual prices from binance for all pairs
            let currentPrices = await binance.price();
            // Start the targetPriceRule flow
            targetPriceRuleFlow(targetPriceRuleList, currentPrices);
        }
    } catch (error) {
        console.log(error);
    }
});

// Setup and start cron job
const job = new CronJob(`*/${process.env.CRON_EXEC_INTERVAL} * * * * *`, function () {
    console.log('Job is working [debug msg]');
    main();
});
job.start();

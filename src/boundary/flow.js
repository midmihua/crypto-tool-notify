const set = require('lodash.set');
const targetPrice = require('../rules/target_price');
const sendMsg = require('../boundary/telega');
const RequestConfigData = require('./ct_config_client');

const config = new RequestConfigData(process.env.CRYPTO_TOOL_CONFIG_URL);

const targetPriceRuleFlow = (targetPriceRuleList, currentPrices) => {
    try {
        targetPriceRuleList.forEach(rule => {
            // Execute the process only if status === A
            if (rule.status === 'A') {
                // Get current price value
                let currPrice = getValueByKey(currentPrices, rule.params.symbol.replace('_', ''));
                if (currPrice !== undefined) {
                    // Execute the rule logic and get necessary data to notify the user
                    let ruleResults = targetPrice(rule, currPrice);
                    // Send message if ruleResults.status === true and retry > 0
                    if (ruleResults.status === true && rule.params.retry > 0) {
                        sendMsg(ruleResults, rule.sendTo);
                        // Decrease retry value
                        const putData = { ...rule.params };
                        set(putData, 'retry', putData.retry - 1);
                        // Put data to update the rule params
                        config.updateTargetPriceRuleRecords(rule._id, { "params": putData });
                    } else if (ruleResults.status === false && rule.params.retry <= 0) {
                        // Increase retry value
                        const putData = { ...rule.params };
                        set(putData, 'retry', putData.retry + 1);
                        // Put data to update the rule params
                        config.updateTargetPriceRuleRecords(rule._id, { "params": putData });
                    }
                } else {
                    throw new Error(`Price data for ${rule.params.symbol} was not found`);
                }
            }
        });
    } catch (error) {
        throw new Error('Error occured while execution mainFlow: ', error);
    }
};

function getValueByKey(jsonArray, key) {
    for (let i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i].symbol === key)
            return jsonArray[i].price;
    }
    return undefined;
}

module.exports = {
    'targetPriceRuleFlow': targetPriceRuleFlow
}
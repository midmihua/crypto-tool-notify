const set = require('lodash.set');
const targetPrice = require('../rules/target_price');
const sendMsg = require('../boundary/telega');
const RequestConfigData = require('./ct_config_client');

const config = new RequestConfigData(process.env.CRYPTO_TOOL_CONFIG_URL);

const targetPriceRuleFlow = (targetPriceRuleList, currentPrices) => {
    try {
        targetPriceRuleList.forEach(rule => {
            // Verify if a rule record is available for data processing
            // True if {status: A} and {retry: > 0}
            if (rule.status === 'A' && rule.params.retry > 0) {
                let currPrice = getValueByKey(currentPrices, rule.params.symbol);
                if (currPrice !== undefined) {
                    // Execute the rule logic and get necessary data to notify the user
                    let ruleResults = targetPrice(rule, currPrice);
                    // Send message if ruleResults.status === true
                    if (ruleResults.status === true) {
                        sendMsg(ruleResults);
                        // Decrease retry value
                        const putData = { ...rule.params };
                        set(putData, 'retry', putData.retry - 1);
                        // Put data to update the rule params
                        // console.log({ "params": putData });
                        config.updateTargetPriceRuleRecords(rule._id, { "params": putData });
                    }
                }
                else {
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
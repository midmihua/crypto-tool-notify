const targetPrice = require('./target_price');

module.exports = ruleRouter = async (symbol, ruleName, marketName) => {
    let ruleExec = undefined;
    try {
        // If a rule is not specified for a some reason
        if (ruleName === undefined || marketName === undefined)
            throw new Error(`Rule and/or Market is not specified for the ${symbol.symbol}`);

        // Rule: target_price
        if (ruleName === 'target_price') {
            ruleExec = await targetPrice(symbol, marketName);
        }
        // Rule: pump_dump
        else if (ruleName === 'pump_dump') {
            console.log('pump_dump: TBD');
        }
        return ruleExec;
    } catch (error) {
        throw new Error('Error occured while execution ruleRouter logic: ', error);
    }
}
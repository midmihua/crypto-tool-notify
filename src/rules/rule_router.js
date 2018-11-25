const targetPrice = require('./target_price');

module.exports = ruleRouter = async (rule) => {
    let ruleExec = undefined;
    try {
        // If a rule is not specified for a some reason
        if (rule.name === undefined || rule.params.market === undefined)
            throw new Error(`Rule and/or Market are not specified for the record: ${rule}`);

        // Rule 1: target_price
        if (rule.name === 'target_price') {
            ruleExec = await targetPrice(rule);
        }
        // Rule 2: pump_dump - TBD
        else if (rule.name === 'pump_dump') {
            console.log('pump_dump: TBD');
        }
        return ruleExec;
    } catch (error) {
        throw new Error('Error occured while execution ruleRouter logic: ', error);
    }
}
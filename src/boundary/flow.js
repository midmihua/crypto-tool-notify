const ruleRouter = require('../rules/rule_router');
const sendMsg = require('../boundary/telega');

module.exports = mainFlow = (listOfRules) => {
    try {
        listOfRules.forEach(rule => {
            // Verify if a rule record is available for data processing
            // True if {status: A} and {retry: > 0}
            if (rule.status === 'A' && rule.params.retry > 0) {
                ruleRouter(rule).then((data) => {
                    // Execute rule logic and return object needed for notification
                    console.log(data);
                    // Decrease retry parameter (send updated data to ct-config micro-service)
                    // TBD !!!
                    // Send message
                    sendMsg(data);
                }).catch((err) => {
                    console.log(err);
                });
            }
        });
    } catch (error) {
        throw new Error('Error occured while execution mainFlow: ', error);
    }
};
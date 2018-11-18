const ruleRouter = require('../rules/rule_router');

module.exports = mainFlow = (symbols, rules, markets) => {

    try {
        symbols.forEach(symbol => {

            // Verify if symbol is available for data processing
            // True if {status: active} and {retry: > 0}
            if (symbol.status === 'active' && symbol.retry > 0) {

                // Verify if Rule and Market are available for data processing too
                const m = checkObjectStatus(markets, symbol.market);
                const r = checkObjectStatus(rules, symbol.rule);
                if (m.status && r.status) {

                    ruleRouter(symbol, r.name, m.name).then((data) => {
                        // Execute rule logic and return object data needed for notification
                        console.log(data);
                        // Decrease retry parameter (send updated data to ct-config micro-service)
                    }).catch((err) => {
                        console.log(err);
                    });
                }
                else {
                    throw new Error('Market status and Rule status have to have "active" status');
                }
            }
        });
    } catch (error) {
        throw new Error('Error occured while execution mainFlow: ', error);
    }
};

function checkObjectStatus(objects, id) {
    let result = {
        'name': undefined,
        'status': new Boolean(false)
    };
    try {
        objects.forEach(obj => {
            if (obj._id === id) {
                result.name = obj.name
                result.status = obj.status === 'active' ? true : false;
                return;
            }
        });
        return result;
    } catch (error) {
        throw new Error('Error occured while verifying Object status: ', error);
    }
}
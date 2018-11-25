const RequestBinanceData = require('../markets/binance');

const binance = new RequestBinanceData();

module.exports = targetPrice = async (rule) => {
    let result = {
        status: new Boolean(false),
        target: undefined,
        current: undefined
    };
    try {
        if (rule.params.market.toLowerCase() === 'binance') {

            result.current = await binance.price(rule.params.symbol);
            result.target = rule.params.targetPrice;

            if (rule.params.direction === '>=')
                result.status = result.current.price >= result.target ? true : false;
            else if (rule.params.direction === '<=')
                result.status = result.current.price <= result.target ? true : false;
        }
        else {
            throw new Error(`Non-implemented market is used: ${market}`);
        }
        return result;
    } catch (error) {
        throw new Error('Error occured while execution targetPrice rule: ', error);
    }
};
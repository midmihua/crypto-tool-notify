const RequestBinanceData = require('../markets/binance');

const binance = new RequestBinanceData();

module.exports = targetPrice = async (symbol, market) => {
    let result = {
        status: new Boolean(false),
        target: undefined,
        current: undefined
    };
    try {
        // console.log('symbol: ', symbol.symbol);
        // console.log('market: ', market);
        // console.log('params: ', symbol.params);
        if (market === 'binance') {
            let params = paramsToJsonObject(symbol.params);
            let current = await binance.price(symbol.symbol);

            result.current = current.price;
            result.target = params.target_price;

            if (params.direction === '>=' || params.direction === '>') {
                result.status = current.price >= params.target_price ? true : false;
            } else if (params.direction === '<=' || params.direction === '<') {
                result.status = current.price <= params.target_price ? true : false;
            }
        }
        else {
            throw new Error(`Non-implemented market is used: ${market}`);
        }
        return result;
    } catch (error) {
        throw new Error('Error occured while execution targetPrice rule: ', error);
    }
};

function paramsToJsonObject(params) {
    let jsonObject = {};
    params.forEach(element => {
        jsonObject[element.param] = element.value;
    });
    return jsonObject;
}
module.exports = targetPrice = (rule, currPrice) => {
    let result = {
        status: new Boolean(false),
        rule: 'target_price',
        symbol: undefined,
        target: undefined,
        direction: undefined,
        current: undefined
    };
    try {
        if (rule.params.market.toLowerCase() === 'binance') {
            result.symbol = rule.params.symbol;
            result.current = currPrice;
            result.direction = rule.params.direction;
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
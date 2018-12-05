module.exports = targetPrice = (rule, currPrice) => {
    let result = {
        status: false,
        rule: 'TARGET_PRICE',
        symbol: undefined,
        target: undefined,
        current: undefined,
        position: undefined,
        direction: undefined,
        profit: undefined
    };
    try {
        if (rule.params.market.toLowerCase() === 'binance') {
            result.symbol = rule.params.symbol;
            result.current = currPrice;
            result.direction = rule.params.direction;
            result.target = rule.params.targetPrice;
            // Calculate main status
            if (rule.params.direction === '>=')
                result.status = result.current >= result.target ? true : false;
            else if (rule.params.direction === '<=')
                result.status = result.current <= result.target ? true : false;
            // If status true, calculate profit
            if (result.status) {
                if (rule.params.positionPrice > 0) {
                    result.position = rule.params.positionPrice;
                    result.profit = Number.parseFloat((result.current / result.position) * 100 - 100).toFixed(2);
                }
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
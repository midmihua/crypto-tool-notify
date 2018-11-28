const request = require('request-promise-native');

class RequestBinanceData {

    constructor() {
        this.url = 'https://api.binance.com';
    }

    async time() {
        try {
            const response = await request(`${this.url}/api/v1/time`);
            console.log(new Date().toString()); // debug
            return JSON.parse(response);
        } catch (error) {
            throw new Error('Impossible to request Binance time');
        }
    }

    async ping() {
        try {
            const response = await request(`${this.url}/api/v1/ping`);
            console.log(new Date().toString()); // debug
            return JSON.parse(response);
        } catch (error) {
            throw new Error('Impossible to ping Binance');
        }
    }

    async avgPrice(symbol) {
        try {
            if (symbol === undefined)
                throw new Error('Symbol is not provided');
            const response = await request(`${this.url}/api/v3/avgPrice?symbol=${symbol}`);
            console.log(new Date().toString()); // debug
            return JSON.parse(response);
        } catch (error) {
            throw new Error('Impossible to get avgPrice data');
        }
    }

    async price(symbol) {
        try {
            const url = (symbol !== undefined) ?
                `${this.url}/api/v3/ticker/price?symbol=${symbol}` : `${this.url}/api/v3/ticker/price`;
            const response = await request(url);
            console.log(new Date().toString()); // debug
            return JSON.parse(response);
        } catch (error) {
            throw new Error('Impossible to get price data');
        }
    }

    // {
    //     "symbol": "BNBBTC",
    //     "priceChange": "-94.99999800",
    //     "priceChangePercent": "-95.960",
    //     "weightedAvgPrice": "0.29628482",
    //     "prevClosePrice": "0.10002000",
    //     "lastPrice": "4.00000200",
    //     "lastQty": "200.00000000",
    //     "bidPrice": "4.00000000",
    //     "askPrice": "4.00000200",
    //     "openPrice": "99.00000000",
    //     "highPrice": "100.00000000",
    //     "lowPrice": "0.10000000",
    //     "volume": "8913.30000000",
    //     "quoteVolume": "15.30000000",
    //     "openTime": 1499783499040,
    //     "closeTime": 1499869899040,
    //     "firstId": 28385,   // First tradeId
    //     "lastId": 28460,    // Last tradeId
    //     "count": 76         // Trade count
    //   }
    async statistics24hr(symbol) {
        try {
            const url = (symbol !== undefined) ?
                `${this.url}/api/v1/ticker/24hr?symbol=${symbol}` : `${this.url}/api/v1/ticker/24hr`;
            const response = await request(url);
            console.log(new Date().toString()); // debug
            return JSON.parse(response);
        } catch (error) {
            throw new Error('Impossible to get statistics24hr');
        }
    }

    // [
    //     [
    //       1499040000000,      // Open time
    //       "0.01634790",       // Open
    //       "0.80000000",       // High
    //       "0.01575800",       // Low
    //       "0.01577100",       // Close
    //       "148976.11427815",  // Volume
    //       1499644799999,      // Close time
    //       "2434.19055334",    // Quote asset volume
    //       308,                // Number of trades
    //       "1756.87402397",    // Taker buy base asset volume
    //       "28.46694368",      // Taker buy quote asset volume
    //       "17928899.62484339" // Ignore.
    //     ]
    //   ]
    async candlestick(symbol, interval, startTime) {
        try {
            if (symbol === undefined || interval === undefined)
                throw new Error('symbol and interval have to be provided to get candlestick data');
            const url = (startTime !== undefined) ?
                `${this.url}/api/v1/klines?symbol=${symbol}&interval=${interval}&startTime=${startTime}` :
                `${this.url}/api/v1/klines?symbol=${symbol}&interval=${interval}`;
            const response = await request(url);
            console.log(new Date().toString()); // debug
            return JSON.parse(response);
        } catch (error) {
            throw new Error('Impossible to get candlestick data');
        }
    }
}

module.exports = RequestBinanceData;
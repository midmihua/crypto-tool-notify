const request = require('request-promise-native');

class RequestConfigData {

    constructor(url) {
        this.url = url;
    }

    async getMarkets(name) {
        try {
            const url =
                (name !== undefined) ? `${this.url}/api/market/get?name=${name}` : `${this.url}/api/market/get`;
            const response = await request(url);
            return JSON.parse(response);
        } catch (error) {
            throw new Error('Impossible to request Market related data');
        }
    }

    async getRules(name) {
        try {
            const url =
                (name !== undefined) ? `${this.url}/api/rule/get?name=${name}` : `${this.url}/api/rule/get`;
            const response = await request(url);
            return JSON.parse(response);
        } catch (error) {
            throw new Error('Impossible to request Rule related data');
        }
    }

    async getSymbols(symbol) {
        try {
            const url =
                (symbol !== undefined) ?
                    `${this.url}/api/symbol/get?name=${symbol}` : `${this.url}/api/symbol/get`;
            const response = await request(url);
            return JSON.parse(response);
        } catch (error) {
            throw new Error('Impossible to request Rule related data');
        }
    }

};

module.exports = RequestConfigData;
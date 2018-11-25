const request = require('request-promise-native');

class RequestConfigData {

    constructor(url) {
        this.url = url;
    }

    async getTargetPriceRuleRecords(user) {
        try {
            const url =
                (user !== undefined) ? `${this.url}/api/targetprice/get?user=${user}` :
                    `${this.url}/api/targetprice/get`;
            const response = await request(url);
            return JSON.parse(response);
        } catch (error) {
            throw new Error('Impossible to request Market related data');
        }
    }

};

module.exports = RequestConfigData;
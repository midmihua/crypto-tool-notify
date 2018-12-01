const request = require('request-promise-native');

class RequestConfigData {

    constructor(url) {
        this.url = url;
        this.auth = process.env.BASIC_AUTH
    }

    async getTargetPriceRuleRecords(user) {
        try {
            const url =
                (user !== undefined) ? `${this.url}/api/targetprice/get?user=${user}` :
                    `${this.url}/api/targetprice/get`;
            const response = await request({
                uri: url,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.auth
                }
            });
            return JSON.parse(response);
        } catch (error) {
            throw new Error('Impossible to request --getTargetPriceRuleRecords-- related data');
        }
    }

    async updateTargetPriceRuleRecords(id, putData) {
        try {
            const url = `${this.url}/api/targetprice/put/${id}`;
            const response = await request({
                uri: url,
                body: JSON.stringify(putData),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.auth
                }
            });
            return JSON.parse(response);
        } catch (error) {
            throw new Error('Impossible to update --getTargetPriceRuleRecords-- related data');
        }
    }

};

module.exports = RequestConfigData;
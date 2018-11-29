const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TOKEN);

const sendMsg = (income) => {
    msg = `Rule: ${income.rule}\nPair: ${income.symbol}\n${income.current} ${income.direction} ${income.target}\nhttps://www.binance.com/en/trade/pro/${income.symbol}`
    bot.sendMessage(process.env.CHAT_ID, msg);
};

module.exports = sendMsg;
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TOKEN);

const sendMsg = (income) => {
    msg = `Rule: ${income.rule}\nPair: ${income.symbol}\ntarget ${income.target} ${income.direction} current ${income.current}`
    bot.sendMessage(process.env.CHAT_ID, msg);
};

module.exports = sendMsg;
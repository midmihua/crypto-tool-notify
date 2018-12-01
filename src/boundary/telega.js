const TelegramBot = require('node-telegram-bot-api');

// Debug purpose
// const token = process.env.TOKEN;
// const chat = process.env.CHAT_ID;

const sendMsg = (income, sendTo) => {
    const token = sendTo.token;
    const chat = sendTo.chatId;
    try {
        if (token.length > 0 && chat.length > 0) {
            msg = `RULE: ${income.rule}\nPAIR: ${income.symbol}\nActual: ${income.current} ${income.direction} Expected: ${income.target}\nhttps://www.binance.com/en/trade/pro/${income.symbol}`
            new TelegramBot(token).sendMessage(chat, msg);
        }
    } catch (error) {
        throw new Error('Telegram send message error: ', error);
    }
};

module.exports = sendMsg;
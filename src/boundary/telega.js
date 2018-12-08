const TelegramBot = require('node-telegram-bot-api');

// Debug purpose
// const token = process.env.TOKEN;
// const chat = process.env.CHAT_ID;

const sendMsg = (income, sendTo) => {
    const token = sendTo.token;
    const chat = sendTo.chatId;
    try {
        if (token.length > 0 && chat.length > 0) {
            let base = income.symbol.split('_')[1] ? income.symbol.split('_')[1] : '';
            if (income.position !== undefined && income.profit !== undefined)
                if (income.description !== undefined && income.description.length > 0)
                    msg = `Rule: ${income.rule}\nPair: ${income.symbol}\nPosition Price: ${income.position} ${base}\nActual Price: ${income.current} ${base} ${income.direction} Expected Price: ${income.target} ${base}\nCurrent Profit: ${income.profit}%\nDescription: ${income.description}`;
                else
                    msg = `Rule: ${income.rule}\nPair: ${income.symbol}\nPosition Price: ${income.position} ${base}\nActual Price: ${income.current} ${base} ${income.direction} Expected Price: ${income.target} ${base}\nCurrent Profit: ${income.profit}%`;
            else
                if (income.description !== undefined && income.description.length > 0)
                    msg = `Rule: ${income.rule}\nPair: ${income.symbol}\nActual Price: ${income.current} ${base} ${income.direction} Expected Price: ${income.target} ${base}\nDescription: ${income.description}`;
                else
                    msg = `Rule: ${income.rule}\nPair: ${income.symbol}\nActual Price: ${income.current} ${base} ${income.direction} Expected Price: ${income.target} ${base}`;
            new TelegramBot(token).sendMessage(chat, msg);
        }
    } catch (error) {
        throw new Error('Telegram send message error: ', error);
    }
};

module.exports = sendMsg;
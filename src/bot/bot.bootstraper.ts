import TelegramBot from 'node-telegram-bot-api';

import botHandler from './bot.handler';

const bootstrap = (bot: TelegramBot) => {
  bot.on('polling_error', (error) => {
    console.error(error);
  });

  bot.onText(/\/ping/, (msg: TelegramBot.Message) => {
    botHandler.pingHandler(bot, msg);
  });
};

export default { bootstrap };

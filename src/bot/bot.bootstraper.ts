import TelegramBot from 'node-telegram-bot-api';

import botHandler from './bot.handler';

const bootstrap = (bot: TelegramBot): void => {
  bot.on('polling_error', (error) => {
    console.error(error);
  });

  bot.onText(/\/ping/, (msg: TelegramBot.Message) => {
    botHandler.pingHandler(bot, msg);
  });

  bot.on('photo', (msg: TelegramBot.Message) => {
    botHandler.imageHandler(bot, msg);
  });
};

export default { bootstrap };

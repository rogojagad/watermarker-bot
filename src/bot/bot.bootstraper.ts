import TelegramBot from 'node-telegram-bot-api';

import botHandler from './bot.handler';

const bootstrap = (bot: TelegramBot): void => {
  bot.on('polling_error', (error) => {
    console.error(error);
  });

  bot.onText(/\/ping/, (msg: TelegramBot.Message) => {
    botHandler.pingHandler(bot, msg);
  });

  bot.onText(/\/howto/, (msg: TelegramBot.Message) => {
    botHandler.howToHandler(bot, msg);
  });

  bot.on('photo', (msg: TelegramBot.Message) => {
    botHandler.imageHandler(bot, msg);
  });

  bot.onText(/\/start/, (msg: TelegramBot.Message) => {
    botHandler.startHandler(bot, msg);
  });

  bot.on('callback_query', (callbackQuery: TelegramBot.CallbackQuery) => {
    botHandler.callbackQueryHandler(bot, callbackQuery);
  });
};

export default { bootstrap };

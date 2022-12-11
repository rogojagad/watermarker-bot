import TelegramBot from 'node-telegram-bot-api';

import botService from './bot.service';

const bootstrap = (bot: TelegramBot): void => {
  bot.on('polling_error', (error) => {
    console.error(error);
  });

  bot.onText(/\/ping/, (msg: TelegramBot.Message) => {
    botService.handlePing(bot, msg);
  });

  bot.onText(/\/howto/, (msg: TelegramBot.Message) => {
    botService.handleHowToQuery(bot, msg);
  });

  bot.on('photo', (msg: TelegramBot.Message) => {
    botService.handleImageMessage(bot, msg);
  });

  bot.onText(/\/start/, (msg: TelegramBot.Message) => {
    botService.handleStartQuery(bot, msg);
  });

  bot.on('callback_query', (callbackQuery: TelegramBot.CallbackQuery) => {
    botService.handleCallbackQuery(bot, callbackQuery);
  });
};

export default { bootstrap };

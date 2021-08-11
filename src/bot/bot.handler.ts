import TelegramBot from 'node-telegram-bot-api';

const pingHandler = (bot: TelegramBot, message: TelegramBot.Message): void => {
  bot.sendMessage(message.chat.id, 'PONG!');
};

export default { pingHandler };

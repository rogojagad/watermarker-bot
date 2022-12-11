import TelegramBot from 'node-telegram-bot-api';

import imageService from '../image/image.service';

import { BotCommandEnum } from './bot.enum';
import { ICallbackQueryHandler } from './bot.interface';
import { aboutMessage, howToMessage, startMessage } from './bot.lang';

const handlePing = (bot: TelegramBot, message: TelegramBot.Message): void => {
  bot.sendMessage(message.chat.id, 'PONG!');
};

const handleImageMessage = async (
  bot: TelegramBot, message: TelegramBot.Message
): Promise<void> => {
  const messageId = message.message_id;
  const chatId = message.chat.id;

  const sentMessage = await bot.sendMessage(chatId, 'Enter your watermark text', {
    reply_markup: {
      force_reply: true
    },
    reply_to_message_id: messageId
  });

  const replyMessage: TelegramBot.Message = await new Promise((resolve) => {
    bot.onReplyToMessage(
      chatId,
      sentMessage.message_id,
      resolve
    );
  });

  bot.sendMessage(chatId, 'Processing your image');

  const watermarkText = replyMessage.text || '';

  const photoMessagePayload = message.photo;
  const sentPhotoData = photoMessagePayload?.pop();
  const fileId = sentPhotoData?.file_id || '';

  const imageResultBuffer = await imageService.getAndProcessImage(fileId, watermarkText);

  await bot.sendMessage(chatId, 'This is your bookmarked image');
  await bot.sendPhoto(chatId, imageResultBuffer);
};

const handleHowToQuery = (bot: TelegramBot, message: TelegramBot.Message): void => {
  bot.sendMessage(message.chat.id, howToMessage);
};

const handleStartQuery = (bot: TelegramBot, message: TelegramBot.Message): void => {
  bot.sendMessage(
    message.chat.id,
    startMessage.replace('{name}', message.chat.first_name || ''),
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'How to Use This Bot', callback_data: BotCommandEnum.HOW_TO }],
          [{ text: 'About This Bot', callback_data: BotCommandEnum.ABOUT }]
        ]
      }
    }
  );
};

const handleAboutQuery = (bot: TelegramBot, message: TelegramBot.Message): void => {
  bot.sendMessage(message.chat.id, aboutMessage);
};

const queryDataToHandlerMap = new Map<string, ICallbackQueryHandler>([
  [BotCommandEnum.HOW_TO, handleHowToQuery],
  [BotCommandEnum.ABOUT, handleAboutQuery]
]);

const handleCallbackQuery = (bot: TelegramBot, query: TelegramBot.CallbackQuery): void => {
  const queryData = query.data || '';
  const message = query.message as TelegramBot.Message;
  const chatId = message.chat.id;
  const queryHandler = queryDataToHandlerMap.get(queryData);

  if (queryHandler) {
    queryHandler(bot, message);
    return;
  }

  console.error('Callback query data unmapped');
  bot.sendMessage(chatId, 'Something wrong on our side, please try another option');
};

export default {
  handleCallbackQuery,
  handleHowToQuery,
  handleImageMessage,
  handlePing,
  handleStartQuery
};

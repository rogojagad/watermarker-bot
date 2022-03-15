import TelegramBot from 'node-telegram-bot-api';

import httpService from '../http/http.service';
import imageService from '../image/image.service';

import { getPhotoApi, getPhotoStatusApi } from './bot.constant';
import { BotCommandEnum } from './bot.enum';
import { ICallbackQueryHandler } from './bot.interface';
import { aboutMessage, howToMessage, startMessage } from './bot.lang';

const pingHandler = (bot: TelegramBot, message: TelegramBot.Message): void => {
  bot.sendMessage(message.chat.id, 'PONG!');
};

const imageHandler = async (bot: TelegramBot, message: TelegramBot.Message): Promise<void> => {
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

  const photoStatusResponse = await httpService.getPhotoStatus(getPhotoStatusApi.replace('{fileId}', fileId));
  const photoPath = photoStatusResponse.result.file_path;
  const photoSourceUrl = getPhotoApi.replace('{filePath}', photoPath);

  const imageBuffer = await httpService.getPhoto(photoSourceUrl);
  const imageResultBuffer = await imageService.processImage(imageBuffer, watermarkText);

  await bot.sendPhoto(chatId, imageResultBuffer);
  await bot.sendMessage(chatId, 'This is your bookmarked image');
};

const howToHandler = (bot: TelegramBot, message: TelegramBot.Message): void => {
  bot.sendMessage(message.chat.id, howToMessage);
};

const startHandler = (bot: TelegramBot, message: TelegramBot.Message): void => {
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

const aboutHandler = (bot: TelegramBot, message: TelegramBot.Message): void => {
  bot.sendMessage(message.chat.id, aboutMessage);
};

const queryDataToHandlerMap = new Map<string, ICallbackQueryHandler>([
  [BotCommandEnum.HOW_TO, howToHandler],
  [BotCommandEnum.ABOUT, aboutHandler]
]);

const callbackQueryHandler = (bot: TelegramBot, query: TelegramBot.CallbackQuery): void => {
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
  callbackQueryHandler,
  howToHandler,
  imageHandler,
  pingHandler,
  startHandler
};

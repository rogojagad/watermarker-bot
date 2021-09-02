import TelegramBot from 'node-telegram-bot-api';

import httpService from '../http/http.service';
import imageService from '../image/image.service';

import { getPhotoApi, getPhotoStatusApi } from './bot.constant';

const pingHandler = (bot: TelegramBot, message: TelegramBot.Message): void => {
  bot.sendMessage(message.chat.id, 'PONG!');
};

const imageHandler = async (bot: TelegramBot, message: TelegramBot.Message): Promise<void> => {
  const messageId = message.message_id;
  const chatId = message.chat.id;

  const sentMessage = await bot.sendMessage(chatId, 'Enter your watermark text', {
    reply_markup: {
      force_reply: true,
    },
    reply_to_message_id: messageId,
  });

  const replyMessage: TelegramBot.Message = await new Promise((resolve) => {
    bot.onReplyToMessage(
      chatId,
      sentMessage.message_id,
      resolve,
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

export default { pingHandler, imageHandler };

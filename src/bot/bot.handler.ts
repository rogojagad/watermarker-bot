import TelegramBot from 'node-telegram-bot-api';

import httpService from '../http/http.service';
import imageService from '../image/image.service';

import { getPhotoApi, getPhotoStatusApi } from './bot.constant';

const pingHandler = (bot: TelegramBot, message: TelegramBot.Message): void => {
  bot.sendMessage(message.chat.id, 'PONG!');
};

const imageHandler = async (bot: TelegramBot, message: TelegramBot.Message): Promise<void> => {
  const photoMessagePayload = message.photo;
  const sentPhotoData = photoMessagePayload?.pop();
  const fileId = sentPhotoData?.file_id || '';

  const photoStatusResponse = await httpService.getPhotoStatus(getPhotoStatusApi.replace('{fileId}', fileId));
  console.info(photoStatusResponse);
  const photoPath = photoStatusResponse.result.file_path;
  const photoSourceUrl = getPhotoApi.replace('{filePath}', photoPath);

  const imageBuffer = await httpService.getPhoto(photoSourceUrl);
  imageService.processImage(imageBuffer);
};

export default { pingHandler, imageHandler };

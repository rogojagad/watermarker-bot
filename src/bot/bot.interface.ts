import TelegramBot from 'node-telegram-bot-api';

interface PhotoStatusResult {
  file_id: string,
  file_unique_id: string,
  file_size: number,
  file_path: string
}

export interface IPhotoStatusResponse {
  ok: boolean,
  result: PhotoStatusResult
}

export interface ICallbackQueryHandler {
  (bot: TelegramBot, message: TelegramBot.Message): void
}

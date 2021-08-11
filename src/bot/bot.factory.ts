import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_TOKEN || '';

const createOneBotByEnv = (env: string): TelegramBot => {
  if (env === 'production') {
    console.log('Starting bot on webhook mode');
    return new TelegramBot(token);
  }

  console.log('Starting bot on polling mode');
  return new TelegramBot(token, { polling: true });
};

export default { createOneBotByEnv };

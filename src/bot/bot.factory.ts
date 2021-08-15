import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';

import { token } from '../common/common.constant';

const createOneBotByEnv = (env: string): TelegramBot => {
  if (env === 'production') {
    console.info('Starting bot on webhook mode');
    return new TelegramBot(token);
  }

  console.info('Starting bot on polling mode');
  return new TelegramBot(token, { polling: true });
};

export default { createOneBotByEnv };

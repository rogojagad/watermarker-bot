import 'dotenv/config';
import { urlencoded, json } from 'body-parser';
import express from 'express';

import botBootstraper from './bot/bot.bootstraper';
import botFactory from './bot/bot.factory';
import {
  env, port, token, url
} from './common/common.constant';

process.env.NTBA_FIX_319 = '1';

console.info(`Environment: ${env}`);

const botClient = botFactory.createOneBotByEnv(env);
botBootstraper.bootstrap(botClient);

const setupApp = (app: express.Express) => {
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.disable('etag');

  app.get('/', (_, res: express.Response) => res.status(200).json({ data: 'pong!' }));
  app.post(`/bot${token}`, (req: express.Request, res: express.Response) => {
    botClient.processUpdate(req.body);
    res.sendStatus(200);
  });

  app.listen(port, () => {
    console.info(`serving on port ${port}`);
  });
};

const app = express();
setupApp(app);

if (env === 'production') {
  console.info(`Setting up webhook on ${url}/bot${token}`);
  botClient.setWebHook(`${url}/bot${token}`);
}

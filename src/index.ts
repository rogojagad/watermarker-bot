import 'dotenv/config';
import { urlencoded, json } from 'body-parser';
import express from 'express';

const app = express();
const port = process.env.PORT || 5000;
const token = process.env.TELEGRAM_TOKEN || '';

app.use(urlencoded({ extended: true }));
app.use(json());
app.disable('etag');

app.get('/', (_, res: express.Response) => res.status(200).json({ data: 'pong!' }));
app.post(`/bot${token}`, (req: express.Request, res: express.Response) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`serving on port ${port}`);
});

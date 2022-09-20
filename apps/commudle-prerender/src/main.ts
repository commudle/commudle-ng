import * as express from 'express';
import { join } from 'path';
import * as prerender from 'prerender-node';

const app = express();

const port = process.env.PORT || 8080;
const distFolder = join(process.cwd(), '../commudle-admin');
const PRERENDER_URL = process.env.PRERENDER_URL || 'https://prerender.commudle.com';

app.use(prerender.set('prerenderServiceUrl', PRERENDER_URL));

app.get(
  '*.*',
  express.static(distFolder, {
    maxAge: '1y',
  }),
);

app.get('/health-check', (req, res) => {
  res.status(200).send({ health: 'good' });
});

app.get('*', (req, res) => {
  res.sendFile(join(distFolder, 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

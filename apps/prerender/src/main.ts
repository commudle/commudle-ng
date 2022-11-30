import * as express from 'express';
import * as path from 'path';
import * as prerender from 'prerender-node';

const app = express();

const port = process.env.PORT || '8080';
const prerenderUrl = process.env.PRERENDER_URL || 'https://prerender.commudle.com';
const distFolder = path.join(process.cwd(), 'commudle-admin');

app.use(prerender.set('prerenderServiceUrl', prerenderUrl));

// health check
app.get('/health-check', (req, res) => {
  res.status(200).send({ health: 'good' });
});

app.get('*.*', express.static(distFolder, { maxAge: '1y' }));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: distFolder });
});

const server = app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
server.on('error', console.error);

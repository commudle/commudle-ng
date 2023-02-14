import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as expressStaticGzip from 'express-static-gzip';
import * as path from 'path';
import * as prerender from 'prerender-node';

const app = express();

const port = process.env.PORT || '8080';
const prerenderUrl = process.env.PRERENDER_URL || 'https://prerender.commudle.com';
const distFolder = path.join(process.cwd(), 'commudle-admin');

app.use(cookieParser());
app.use(prerender.set('prerenderServiceUrl', prerenderUrl).set('forwardHeaders', true));

app.get('*', (req, res, next) => {
  if (req.headers['x-prerender'] === '1') {
    res.cookie('x-prerender', '1');
  }
  next();
});
app.get('*.*', expressStaticGzip(distFolder, { enableBrotli: true, serveStatic: { maxAge: '1y' } }));

// health check
app.get('/health-check', (req, res) => res.status(200).send({ health: 'good' }));

app.get('*', (req, res) => res.sendFile('index.html', { root: distFolder }));

const server = app.listen(port, () => console.log(`Listening at port ${port}`));
server.on('error', console.error);

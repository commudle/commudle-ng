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
const blacklistedUserAgents = ['AhrefsBot', 'AhrefsSiteAudit'];
prerender.crawlerUserAgents = prerender.crawlerUserAgents.filter((ua) => !blacklistedUserAgents.includes(ua));
app.use(prerender.set('prerenderServiceUrl', prerenderUrl).set('forwardHeaders', true));

app.get('*.*', expressStaticGzip(distFolder, { enableBrotli: true, serveStatic: { maxAge: '1y' } }));

app.get('/health-check', (req, res) => res.status(200).send({ health: 'good' }));

app.get('*', (req, res) => {
  if (req.headers['x-prerender'] === '1') {
    res.sendFile('index.html', { root: distFolder, headers: { 'Set-Cookie': 'x-prerender=1; Path=/' } });
  } else {
    res.sendFile('index.html', { root: distFolder });
  }
});

const server = app.listen(port, () => console.log(`Listening at port ${port}`));
server.on('error', console.error);

const express = require('express');
const app = express();
const prerender = require('prerender-node');
const { join } = require('path');

const port = process.env.PORT || 5000;
const distFolder = join(process.cwd(), 'dist/commudle-admin/browser');
const PRERENDER_URL = process.env.PRERENDER_URL || 'http://localhost:8080';

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

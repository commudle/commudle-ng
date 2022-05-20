import 'zone.js/dist/zone-node';

const domino = require('domino');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const template = fs
  .readFileSync(path.join(path.join(process.cwd(), 'dist/commudle-admin/browser'), 'index.html'))
  .toString();
const win = domino.createWindow(template);
class MediaStream {}
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xhr2');
global['window'] = win;
global['document'] = win.document;
global['localStorage'] = win.localStorage;
// @ts-ignore
global['MediaStream'] = MediaStream;
global['DOMTokenList'] = win.DOMTokenList;
global['Node'] = win.Node;
global['Text'] = win.Text;
global['HTMLElement'] = win.HTMLElement;
global['navigator'] = win.navigator;
global['MutationObserver'] = getMockMutationObserver();
global['XMLHttpRequest'] = win.XMLHttpRequest;

function getMockMutationObserver() {
  return class {
    observe(node, options) {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };
}

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/commudle-admin/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // cors configuration for 301 redirects
  server.use(cors());

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    }),
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    }),
  );

  server.get('/health-check', (req, res) => {
    res.status(200).send({ health: 'good' });
  });

  server.get('/admin/**', (req, res) => {
    res.sendFile(join(distFolder, 'index.html'));
  });

  // for homepage (/ route)
  server.get('/', (req, res) => {
    res.sendFile(join(distFolder, 'index.html'));
  });

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';

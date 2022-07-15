/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
import express from 'express';
import path from 'path';
import './dotenv';
import { createServer } from 'http';
import { setupMiddlewares } from './middlewares';
import { router } from './routes';

const app = express();
app.use(
  '/public',
  express.static(path.resolve(__dirname, '..', '..', '..', 'public')),
);

setupMiddlewares(app);
app.use(router);

const httpServer = createServer(app);

export { httpServer as app };

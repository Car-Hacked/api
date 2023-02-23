import Express from 'express';
import * as path from 'path';
import bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Server } from 'socket.io';

import oas from './oas.js';

import l from './logger.js';

const app = new Express();
const exit = process.exit;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.use(cors());
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(Express.static(`${root}/public`));
    mongoose.set('strictQuery', true);
  }

  router(routes) {
    this.routes = routes;
    return this;
  }

  listen(port = process.env.PORT || 3000) {
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.aa8vdbr.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
    const welcome = p => () =>
      l.info(
        `up and running in ${process.env.NODE_ENV ||
          'development'} @: ${os.hostname()} on port: ${p}}`
      );

    oas(app, this.routes)
      .then(() => {
        const server = http.createServer(app).listen(port, welcome(port));
        const io = new Server(server);
        global.io = io;
        io.on('connection', (socket) => {
          socket.emit('welcome', {
            welcome: "server connected"
          });
          l.info(`user connected to socket: ${socket.id}`);
        });
      })
      .catch(e => {
        l.error(e);
        exit(1);
      });

    return app;
  }
}

import express from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';
import dotEnv from 'dotenv';
import config from './config.json';
import { Openapi, CORS, Health } from './tools/index';
import { Controllers } from './controllers/index';

dotEnv.config();

const app = express();

const service = {
  init(app, config) {
    const port: number = parseInt(process.env.PORT || '8080');
    config.openapi ? app.use('/openapi', Openapi.ui, Openapi.setup()) : null;
    config.allowCors ? app.use(CORS.bind(this, app)) : null;
    config.healtCheck ? app.use('/health', Health) : null;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    Controllers.forEach(controller => {
      app.use(config.basePath, controller);
    });

    app.set('port', port);
    const server: http.Server = http.createServer(app);
    server.listen(port);

    server.on('error', service.listen);
    server.on('listening', service.error);
    return app;
  },
  listen (evt) {
    return evt;
  },
  error (evt) {
    return evt;
  }
}
service.init(app, config);

export default service;
import {resolve, normalize, join} from 'path';
import morgan from 'morgan';
import compression from 'compression';
import {json} from 'body-parser';
import cookieParser from 'cookie-parser';
import errorHandler from 'api-error-handler';
import express from 'express';
import routes from './routes';

export default app => {
    const env = process.env.NODE_ENV;
    const client = normalize(join(__dirname, '../../..', 'client'));

    app.use(compression());
    app.use(express.static(client));
    app.use(json());
    app.use(cookieParser());

    if (env !== 'production') {
        app.use(morgan('dev'));
    }

    routes(app);

    app.route('/*')
        .get((req, res) => res.sendFile(resolve(client, 'index.html')));

    app.use(errorHandler());
};

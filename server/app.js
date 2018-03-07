import 'dotenv/config';
import mongoose from 'mongoose';
import mongooseConfig from './config/mongoose';
import express from 'express';
import expressConfig from './config/express';
import logger from './components/logger';
import socketio from 'socket.io';
import configSocketIo from './config/socketio'

const app = express();

expressConfig(app);

mongooseConfig(mongoose)
    .then(() => {
        const server = app.listen(process.env.PORT, () => {
            logger.info('Express listening on port %s', process.env.PORT);

            const io = socketio(server);
            configSocketIo(io);
        });
    });

mongoose.connect(process.env.MONGO_URI);

export default app;

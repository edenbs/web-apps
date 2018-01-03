import 'dotenv/config';
import mongoose from 'mongoose';
import mongooseConfig from './config/mongoose';
import express from 'express';
import expressConfig from './config/express';
import logger from './components/logger';

const app = express();

expressConfig(app);

mongooseConfig(mongoose)
    .then(() => {
        app.listen(process.env.PORT, () => {
            logger.info('Express listening on port %s', process.env.PORT);
        });
    });

mongoose.connect(process.env.MONGO_URI);

export default app;

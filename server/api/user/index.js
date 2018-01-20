import {AsyncRouter} from 'express-async-router';
import * as controller from './user.controller';
import {isAuthenticated} from '../../auth/auth.service.js';

const router = new AsyncRouter();

router.get('/me', isAuthenticated(), controller.me);

export default router;
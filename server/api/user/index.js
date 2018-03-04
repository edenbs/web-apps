import {AsyncRouter} from 'express-async-router';
import * as controller from './user.controller';
import {isAuthenticated, hasRole} from '../../auth/auth.service.js';

const router = new AsyncRouter();

router.get('/me', isAuthenticated(), controller.me);
router.get('/my-subjects', hasRole('editor'), controller.getMySubjects);

export default router;
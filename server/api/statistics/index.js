import {AsyncRouter} from 'express-async-router';
import * as controller from './statistics.controller';
import {isAuthenticated} from '../../auth/auth.service';

const router = new AsyncRouter();

router.get('/avgGradeInClass', isAuthenticated(), controller.avgGradeInClass);
router.get('/numInClass', isAuthenticated(), controller.numInClass);

export default router;
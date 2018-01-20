import {AsyncRouter} from 'express-async-router';
import * as controller from './teacher.controller';
import {hasRole} from '../../auth/auth.service';

const router = new AsyncRouter();

router.get('/', hasRole('manager'), controller.index);
router.post('/', hasRole('manager'), controller.create);
router.put('/:id', hasRole('manager'), controller.update);
router.delete('/:id', hasRole('manager'), controller.remove);

export default router;
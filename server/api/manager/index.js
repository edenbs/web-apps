import {AsyncRouter} from 'express-async-router';
import * as controller from './manager.controller';
import {hasRole} from '../../auth/auth.service';

const router = new AsyncRouter();

router.get('/', hasRole('admin'), controller.index);
router.post('/', hasRole('admin'), controller.create);
router.put('/:id', hasRole('admin'), controller.update);
router.delete('/:id', hasRole('admin'), controller.remove);

export default router;
import {AsyncRouter} from 'express-async-router';
import * as controller from './school.controller';

const router = new AsyncRouter();

router.get('/', controller.index);
router.post('/', controller.create);
router.delete('/:id', controller.remove);

export default router;
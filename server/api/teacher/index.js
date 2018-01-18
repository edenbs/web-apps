import {AsyncRouter} from 'express-async-router';
import * as controller from './teacher.controller';

const router = new AsyncRouter();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:id', controller.find);
router.put('/:id', controller.update);
router.delete(':/id', controller.remove);

export default router;
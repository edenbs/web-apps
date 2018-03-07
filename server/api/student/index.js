import {AsyncRouter} from 'express-async-router';
import * as controller from './student.controller';
import {hasRole} from '../../auth/auth.service';
import paginate from 'express-paginate';

const router = new AsyncRouter();

router.get('/', hasRole(['manager', 'editor', 'viewer']), paginate.middleware(10,15), controller.index);
router.post('/', hasRole('editor'), controller.create);
router.put('/:id', hasRole('editor'), controller.update);
router.delete('/:id', hasRole('editor'), controller.remove);

router.get('/:id/grades', hasRole(['manager', 'editor', 'viewer']), controller.grades);
router.post('/:id/grades', hasRole('editor'), controller.addGrade);
router.put('/:id/grades/:grade', hasRole('editor'), controller.updateGrade);
router.delete('/:id/grades/:grade', hasRole('editor'), controller.removeGrade);

export default router;

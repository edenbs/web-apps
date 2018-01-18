import createError from 'http-errors';

import schoolRoute from '../../api/school';
import userRoute from '../../api/user';
import managerRoute from '../../api/manager';
import teacherRoute from '../../api/teacher';

export default app => {
    app.use('/api/schools', schoolRoute);
    app.use('/api/users', userRoute);
    app.use('/api/managers', managerRoute);
    app.use('/api/teachers', teacherRoute);

    // All undefined api routes should return a 404
    app.all('/:url(api|auth)/*', (req, res, next) => {
        next(createError(404));
    });
};
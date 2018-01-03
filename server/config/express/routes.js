import createError from 'http-errors';

export default app => {

    // TODO: Check!
    // All undefined api routes should return a 404
    app.all('/:url(api|auth)/*', (req, res, next) => {
        next(createError(404));
    });
};
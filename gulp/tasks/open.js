import open from 'open';

export default gulp => {
    gulp.task('open', () => {
        open(`http://localhost:${process.env.PORT}`);
    });
};
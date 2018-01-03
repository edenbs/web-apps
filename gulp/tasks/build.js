import runSequence from 'run-sequence';

export default gulp => {
    gulp.task('build', cb => {
        runSequence(
            'clean',
            'babel',
            cb
        );
    });

    gulp.task('build:dist', cb => {
        runSequence(
            'clean',
            'babel',
            cb
        );
    });
};
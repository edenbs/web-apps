import runSequence from 'run-sequence';

export default gulp => {
    gulp.task('serve', cb => {
        runSequence(
            'inject:css',
            'inject:js',
            'wiredep',
            'livereload',
            'nodemon',
            'open',
            'watch',
            cb);
    });
};
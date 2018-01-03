import runSequence from 'run-sequence';

export default gulp => {
    gulp.task('serve', cb => {
        runSequence(
            'clean:tmp',
            'less',
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
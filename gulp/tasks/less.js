import less from 'gulp-less';

export default gulp => {
    gulp.task('less', ['inject:less'], () => {
        return gulp.src('client/app/app.less')
            .pipe(less({
                paths: [
                    'client/bower_components',
                    'client/app',
                    'client/components'
                ]
            }))
            .pipe(gulp.dest('client/.tmp'));
    });
};
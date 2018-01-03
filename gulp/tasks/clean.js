import del from 'del';

export default gulp => {
    gulp.task('clean', ['clean:tmp', 'clean:dist']);

    gulp.task('clean:tmp', () => {
        return del('.tmp');
    });

    gulp.task('clean:dist', () => {
        return del('dist');
    });
};

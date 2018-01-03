import {stream as wiredep} from 'wiredep';

export default gulp => {
    gulp.task('wiredep', () => {
        gulp.src('client/index.html')
            .pipe(wiredep())
            .pipe(gulp.dest('client'));
    });
};
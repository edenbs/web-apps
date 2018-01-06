import inject from 'gulp-inject';
import config from '../config';

export default gulp => {
    gulp.task('inject:css', () => {
        return gulp.src('client/index.html')
            .pipe(inject(gulp.src(config.paths.client.css, {read: false}), {
                transform: filePath => {
                    filePath = filePath.replace('/client/', '');
                    filePath = filePath.replace('/.tmp/', '');
                    return `<link rel="stylesheet" href="${filePath}">`;
                },
                starttag: '<!-- injector:css -->',
                endtag: '<!-- endinjector -->'
            }))
            .pipe(gulp.dest('client'));
    });

    gulp.task('inject:js', () => {
        return gulp.src('client/index.html')
            .pipe(inject(gulp.src(config.paths.client.js, {read: false}), {
                transform: filePath => {
                    filePath = filePath.replace('/client/', '');
                    return `<script src="${filePath}"></script>`;
                },
                starttag: '<!-- injector:js -->',
                endtag: '<!-- endinjector -->'
            }))
            .pipe(gulp.dest('client'));
    });
};
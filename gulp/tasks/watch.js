import livereload from 'gulp-livereload';
import config from '../config';

export default gulp => {
    gulp.task('livereload', () => {
        livereload.listen();
    });

    gulp.task('watch', () => {
        gulp.watch(config.paths.client.css, ['inject:css']);
        gulp.watch(config.paths.client.js.concat(['client/app/app.js']), ['inject:js']);

        gulp.watch(
                config.paths.client.css
                .concat(config.paths.client.html)
                .concat(config.paths.client.js)
                .concat(['client/app/app.js']),
                event => {
                livereload.changed(event.path);
            });
    });
};
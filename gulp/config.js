export default {
    paths: {
        client: {
            js: [
                'client/{app,components}/**/*.js',
                '!client/app/app.js'
            ],
            css: [
                'client/{app,components}/**/*.css'
            ],
            html: [
                'client/{app,components}/**/*.html'
            ]
        },
        server: ['server/**/*.js'],
        gulp: ['./gulpfile.js', './gulp/**/*.js']
    }
};
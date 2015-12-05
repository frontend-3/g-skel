module.exports = function(gulp) {
    var plugins;

    plugins = {
      coffee  : require('gulp-coffee'),
      notify  : require('gulp-notify'),
      requirejs : require('requirejs'),
      runSequence: require('run-sequence'),
    };

    gulp.task('coffee', function() {
        return gulp.src([
            '**/*.coffee',
            ], {
                cwd : 'static/scripts'
            })
            .pipe(plugins.coffee({
                bare: true
            })
            .on("error",plugins.notify.onError(function (error) {
                return "Message to the notifier: " + error.message;
            })))
            .pipe(gulp.dest('build/static/scripts'))
            .pipe(plugins.notify(gulp.config.notifyConfig('Coffee compiled')));
    });

    gulp.task('copy:js', function () {
        return gulp.src(['static/scripts/**/*.js'])
                .pipe(gulp.dest('build/static/scripts'));
    });


    gulp.task('requirejs', function() {
        plugins.requirejs.optimize({
            appDir:'build/static/scripts',
            mainConfigFile: "static/scripts/libs/require-config.js",
            baseUrl: '.',
            dir: gulp.config.deploy_routes().scripts,
            preserveLicenseComments: false,
            modules: [
                { name: 'site.home' },
                { name: 'site.login' },
                { name: 'site.terms' },
                { name: 'site.user.register' },
                { name: 'site.user.forgot-password' },
                { name: 'site.user.reset-password' }
            ]
        })
    });

    gulp.task('scripts', function () {
        plugins.runSequence('coffee', 'copy:js', 'requirejs')
    })

}

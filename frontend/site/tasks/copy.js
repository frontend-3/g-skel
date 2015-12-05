module.exports = function(gulp) {
    var plugins,
        argv;

    argv = require('yargs').argv;

    plugins = {
      notify  : require('gulp-notify'),
      runSequence: require('run-sequence'),
    };

    gulp.task('copy:images', function() {
        return gulp.src([
            'static/images/**/*',
            ])
            .pipe(gulp.dest(gulp.config.deploy_routes().images))
            .pipe(plugins.notify(gulp.config.notifyConfig('Copy images')));
    });

    gulp.task('copy:fonts', function() {
            return gulp.src([
                'static/fonts/**/*',
                ])
                .pipe(gulp.dest(gulp.config.deploy_routes().fonts))
                .pipe(plugins.notify(gulp.config.notifyConfig('Copy fonts')));
    });

    gulp.task('copy:videos', function() {
            return gulp.src([
                'static/videos/**/*',
                ])
                .pipe(gulp.dest(gulp.config.deploy_routes().videos))
                .pipe(plugins.notify(gulp.config.notifyConfig('Copy videos')));
    });

    gulp.task('copy:sprites', function() {
            return gulp.src([
                'static/sprites/**/*',
                ])
                .pipe(gulp.dest(gulp.config.deploy_routes().sprites))
                .pipe(plugins.notify(gulp.config.notifyConfig('Copy sprites')));
    });

    gulp.task('copy', function () {
        plugins.runSequence('copy:sprites', 'copy:videos', 'copy:fonts', 'copy:images')
    })
}

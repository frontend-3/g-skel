module.exports = function(gulp) {
    var plugins;

    plugins = {
      coffee  : require('gulp-coffee'),
      notify  : require('gulp-notify')
    };

    gulp.task('scripts', function() {

        return gulp.src([
            '**.coffee',
            ], {
                cwd : 'static/scripts'
            })
            .pipe(plugins.coffee({
                bare: true
            })
            .on("error",plugins.notify.onError(function (error) {
                return "Message to the notifier: " + error.message;
            })))
            .pipe(gulp.dest(gulp.config.deploy_routes().scripts))
            .pipe(plugins.notify('Compiled coffee'));
    });

}

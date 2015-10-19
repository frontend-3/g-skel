module.exports = function(gulp) {
    var plugins;

    plugins = {
      stylus  : require('gulp-stylus'),
      notify  : require('gulp-notify'),
      nib     : require('nib')
    };

    gulp.task('styles', function() {

        return gulp.src([
            '**.styl',
            ], {
                cwd : 'static/styles'
            })
            .pipe(plugins.stylus({
                use     : plugins.nib(),
                compress: true
            })
            .on("error",plugins.notify.onError(function (error) {
                return "Message to the notifier: " + error.message;
            })))
            .pipe(gulp.dest(gulp.config.deploy_routes().styles))
            .pipe(plugins.notify('Compiled styles'));
    });

}

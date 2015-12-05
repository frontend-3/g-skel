module.exports = function(gulp) {
    var plugins;

    plugins = {
      stylus  : require('gulp-stylus'),
      cssmin  : require('gulp-cssmin'),
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
                return "Error Stylus " + error.message;
            })))
            .pipe(plugins.cssmin()
            .on("error",plugins.notify.onError(function (error) {
                return "Error Stylus " + error.message;
            })))
            .pipe(gulp.dest(gulp.config.deploy_routes().styles))
            .pipe(plugins.notify(gulp.config.notifyConfig('Stylus compiled')));
    });

}

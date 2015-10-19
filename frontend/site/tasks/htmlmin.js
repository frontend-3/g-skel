module.exports = function(gulp) {
    var plugins,
        src;

    src = gulp.config.deploy_routes().templates;
    plugins = {
      htmlmin : require('gulp-htmlmin'),
      notify  : require('gulp-notify')
    };

    console.log(src)

    gulp.task('htmlmin', function() {

        return gulp.src([
            '**/*'+ gulp.config.settings.template_ext,
            ], {
                cwd : src
            })
            .pipe(plugins.htmlmin({
                removeComments    : true,
                collapseWhitespace: true,
                minifyJS          : true
            })
            .on("error",plugins.notify.onError(function (error) {
                return "Message to the notifier: " + error.message;
            })))
            .pipe(gulp.dest(src))
            .pipe(plugins.notify('Minified htmlCompiled styles'));
    });

}

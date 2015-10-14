module.exports = function(gulp) {
    var plugins,
        argv;

    argv = require('yargs').argv;

    plugins = {
      jade    : require('gulp-jade'),
      rename  : require('gulp-rename'),
      notify  : require('gulp-notify')
    };

    gulp.task('templates', function() {

        pretty = argv.format ? true : false;

        return gulp.src([
            '*.jade',
            '**/*.jade',
            '!_layout.jade',
            '!**/_layout.jade',
            '!includes/**/*.jade',
            '!mixins/**/*.jade',
            '!_*.jade'
            ], {
                cwd : 'templates/sections'
            })
            .pipe(plugins.jade({
                pretty: pretty,
                data: {
                    config: gulp.config
                }
            })
            .on("error",plugins.notify.onError(function (error) {
                return "Message to the notifier: " + error.message;
            })))
            .pipe(plugins.rename(function (path){
                path.extname = gulp.config.settings.template_ext
            }))
            .pipe(gulp.dest(gulp.config.deploy_routes().templates))
            .pipe(plugins.notify('Compiled templates'));
    });

}

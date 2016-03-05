module.exports = function(gulp) {
  var plugins,
      argv;

  argv = require('yargs').argv;

  plugins = {
    jade    : require('gulp-jade'),
    htmlmin : require('gulp-htmlmin'),
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
        return "Error Jade " + error.message;
      })))
      .pipe(plugins.rename(function (path){
        path.extname = gulp.config.settings.template_ext
      }))
      .on("error",plugins.notify.onError(function (error) {
        return "Error change extension: " + error.message;
      }))
      .pipe(plugins.htmlmin({
        removeComments    : true,
        collapseWhitespace: true,
        minifyJS          : true
      })
      .on("error",plugins.notify.onError(function (error) {
        return "Erro htmlmin: " + error.message;
      })))
      .pipe(gulp.dest(gulp.config.deploy_routes().templates))
      .pipe(plugins.notify(gulp.config.notifyConfig('Jade compiled')));
  });
}

module.exports = function(gulp) {
  var plugins,
      argv;

  plugins = {
    svg     : require('gulp-svgmin'),
    notify  : require('gulp-notify'),
  };

  gulp.task('svg', function() {
    return gulp.src([
      '**/*.svg',
        ], {
        cwd : 'static/svg'
      })
      .pipe(plugins.svg({
      })
      .on("error",plugins.notify.onError(function (error) {
        return "Error SVG optimized: " + error.message;
      })))
      .pipe(gulp.dest(gulp.config.deploy_routes().svg))
      .pipe(plugins.notify(gulp.config.notifyConfig('SVG optimized')));
  });
}

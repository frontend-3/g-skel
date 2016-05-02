module.exports = function(gulp) {
  var plugins,
      argv,
      fs;

  argv = require('yargs').argv;
  fs = require('fs');

  plugins = {
    notify  : require('gulp-notify'),
    replace : require('gulp-replace')
  };

  gulp.task('svg:inject', function() {

  pretty = argv.format ? true : false;

  return gulp.src([
      '**/*.html',
      ], {
          cwd : gulp.config.deploy_routes().templates
      })
      .pipe(plugins.replace(/svg/, function(s) {
        var svg_code = fs.readFileSync('static/svg/tiger.svg', 'utf8');
        return svg_code;
      }))
      .pipe(gulp.dest(gulp.config.deploy_routes().templates))
      .pipe(plugins.notify(gulp.config.notifyConfig('Svg injected')));
  });
}

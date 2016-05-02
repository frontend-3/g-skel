module.exports = function(gulp) {
  var plugins,
      argv,
      fs,
      regex;

  argv = require('yargs').argv;
  fs = require('fs');
  regex = /<img[^>]+src="([^">]*\.svg+)">/g;

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
      .pipe(plugins.replace(regex, function(s) {
        var match =  regex.exec(s);
        var filename = gulp.config.deploy_routes().base + match[1];
        var svg_code = fs.readFileSync(filename, 'utf8');
        return svg_code;
      }))
      .pipe(gulp.dest(gulp.config.deploy_routes().templates))
      .pipe(plugins.notify(gulp.config.notifyConfig('Svg injected')));
  });
}

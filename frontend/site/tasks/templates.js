function(gulp, config) {
  var options = config.options,
      files   = config.files,
      _files  = {},
      plugins = {
        jade : require('gulp-jade')
        rename : require('gulp-rename')
      };

  for (_files in files) {
    var task_name = "templates:" + _files,
        config_file = files[_files];

    gulp.task(task_name, function () {

        result = gulp.src(config_file.src, config_file.options)
            .pipe(plugins.jade(config_file.options))
            .pipe(plugins.rename(config_file.ext))
            .pipe(gulp.dest(config_file.dest))

        return result;
    });
  };
}

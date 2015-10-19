var settings,
    config,
    gulp,
    argv;

argv = require('yargs').argv;
gulp = require('gulp');
config = require('./config.js');

require('gulp-simple-load-tasks')(gulp)
config.setEnv('prod');
settings = require('./settings/prod');

if (argv.dev) {
  config.setEnv('dev');
  settings = require('./settings/dev');
}

config.settings = settings;
gulp.config = config;
gulp.loadTasks(__dirname + '/tasks');

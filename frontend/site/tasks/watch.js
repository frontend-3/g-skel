var grunt,
  path,
  ext,
  defaultTasksConfig;

path = require('path');
defaultTasksConfig = {
  watch: {
    compile: {
      files: ['templates/**.jade', 'templates/**/*.jade', 'static/**/**.styl'],
      options: {
        spawn: false,
        livereload: true, // Autorefresh en el navegador cuando detecta cambio
        interrupt: true
      }
    }
  }
};

/**
 * onWatch, se ejecuta con cada cambio de los archivos revisados por el
 * watcher
 * @param action string tipo de cambio
 * @param filepath string Ruta de archivo modificado
 */
function onWatch(action, filepath) {
  var ext = filepath.split('.');
  ext = ext[ext.length - 1];
  // Si la extensión del archivo es .jade  
  if (ext === 'jade') {
    cJade(grunt, filepath, defaultTasksConfig.jade, defaultTasksConfig.htmlmin);
  } else {
    // Si la extensión del archivo es .styl
    if (ext === 'styl') {
      cStylus(grunt, filepath, defaultTasksConfig.stylus, defaultTasksConfig.cssmin);
    }
  }
}

/**
 * Compilar Stylus, modifica los valores de la tarea stylus.js para compilar
 * solo los archivos que son modificados
 * @param grunt object instancia de grunt
 * @param filepath string Ruta de archivo modificado
 * @param defaultTasksConfig array Configuracion inicial de los archivos
 */
function cStylus(grunt, filepath, defaultTasksConfig, defaultTasksConfigMin) {
  var filepath,
    filepath_css;

  filepath = filepath.split('static' + path.sep + 'styles' + path.sep)[1];
  filepath_css = filepath.split('.')[0] + '.css';

  // Si el archivo modificado pertenece al core(modules, sections o libs) de estilos, se compilan todos
  // los archivos.
  if (
    filepath.indexOf('modules' + path.sep) === -1 &&
    filepath.indexOf('sections' + path.sep) === -1 &&
    filepath.indexOf('libs' + path.sep) === -1
  ) {
    grunt.config.set('stylus.compile.files.0.src', [filepath]);
    grunt.config.set('cssmin.minify.files.0.src', [filepath_css]);
  } else {
    grunt.config.set('stylus.compile.files.0.src', defaultTasksConfig);
    grunt.config.set('cssmin.minify.files.0.src', defaultTasksConfigMin);
  }
  grunt.task.run('styles');
}

/**
 * Compilar Jade, modifica los valores de la tarea jade.js para compilar
 * solo los archivos que son modificados
 * @param grunt object instancia de grunt
 * @param filepath string Ruta de archivo modificado
 * @param defaultTasksConfig array Configuracion inicial de los archivos
 */
function cJade(grunt, filepath, defaultTasksConfig, defaultTasksConfigMin) {
  // path.sep, para que funcione con back slash de windows
  var filepath;

  filepath = filepath.split('templates' + path.sep)[1];
  
  if (/_(.*).jade/.test(filepath) === false) {
    filepath = filepath.split('sections' + path.sep)[1];
    grunt.config.set('jade.compile.files.0.src', [filepath]);
    grunt.config.set('htmlmin.minify.files.0.src', [filepath.replace('.jade', grunt.config.get('config').settings.template_ext)]);

  } else {
    grunt.config.set('jade.compile.files.0.src', defaultTasksConfig);
    grunt.config.set('htmlmin.minify.files.0.src', defaultTasksConfigMin);
  }
  grunt.task.run('templates');
}

module.exports = function(g) {
  // asigno valor a variable glogal
  grunt = g;
  // Carga la dependencia
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Define variables con la configuración por defecto de todas las tareas a ejecutar
  defaultTasksConfig.jade = grunt.config.get('jade.compile.files.0.src').slice(0) || [];
  defaultTasksConfig.htmlmin = grunt.config.get('htmlmin.minify.files.0.src').slice(0) || [];
  defaultTasksConfig.stylus = grunt.config.get('stylus.compile.files.0.src').slice(0) || [];
  defaultTasksConfig.cssmin = grunt.config.get('cssmin.minify.files.0.src').slice(0) || [];
  // Configuro watch
  grunt.config.set('watch', defaultTasksConfig.watch);
  // Configuro metodo de evento
  grunt.event.on('watch', onWatch);

};
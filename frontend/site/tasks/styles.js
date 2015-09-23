module.exports = function(grunt) {
  // Carga el paquete de dependecia
  grunt.loadNpmTasks('grunt-contrib-stylus');

  // Configura la tarea enviando como primer parámetro el nombre de la tarea y 
  // como segundo la configuración interna de la subtarea:compile y glue.
  // Ojo: El nombre de la tarea debe ser el mismo que el de su documentación
   grunt.config.set('stylus', {
    compile: {
      options: {
        compress: true // Define si debe o no comprimir el css generado
      },
      files: [{
        expand: true, // Recorre todos los archivos de la carpeta definida
        cwd: 'static/styles', // Define la ruta de origen de los archivos
        src: [
          '**.styl' //  Define que tipo de archivos seran compilador (solo archivos .styl).
        ],
        dest: grunt.config.get('config').deploy_routes().styles,  // Define la ruta destino de los archivos
        ext:'.css'
      }]
    },
    glue: {
      options: {
        '-C': true // Definir compilación de los archivo a formato stylus
      },
      files: [{
        expand: true, // Recorre todos los archivos de la carpeta definida
        cwd: grunt.config.get('config').deploy_routes().sprites,  // Define la ruta de origen de los archivos
        src: [
          '*.css' //  Define que tipo de archivos seran compilador (solo archivos .css).
        ],
        dest: 'static/styles/modules', // Define la ruta destino de los archivos compilados
        ext: '.sprite.styl' // Define la extensión del archivo generado
      }]
    }
  });

  // Registra tarea styles que ejecuta en el enviroment dev(desarrollo)
  // la subtareas stylus:compile y notify:styles
  // y en el enviroment prod(producción ) ejecuta las subtareas
  // stylus:compile, cssmin:minify y notify:styles
  grunt.registerTask('styles', 'Compiling Templates', function() {
    if (grunt.option('dev')) {
      grunt.task.run(['stylus:compile', 'notify:styles']);
    } else {
      grunt.task.run(['stylus:compile', 'cssmin:minify', 'notify:styles']);
    }
  });
};
module.exports = function(grunt) {
  // Carga el paquete de dependecia
  grunt.loadNpmTasks('grunt-contrib-jade');

  // Configura la tarea enviando como primer parámetro el nombre de la tarea y 
  // como segundo la configuración interna de la subtarea:compile.
  // Ojo: El nombre de la tarea debe ser el mismo que el de su documentación
  grunt.config.set('jade', {
    compile: {
      options: {
        pretty: false, // Define si el html debe salir formateado o no
        data: { // Define variables internas disponibles en jade
          config : grunt.config.get('config')  // Asigna variable config con la configuración de grunt
        }
      },
      files: [
        {
          expand: true,  // Recorre todos los archivos de la carpeta definida
          cwd: 'templates/sections', // Define la ruta de origen de los archivos
          //  Define que tipo de archivos seran compilados(los ! son excepciones)
          src: [
            '*.jade',
            '**/*.jade',
            '!_layout.jade',
            '!**/_layout.jade',
            '!includes/**/*.jade',
            '!mixins/**/*.jade',
            '!_*.jade'
          ],
           // Define la ruta destino de los archivos
          dest: grunt.config.get('config').deploy_routes().templates,
          ext: grunt.config.get('config').settings.template_ext// Define la extensión del archivo generado
        }
      ]
    }
  });

  // Registra tarea templates que ejecuta en el enviroment dev(desarrollo)
  // la subtareas jade y notify:templates
  // y en el enviroment prod(producción ) ejecuta las subtareas
  // jade, htmlmin y notify:templates   
  grunt.registerTask('templates', 'Compiling Templates', function () {
    if (grunt.option('format')) {
      grunt.config.set('jade.compile.options.pretty', true);
    }

    if (grunt.option('dev')) {
      grunt.config.set('jade.compile.files.0.ext', '.html');
      grunt.task.run(['jade', 'notify:templates']); 
    } else {
      if (grunt.option('format')) {
        grunt.task.run(['jade', 'notify:templates']);     
      } else {
        grunt.task.run(['jade', 'htmlmin', 'notify:templates']);
      }
    }    
  });
};


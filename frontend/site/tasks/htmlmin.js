module.exports = function(grunt) {
  var dest;
  // Define la ruta destino de los archivos html minificados
  dest = grunt.config.get('config').deploy_routes().templates;
  // Carga el paquete de dependecia
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  
  // Configura la tarea enviando como primer parámetro el nombre de la tarea y 
  // como segundo la configuración interna de la subtarea:compile.
  // Ojo: El nombre de la tarea debe ser el mismo que el de su documentación
  grunt.config.set('htmlmin', {
    minify: {
      options: { // Configura las opciones de minificado                        
        removeComments: true, // Define si debe o no eliminar los comentarios.
        collapseWhitespace: true, // Define si debe eliminar los espacios en blanco
        minifyJS: true // Define si debe minificar el javascript inline
      },
      files: [
        {
          expand: true, // Recorre todos los archivos de la carpeta definida
          cwd: dest, // Define la ruta de origen de los archivos
          src:'**/*' + grunt.config.get('config').settings.template_ext, //  Define que tipo de archivos seran copiados.
          dest: dest  // Define la ruta de salida de los archivos
        }
      ]
    }
  });
};


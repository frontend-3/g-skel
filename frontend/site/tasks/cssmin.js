module.exports = function(grunt) {
  var dest;
  
  // Define la ruta destino de los archivos css minificados
  dest = grunt.config.get('config').deploy_routes().styles;
  // Carga el paquete de dependecia
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Configura la tarea enviando como primer parámetro el nombre de la tarea y 
  // como segundo la configuración interna de la subtarea:compile.
  // Ojo: El nombre de la tarea debe ser el mismo que el de su documentación
  grunt.config.set('cssmin', {
    minify: {
      files: [{
        expand: true, // Recorre todos los archivos de la carpeta definida
        cwd: dest,  // Define la ruta de origen de los archivos
        src: ['*.css'], //  Define que tipo de archivos seran copiados (solo archivos .css).
        dest: dest, // Define la ruta destino de los archivos
        keepSpecialComments: false // Define si debe o no conservar los comentarios.
      }]
    }
  });

}
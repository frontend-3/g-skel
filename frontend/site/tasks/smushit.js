module.exports = function(grunt) {
  var dest;
  // Define la ruta destino de los archivos html minificados
  dest = grunt.config.get('config').deploy_routes().images;
  // Carga el paquete de dependecia
  grunt.loadNpmTasks('grunt-smushit');
  
  // Configura la tarea enviando como primer parámetro el nombre de la tarea y 
  // como segundo la configuración interna de la subtarea:compile.
  // Ojo: El nombre de la tarea debe ser el mismo que el de su documentación
  grunt.config.set('smushit', {
    optimize: {     
      expand: true, // Recorre todos los archivos de la carpeta definida
      cwd: 'static/images',  // Define la ruta de origen de los archivos
      src: ['**/*.jpg', '**/*.png'], 
      dest: grunt.config.get('config').deploy_routes().images  // Define la ruta de salida de los archivos    
    }
  });
};


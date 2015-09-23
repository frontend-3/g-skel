module.exports = function(grunt) {
  // Carga el paquete de dependecia
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Configura la tarea enviando como primer parámetro el nombre de la tarea y 
  // como segundo la configuración interna de las subtareas: images y fonts.
  // Ojo: El nombre de la tarea debe ser el mismo que el de su documentación.
  grunt.config.set('copy', {
    images: { // Copia imágenes
      files: [{
        expand: true, // Recorre todos los archivos de la carpeta definida
        cwd: 'static/images', // Define la ruta de origen de los archivos
        src: ['*', '**/*'], //  Define que tipo de archivos seran copiados
        dest: grunt.config.get('config').deploy_routes().images // Define la ruta de salida de los archivos
      }]
    },
    fonts: { // Copia fuentes
      files: [{
        expand: true, // Recorre todos los archivos de la carpeta definida
        cwd: 'static/fonts', // Define la ruta de origen de los archivos
        src: ['*', '**/*'], //  Define que tipo de archivos seran copiados
        dest: grunt.config.get('config').deploy_routes().fonts // Define la ruta de salida de los archivos
      }]
    },
    videos: { // Copia fuentes
      files: [{
        expand: true, // Recorre todos los archivos de la carpeta definida
        cwd: 'static/videos', // Define la ruta de origen de los archivos
        src: ['*', '**/*'], //  Define que tipo de archivos seran copiados
        dest: grunt.config.get('config').deploy_routes().videos // Define la ruta de salida de los archivos
      }]
    }
  });

}
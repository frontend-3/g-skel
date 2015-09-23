module.exports = function(grunt) {

  var config,
      dest;

  // Define la variable config a partir de la propiedad config de grunt
  config = grunt.config.get('config');
  // Define la ruta destino de los sprites y su css
  dest = config.deploy_routes().sprites;
  // Carga librería grunt glue
  grunt.loadNpmTasks('grunt-glue');

  grunt.config.set('glue', {
    compile: {
      src: 'static/sprites', // Define ruta de los archivos de origen
      options: '--css=' + dest + // Define ruta destino del css
        ' --namespace=sp' + // Define namespace para selectores
        ' --img=' + dest + // Define ruta de salida para la imagen concantenada
        ' --url=../sprites/ --margin=10' + // Define la ruta de referencia de los sprites para el css y el margen entre imagenes
        ' --recursive' + // Recorre todo las carpetas de la ruta de origen
        ' --project '// Genera cada sprite de carpeta en imágenes separadas
    }
  }); 
  // Define tarea sprites que ejecuta a las tareas glue, stylus:glue y notify:sprites
  grunt.registerTask('sprites', 'Compiling Templates', function() {
    grunt.task.run(['glue', 'stylus:glue', 'notify:sprites']);
  });

};
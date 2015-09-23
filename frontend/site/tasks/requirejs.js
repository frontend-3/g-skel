  module.exports = function(grunt) {
  // Carga el paquete de dependecia
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Configura la tarea enviando como primer parámetro el nombre de la tarea y 
  // como segundo la configuración interna de la subtarea:compile.
  // Ojo: El nombre de la tarea debe ser el mismo que el de su documentación
  grunt.config.set('requirejs', {
    compile: {
      options: {
        // Ruta de origen de todos los módulos require
        appDir:'static/scripts',
        // Ruta de configuración de las dependencias de los módulos js
        mainConfigFile: "static/scripts/libs/require-config.js",
        // Define url base para la carga de dependencia de los módulos
        baseUrl: '.',
        // Define ruta destino de compilación de los módulos
        dir: grunt.config.get('config').deploy_routes().scripts,
        // Define si debe o no conservar los comentanrios de las licencias
        preserveLicenseComments: false,
        // Define los módulos principales a compilar
        modules: [
          { name: 'site.home' }
        ]
      }
    }
  });

  // Registra tarea scripts que ejecuta la tarea requirejs
  // y la subtarea notif:sprites
  grunt.registerTask('scripts',['requirejs','notify:scripts']);
};
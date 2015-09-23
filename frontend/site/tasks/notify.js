module.exports = function(grunt) {
  // Carga el paquete de dependecia
  grunt.loadNpmTasks('grunt-notify');

  grunt.config.set('notify', {
    watch: { // Notificación para tarea watch
      options: {
        title: 'Watch',
        message: 'Updated files are compiled'
      }
    },
    sprites: { // Notificación para tarea sprites
      options: {
        title: 'Glue',
        message: 'Sprites generated'
      }
    },
    templates: { // Notificación para tarea templates
      options: {
        title: 'Templates',
        message: 'Jade compiled'
      }
    },
    scripts: { // Notificación para tarea scripts
      options: {
        title: 'Requirejs',
        message: 'Requirejs modules compiled'
      }
    },
    styles: { // Notificación para tarea styles
      options: {
        title: 'Css',
        message: 'Stylus compiled',
      }
    }
  });
};
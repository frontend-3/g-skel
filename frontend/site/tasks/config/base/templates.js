function(config) {
    var templates = {
          options: {
            pretty: false,
            data: {
                config: config
            }
          },
          files: [
            {
              options: {
                base: 'templates/sections',
              },
              src: [
                '*.jade',
                '**/*.jade',
                '!_layout.jade',
                '!**/_layout.jade',
                '!includes/**/*.jade',
                '!mixins/**/*.jade',
                '!_*.jade'
              ],
              dest: config.deploy_routes().templates,
              ext: '.html'
            }
          ]
        }
      }
}


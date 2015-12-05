var config = {
  deploy_routes : function () {
    var routes = {},
        base,
        static_path;
    if (this.env == 'dev') {
      base = this.settings.root_deploy;
      static_path =  base + '/static';
      routes = {
        base : base,
        templates: base + '/templates',
        static: static_path,
        styles: static_path + '/styles',
        images: static_path + '/images',
        fonts: static_path + '/fonts',
        videos: static_path + 'videos/',
        scripts: static_path + '/scripts',
        sprites: static_path + '/sprites'
      }
    } else {
      base = this.settings.root_deploy;
      static_path =  base + 'public/site/';
      routes = {
        base: '',
        templates: base + 'templates/site',
        static: static_path,
        styles: static_path + 'styles/',
        images: static_path + 'images/',
        fonts: static_path + 'fonts/',
        videos: static_path + 'videos/',
        scripts: static_path + 'scripts/',
        sprites: static_path + 'sprites/'
      }
    }
    return routes;
  },
  static_url: function(url) {
    if (this.env == 'prod') {
      return "{{ STATIC_URL }}" + url;
    }
    return this.settings.static_uri + '/' + url;
  },
  setEnv : function (env) {
    this.env = env;
  },
  getEnv: function () {
    return this.env;
  },
  notifyConfig : function (options) {
      var _config = {}

      if (typeof options == "object") {
        return options
      }

      _config = {
        message : options,
        onLast  : true
      }

      return _config;
  }
};

module.exports = config;

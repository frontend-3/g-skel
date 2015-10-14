define(function () {

  function setupEventLike (fn) {
     FB.Event.subscribe('edge.create', fn);
  };

  function parseEls () {
      FB.XFBML.parse();
  };

  function share (settings) {
    var el = settings.el,// must be a pure javascript element
        tracking = settings.tracking;

    el.onclick = function (event) {
      var appId = el.getAttribute('data-appId') || '' ,
          redirect_uri = el.getAttribute('data-redirectUri') || '' ,
          display = el.getAttribute('data-display') || '' ,
          from = el.getAttribute('data-from') || '' ,
          to = el.getAttribute('data-to') || '' ,
          link = el.getAttribute('data-link') || '',
          picture = el.getAttribute('data-picture') || '',
          source = el.getAttribute('data-source') || '',
          name = el.getAttribute('data-name') || '' ,
          caption = el.getAttribute('data-caption') || '' ,
          description = el.getAttribute('data-description') || '',
          properties = el.getAttribute('data-properties') || '',
          actions = el.getAttribute('data-actions') || '',
          ref = el.getAttribute('data-ref') || '',
          fb_json = {};

      // La documentacion de cada parametro se encuentra en:
      // https://developers.facebook.com/docs/reference/dialogs/feed/
      fb_json.method = 'feed';
      if (appId !== '') fb_json.appId = appId;
      if (redirect_uri !== '') fb_json.redirect_uri = redirect_uri;
      if (display !== '') fb_json.display = display;
      if (from !== '') fb_json.from = from;
      if (to !== '') fb_json.to = to;
      if (link !== '') fb_json.link = link;
      if (picture !== '') fb_json.picture = picture;
      if (source !== '') fb_json.source = source;
      if (name !== '') fb_json.name = name;
      if (caption !== '') fb_json.caption = caption;
      if (description !== '') fb_json.description = description;
      if (properties !== '') fb_json.properties = properties;
      if (actions !== '') fb_json.actions = actions;
      if (ref !== '') fb_json.ref = ref;
      FB.ui(fb_json, function (response) {
        if (response && response.post_id) {
          ga('send', 'event', tracking.category, tracking.action , tracking.label);
        }
      });
      return false;
    }
  };

  // Public functions
  return {
    share : share,
    parseEls : parseEls
  };

});
define(function() {

  function setupTweetTracking (tracking) {
    twttr.events.bind('tweet', function (intent_event) {
    if (intent_event) {
      var opt_pagePath;
      if (intent_event.target && intent_event.target.nodeName == 'IFRAME') {
            opt_target = extractParamFromUri(intent_event.target.src, 'url');
      }
        ga('send', 'event', tracking.category, tracking.action , tracking.label);
      }
    });
  };

  function setupEventFollow (fn) {
    twttr.events.bind('follow', function (intent_event) {
      fn();
    });
  };

  function parseEls (){
    twttr.widgets.load();
  };

  function extractParamFromUri(uri, paramName) {
    if (!uri) {
      return;
    }
    var regex = new RegExp('[\\?&#]' + paramName + '=([^&#]*)');
    var params = regex.exec(uri);
    if (params != null) {
      return unescape(params[1]);
    }
    return;
  };

  function follow (settings) {
    var el = settings.el, // must be a pure javascript element
        tracking = settings.tracking;

      // La documentación de cada parametro se encuentra en :
      // https://dev.twitter.com/docs/tweet-button
      var count       = el.getAttribute('data-count')  || 'none',
          screen_name = el.getAttribute('data-screen-name') || '',
          lang        = el.getAttribute('data-lang') || 'es',
          width       = el.getAttribute('data-width')  || '',
          align       = el.getAttribute('data-align') || '',
          related     = el.getAttribute('data-related') || false,
          show        = el.getAttribute('data-show-screen-name') || false,
          size        = el.getAttribute('data-size') || '',
          dnt         = el.getAttribute('data-dnt') || false,
          tw_json     = {};

      if (count !== '') tw_json.count = count;
      if (screen_name !== '') tw_json.screen_name = screen_name;
      if (lang !== '') tw_json.lang = lang;
      if (width !== '') tw_json.width = width;
      if (align !== '') tw_json.align = align;
      tw_json.related = related;
      tw_json.jmshow_screen_name = show;
      if (size !== '') tw_json.size = size;
      tw_json.dnt = dnt;
      twttr.widgets.createFollowButton(
        tw_json.screen_name,
        el,
        function (element) {
        },
        tw_json
      );
  };

  function tweet (settings) {
    var el = settings.el, // must be a pure javascript element
        tracking = settings.tracking;
      // La documentación de cada parametro se encuentra en :
      // https://dev.twitter.com/docs/tweet-button
      var priority = el.getAttribute('data-priority')  || '',
          url      = el.getAttribute('data-url') || '',
          via      = el.getAttribute('data-via')  || 'me',
          text     = el.getAttribute('data-text') || '',
          related  = el.getAttribute('data-related') || false,
          count    = el.getAttribute('data-count') || '',
          lang     = el.getAttribute('data-lang') || 'es',
          counturl = el.getAttribute('data-countUrl') || '',
          hashtags = el.getAttribute('data-hashtags') || '',
          size     = el.getAttribute('data-size') || 'small',
          dnt      = el.getAttribute('data-dnt') || false,
          track    = el.getAttribute('data-track') || false,
          tw_json  = {};

      if (priority !== '') tw_json.priority = priority;
      if (url !== '') tw_json.url = url;
      if (via !== '') tw_json.via = via;
      if (text !== '') tw_json.text = text;
      if (related !== '') tw_json.related = related;
      if (count !== '') tw_json.count = count;
      if (lang !== '') tw_json.lang = lang;
      if (counturl !== '') tw_json.counturl = counturl;
      if (hashtags !== '') tw_json.hashtags = hashtags;
      if (size !== '') tw_json.size = size;
      if (dnt !== '') tw_json.dnt = dnt;

      twttr.widgets.createShareButton(
        tw_json.url,
        el,
        function (element) {
        },
        tw_json
      );

      if (track) {
        setupTweetTracking(settings.tracking);
      }
  };

  return {
    tweet : tweet,
    follow : follow,
    parseEls : parseEls
  };

});
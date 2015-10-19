require(['jquery', 'easyModal'], function($, EasyModal) {
  var afterCatchDom, catchDom, defaults, dom, fn, initalize, st, suscribeEvents;
  defaults = {};
  st = {};
  dom = {};
  catchDom = function() {
    dom.document = $(document);
  };
  afterCatchDom = function() {};
  suscribeEvents = function() {};
  fn = {};
  initalize = function() {
    var opts;
    opts = {};
    st = $.extend({}, defaults, opts);
    catchDom(st);
    afterCatchDom();
    suscribeEvents();
  };
  dom.document.ready(initialize);
});

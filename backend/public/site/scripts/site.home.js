require(['jquery', 'easyModal'], function($, EasyModal) {
  var catchDom, defaults, dom, fn, initalize, st, suscribeEvents;
  defaults = {};
  st = {};
  dom = {};
  catchDom = function() {
    dom.document = $(document);
  };
  suscribeEvents = function() {};
  fn = {};
  initalize = function() {
    var opts;
    opts = {};
    st = $.extend({}, defaults, opts);
    catchDom(st);
    suscribeEvents();
  };
  dom.document.ready(initialize);
});
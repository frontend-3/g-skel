define([
], function () {

  function sendEvent(category, label, variable) {
    _gaq.push(['_trackEvent', category, label, variable]);
  };

  return {
    sendEvent: sendEvent
  };

});

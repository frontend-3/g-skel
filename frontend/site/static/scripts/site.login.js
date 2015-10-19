require([
  'easyForm'
  ], function (
    easyForm
  ) {
  var $doc = $(document);

  function init() {
       easyForm.setup();
  }

  $doc.ready(init);
});

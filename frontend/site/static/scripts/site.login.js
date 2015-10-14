require([
  //'fb',
  //'tw',
  'easyForm'
  ], function (
    //fb,
    //tw,
    easyForm
  ) {
  var $doc = $(document);

  function init() {
    //fb.parseEls();
    //tw.parseEls();
    easyForm.setup();    
  }

  $doc.ready(init);
});
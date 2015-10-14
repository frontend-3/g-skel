require([
  //'fb',
  //'tw',
  'easyForm',
  'registerForm'
  ], function (
    //fb,
    //tw,
    easyForm,
    registerForm
  ) {

    var $doc = $(document);

    function init() {
      //fb.parseEls();
      //tw.parseEls();
      easyForm.setup();
      registerForm.setupRegisterForm();      
    }

    $doc.ready(init);
});
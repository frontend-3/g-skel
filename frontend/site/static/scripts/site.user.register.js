require([
  'easyForm',
  'registerForm'
  ], function (
    easyForm,
    registerForm
  ) {

    var $doc = $(document);

    function init() {
      easyForm.setup();
      registerForm.setupRegisterForm();
    }

    $doc.ready(init);
});

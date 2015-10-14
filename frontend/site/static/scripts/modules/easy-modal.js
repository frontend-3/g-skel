define([
  'datepicker',
  'validateExt'
], function() {
  var EasyModal,
    defaults;

  defaults = {
    'padding': 0,
    'width': 450,
    'height': 320,
    'isFixed': false,
    'content': "This is a content example",
    'onClose': null,
    'onAfterShow': null,
    'id': ''
  };

  function EasyModal(options) {
    this.options = $.extend({}, defaults, options);
    this.init();
  }

  EasyModal.prototype = {
    constructor: EasyModal,
    init: function() {
      var modal = $('.Modal');

      if (modal.length == 0) {
        $('body').prepend(
          $('<div class="Overlay"></div>'),
          $('<div class="Modal Modal--' + this.options.id + '"></div>')
        );
      } else {
        $('body').prepend(
          $('<div class="Modal Modal--' + this.options.id + '"></div>')
        );
      }
    },
    setContent: function(content) {
      this.$modal.html(content);

    },
    getContent: function() {
      return this.$modal.html();
    },
    _setupEventCloseModal: function() {
      var $body = $('body');

      $body.on('click', this.$modal.find('.Modal-close').selector, {
        obj: this
      }, this.close);
      this.$overlay.on('click', {
        obj: this
      }, this.close);
      $(document).on('keydown', {
        obj: this
      }, function(e) {
        if (e.keyCode == 27) {
          e.data.obj.close(e);
        }
      });
    },
    close: function(e) {
      var onClose,
        data,
        self;

      if (e) {
        data = e.data;
        self = data.obj;
      } else {
        self = this;
      }

      onClose = self.options.onClose;
      self.$overlay.fadeOut(200);
      self.$modal.fadeOut(200);
      self.$modal.removeClass('is-show');
      if (onClose) {
        onClose();
      }

      if (self.options.isFixed) {
        $('body').removeClass('u-noScroll')
      }
    },
    show: function() {
      var $body,
        $calculatedPositionLeft,
        $calculatedPositionTop,
        $topScrollbar;

      this.$overlay.show();
      $body = $('body');
      calculatedPositionLeft = parseInt(($body.width() - this.options.width) / 2);
      calculatedPositionTop = parseInt(($body.height() - this.options.height) / 2);
      topScrollbar = $(document).scrollTop();

      this.$modal.removeClass('is-show');
      if (this.options.isFixed) {
        $body.addClass('u-noScroll');
        this.$modal.css({
          'top': calculatedPositionTop + 'px',
          "padding": this.options.padding + "px",
          "width": this.options.width + "px",
          "height": this.options.height + "px",
          "left": calculatedPositionLeft + 'px'
        });
      } else {
        this.$modal.css({
          'top': (topScrollbar + 150) + 'px',
          "padding": this.options.padding + "px",
          "width": this.options.width + "px",
          "height": this.options.height + "px",
          "left": calculatedPositionLeft + 'px'
        });
      }
      this.$modal.fadeIn(600);
      var onAfterShow = this.options.onAfterShow;

      if (onAfterShow) {

        onAfterShow();
      }

    }
  }
  return EasyModal;
});
define([
], function () {
  var EasySlider,
      defaults;

  defaults = {
    'delay': 3000,
    'autoslider': true,
    'contentSliderSelector': '.Slider-slides',
    'slideSelector': '.Slider-slide',
    'contentControlSelector': '.Slider-controls',
    'controlSelector': '.Slider-control'
  };

  function EasySlider(options) {      
      this.options = $.extend({}, defaults,  options);      
      this.init();
  }
    
  EasySlider.prototype = {
    constructor : EasySlider,
    init: function() {
      var contentSliderSelector = this.options.contentSliderSelector,
          slideSelector = this.options.slideSelector,
          contentControlSelector = this.options.contentControlSelector,
          controlSelector = this.options.controlSelector;

      
      this._direction = 'right';
      this._$currentSlide = $(contentSliderSelector).find(slideSelector).first();
      this._$currentControl = $(contentControlSelector).find(controlSelector).first();
      this._setupEventChangeSlide();
      
      if (this.options.autoslider) {
        this._autoslider();
      }
    },
    _autoslider : function(self) {
      clearInterval(this.intervalAutoSlider);
      this.intervalAutoSlider = setInterval(function (self) {
        var currSlide,
            slideSelector;

        slideSelector = self.options.slideSelector;

        if(self._direction === 'right') {
          if (self._$currentSlide.next(slideSelector).length > 0) {
            currSlide = self._$currentSlide.next(slideSelector);
          } else {
            if (self._$currentSlide.prev(slideSelector).length > 0) {
              currSlide = self._$currentSlide.prev(slideSelector);
              self._direction = 'left';
            }          
          }
        } else {
          if (self._$currentSlide.prev(slideSelector).length > 0) {
            currSlide = self._$currentSlide.prev(slideSelector);
          } else {
            if (self._$currentSlide.next(slideSelector).length > 0) {
              currSlide = self._$currentSlide.next(slideSelector);
              self._direction = 'right';
            }          
          }
        }

        self._changeSlide({
          data: {
            item : $(currSlide).data('item'),
            obj: self
          }
        });
      }, this.options.delay, this);
    },
    _setupEventChangeSlide: function() {
      var contentControlSelector,
          controlSelector;

      contentControlSelector = this.options.contentControlSelector;
      controlSelector = this.options.controlSelector;
      $(contentControlSelector).find(controlSelector).on('click', {obj : this, interrumpAutoSlider : true}, this._changeSlide);
    },
    _changeSlide: function(e) {
      var data,
          self,
          item,
          contentSliderSelector,
          slideSelector,
          newSlide, 
          index;

      data = e.data;
      self = data.obj;

      if (this instanceof EasySlider ) {
        item = data.item;
      } else {
        item = $(this).data('item');
      }
      
      contentSliderSelector = self.options.contentSliderSelector;
      slideSelector = self.options.slideSelector;
      contentControlSelector = self.options.contentControlSelector;
      controlSelector = self.options.controlSelector;

      interrumpAutoSlider = data.interrumpAutoSlider || false;
      newSlide = $(contentSliderSelector).find(slideSelector).filter('[data-item=' + item + ']');   
      newControl = $(contentControlSelector).find(controlSelector).filter('[data-item=' + item + ']');
      
      // Remove class is-active to current slide and button
      self._$currentSlide.removeClass('is-active');
      self._$currentControl.removeClass('is-active');
      // Add class is-active to new slide and button
      newSlide.addClass('is-active');
      newControl.addClass('is-active');
      // Set new current slide and button
      self._$currentSlide = newSlide;
      self._$currentControl = newControl;

      if (interrumpAutoSlider) {
        self._autoslider();
      }
    },
    setSlide: function(item) {
      this._changeSlide({
        data: {
          obj: this,
          item: item,
          interrumpAutoSlider : true
        }
      });
    },
    getSlide: function() {
      return this._$currentSlide;
    }
  }
  return EasySlider;
});
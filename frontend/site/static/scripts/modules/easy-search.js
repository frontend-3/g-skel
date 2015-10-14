define([
  'jquery-ui',
  ], function() {
  var hideAutocomplete;
  
  function highlightAutocompleteItems() {
    $.ui.autocomplete.prototype._renderItem = function(ul, item) {      
      var re = new RegExp("^" + this.term,'i');
      if (item.label !== 'Ejemplo:') {
        var t = item.label.replace(re, "<span class='highlight-item'>" +
         capitalise(query) +
          "</span>");

        return $("<li></li>")
          .data("item.autocomplete", item)
          .append("<a>" + t + "</a>")
          .appendTo(ul);
      } else {
        return $("<li class='suggest-item'></li>")
          .data("item.autocomplete", item)
          .append("<a>" + item.label + "</a>")
          .appendTo(ul);
      }
    };
  }

  function capitalise(string) {
    return string.toUpperCase();
  }

  function setupDefaultAutocomplete(el, el_hidden, callback) {
    var default_data = [{
      label: 'Ejemplo:',
      id: '0'
    }, {
      label: 'MIRAFLORES, LIMA',
      id: '15-01-22',
      slug: 'MIRAFLORES-LIMA-LIMA'
    }, {
      label: 'CERCADO DE LIMA, LIMA',
      id: '15-01-01',
      slug: 'CERCADO-DE-LIMA-LIMA-LIMA'
    }];
    var empty_array = Array();
    el.autocomplete({
      source: function(request, response) {
        query = el.val();
        if (query.length > 0) {
          var datasource = el.attr('data-source');
          $.getJSON(datasource, {
            name: query
          }, response);
          response(default_data);
        } else {
          if (query.length == 0) {
            response(default_data);
          } else {
            response(empty_array);
          }
        }
      },
      minLength: 0,
      messages: {
        noResults: '',
        results: function() {
          return '';
        }
      },
      focus: function(event, ui) {
        query = el.val();
        if (query.length == 0) {
          return false
        }
      },
      select: function(event, ui) {
        el.val(ui.item.label);
        el_hidden.val(ui.item.slug);        
        callback();
      }
    });

    $(window).on('resize', function () {
      clearTimeout(hideAutocomplete);
      hideAutocomplete = setTimeout(function () {
        $(".ui-autocomplete").css('display', 'none');  
      }, 500);
      
    });
  }

  function init(settings) {
    
    var $el = settings.el,
        $hidden_el = settings.hidden_el,
        callback = settings.callback,
        datasource = $el.attr('data-source');


    highlightAutocompleteItems();

    // Configuramos el placeholder para navegadores que no lo soporten por defecto
    //$el.placeholder();
    
    // Configuramos autocomplete con data por default
    setupDefaultAutocomplete($el, $hidden_el, callback);
    
    // Configuramos que al hacer click al input se muestre la data que tenga disponible
    $el.on('click', function() {
      $(this).autocomplete("search");
    });

    $el.on('keyup', function(evt) {
      if (event.keyCode == 8) {        
        $hidden_el.val('');
      }
    });

    $el.trigger('click');
  }

  return init;

});
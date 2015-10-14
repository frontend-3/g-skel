define([
], function() {

  function loadProv() {
    var $this = $(this),
      selectedVal = $this.val(),
      $el = $('#cod_prov'),
      $sub_el = $('#cod_dist'),
      html = '<option class="ElementForm-selectOption" value="">Selecciona</option>',
      item;

    if (selectedVal === '') {
      $el.html(html)
        .attr('disabled')
        .parent().addClass('is-disabled')
    } else {

      $el.html(html);
      $el.removeAttr('disabled');
      $el.parent().removeClass('is-disabled');
      $el.trigger('change');
      $sub_el.html(html).attr('disabled', 'disabled');
      $sub_el.parent().addClass('is-disabled');
      $sub_el.trigger('change');

      $.get($el.attr('data-source'), {
        'cod_dpto': selectedVal
      }).done(function(data) {
        for (item in data) {                    
          if (data[item].code == $el.attr('data-value')) {
            html += '<option selected class="ElementForm-selectOption" value="' + data[item].code + '">' + data[item].name + '</option>';  
          } else {
            html += '<option class="ElementForm-selectOption" value="' + data[item].code + '">' + data[item].name + '</option>';  
          }
        }        
        $el.html(html);
        $el.trigger('change');
      });
    }
  };

  function loadDist() {
    var $el = $('#cod_dist'),
      $dept = $('#cod_dpto'),
      $this = $(this),
      html = '<option class="ElementForm-selectOption" value="">Selecciona</option>',
      selectedVal = $this.val(),
      item;

    if (selectedVal === '') {
      $el.html(html);
      $el.attr('disabled', 'disabled');
      $el.parent().addClass('is-disabled');
      $el.trigger('change');
    } else {
      $el.removeAttr('disabled');
      $el.parent().removeClass('is-disabled');
      $el.trigger('change');
      $.get($el.attr('data-source'), {
        'cod_prov': $this.val(),
        'cod_dpto': $dept.val(),
      }).done(function(data) {
        for (item in data) {
          
          if (data[item].code == $el.attr('data-value')) {
            html += '<option selected class="ElementForm-selectOption" value="' + data[item].code + '">' + data[item].name + '</option>';  
          } else {
            html += '<option class="ElementForm-selectOption" value="' + data[item].code + '">' + data[item].name + '</option>';  
          }
          
        }        
        $el.html(html);
        $el.trigger('change');
      });
    }
  };

  function setupRegisterForm() {
    var dpt = $('#cod_dpto'),
      prov = $('#cod_prov'),
      dist = $('#cod_dist');
       
    if (prov.length > 0) {
      dpt.on('change', loadProv);
      prov.on('change', loadDist);
    } 

    setTimeout(function() {
      dpt.trigger('change');
    }, 500);



  };

  return {
    setupRegisterForm: setupRegisterForm
  };

});
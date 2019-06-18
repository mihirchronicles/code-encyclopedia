/*****************************************
  NAVIGATION
*****************************************/
'use strict';

(function () {

  $('.open').on('click',function(e){
    e.preventDefault();
    $(this).addClass('hidden');
    $('.close').removeClass('hidden');
    $('nav').addClass('slide');
  });

  $('.close').on('click',function(e){
    e.preventDefault();
    $(this).addClass('hidden');
    $('.open').removeClass('hidden');
    $('nav').removeClass('slide');
  });

}());

/*****************************************
  SWIPEBOX
*****************************************/
$(document).ready(function() {
    /* Basic Gallery */
    $('.swipebox').swipebox();
    /* Video */
    $('.swipebox-video').swipebox();
});

/*****************************************
  DROPDOWN
*****************************************/
$(document).on('change', '.div-toggle', function() {
  var target = $(this).data('target');
  var show = $("option:selected", this).data('show');
  $(target).children().addClass('hide');
  $(show).removeClass('hide');
});
$(document).ready(function(){
  $('.div-toggle').trigger('change');
});

/*****************************************
  AVATAR CHANGE
*****************************************/
$('#btnClick').on('click',function(){
    if($('#1').css('display')!='none'){
    $('#2').html($('#static').html()).show().siblings('div').hide();
    }else if($('#2').css('display')!='none'){
        $('#1').show().siblings('div').hide();
    }
});
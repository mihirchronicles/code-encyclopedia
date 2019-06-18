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
  MODAL
*****************************************/
$( document ).ready(function() {
  $('.trigger').click(function() {
     $('.modal-wrapper').toggleClass('open');
    $('.page-wrapper').toggleClass('blur');
     return false;
  });
});


$(document).on('change', '.div-toggle', function() {
  var target = $(this).data('target');
  var show = $("option:selected", this).data('show');
  $(target).children().addClass('hide');
  $(show).removeClass('hide');
});
$(document).ready(function(){
  $('.div-toggle').trigger('change');
});



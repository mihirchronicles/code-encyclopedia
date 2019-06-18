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
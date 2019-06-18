// 
// Countdown
//
function makeTimer() {

  var endTime = new Date("May 24, 2019 6:00:00 CST");
  var endTime = (Date.parse(endTime)) / 1000;

  var now = new Date();
  var now = (Date.parse(now) / 1000);

  var timeLeft = endTime - now;

  var days = Math.floor(timeLeft / 86400);
  var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
  var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
  var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

  if (hours < "10") { hours = "0" + hours; }
  if (minutes < "10") { minutes = "0" + minutes; }
  if (seconds < "10") { seconds = "0" + seconds; }

  $("#days").html(days + "<span>Days</span>");
  $("#hours").html(hours + "<span>Hours</span>");
  $("#minutes").html(minutes + "<span>Minutes</span>");
  $("#seconds").html(seconds + "<span>Seconds</span>");

}
setInterval(function () { makeTimer(); }, 1000);

// 
// Invitation
//
$(".front").click(function () {
  if ($(".library-card.envelope").hasClass("card-in")) {
    $(".library-card.envelope").toggleClass("card-in");
  }
  $(".library-card.envelope").toggleClass("card-out");
});
$(".submit").click(function () {
  $(".library-card.envelope").toggleClass("card-in");
  if ($(".library-card.envelope").hasClass("card-out")) {
    $(".library-card.envelope").toggleClass("card-out");
  }
  $('.stamp').html("Thanks for RSVP-ing!");
  setTimeout(function () { $('.stamp').html("Click here to RSVP"); }, 3000);
  setTimeout(function () { document.location.href = document.location.href; }, 1500);
});

// 
// Menu
//
$.fn.extend({
  // Define the threeBarToggle function by extending the jQuery object
  threeBarToggle: function (options) {

    // Set the default options
    var defaults = {
      color: 'black',
      width: 30,
      height: 25,
      speed: 400,
      animate: true
    }
    var options = $.extend(defaults, options);

    return this.each(function () {

      $(this).empty().css({ 'width': options.width, 'height': options.height, 'background': 'transparent' });
      $(this).addClass('tb-menu-toggle');
      $(this).prepend('<i></i><i></i><i></i>').on('click', function (event) {
        event.preventDefault();
        $(this).toggleClass('tb-active-toggle');
        if (options.animate) { $(this).toggleClass('tb-animate-toggle'); }
        $('.tb-mobile-menu').slideToggle(options.speed);
      });
      $(this).children().css('background', options.color);
    });
  },

  // Define the accordionMenu() function that adds the sliding functionality
  accordionMenu: function (options) {

    // Set the default options
    var defaults = {
      speed: 400
    }
    var options = $.extend(defaults, options);

    return this.each(function () {

      $(this).addClass('tb-mobile-menu');
      var menuItems = $(this).children('li');
      menuItems.find('.sub-menu').parent().addClass('tb-parent');
      $('.tb-parent ul').hide();
      $('.tb-parent > a').on('click', function (event) {
        event.stopPropagation();
        event.preventDefault();
        $(this).siblings().slideToggle(options.speed);
      });

    });
  }
});

// Convert any element into a three bar toggle
// Optional arguments are 'speed' (number in ms, 'slow' or 'fast') and 'animation' (true or false) to disable the animation on the toggle
$('#menu-toggle').threeBarToggle({ color: '#eee', width: 30, height: 25 });

// Make any nested ul-based menu mobile
// Optional arguments are 'speed' and 'accordion' (true or false) to disable the behavior of closing other sub
$('#menu').accordionMenu();

// Google Map
// Initialize and add the map
function initMap() {
  // The location of Uluru
  var uluru = { lat: 41.8564338, lng: -86.55224450000003 };
  // The map, centered at Uluru
  var map = new google.maps.Map(
    document.getElementById('map'), { zoom: 8, center: uluru });
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({ position: uluru, map: map });
}

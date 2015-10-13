(function() {

module.exports = function() {

var $aboutToggle = $('.menu__link--about');
var $aboutPage = $('.about-page');
var aboutPageActive = 'about-page--active'

$aboutToggle.on('click', function(e) {


  if ( $('body').hasClass(aboutPageActive) ) {
    $('body').removeClass(aboutPageActive);
  } else {
    $('body').addClass(aboutPageActive);
  }

});

$aboutPage.on('click', function(e) {

  if ( !$('.about-content').is(e.target) && !$('.about-content').find('*').is(e.target) ) {
    $('body').removeClass(aboutPageActive);
  }

});



}

})()
(function() {

module.exports = function() {

var $aboutToggle = $('.menu__link--about');
var $aboutPage = $('.about-page');
var aboutPageActive = 'about-page--active'

$aboutToggle.on('click', function(e) {


  if ( $aboutPage.hasClass(aboutPageActive) ) {
    e.preventDefault();
    $aboutPage.removeClass(aboutPageActive);
  } else {
    e.preventDefault();
    $aboutPage.addClass(aboutPageActive);
  }

});


if (window.location.hash === '#about') {
  $aboutPage.addClass(aboutPageActive);
}



}

})()
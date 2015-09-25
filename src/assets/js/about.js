(function() {

module.exports = function() {

var $aboutToggle = $('.menu__link--about');
var $aboutPage = $('.about-page');
var aboutPageActive = 'about-page--active'

$aboutToggle.on('click', function(e) {


  if ( $aboutPage.hasClass(aboutPageActive) ) {
    e.preventDefault();
    console.log(0);
    $aboutPage.removeClass(aboutPageActive);
    window.location.hash = '';
  } else {
    $aboutPage.addClass(aboutPageActive);
    console.log(1);
  }

});


if (window.location.hash === '#about') {
  $aboutPage.addClass(aboutPageActive);
}



}

})()
(function() {

module.exports = function() {

var $navToggle = $('.menu__link--nav');
var $nav = $('.nav');

$navToggle.on('click', function(e) {
  e.preventDefault();
  $nav.hasClass('nav--active') ? $nav.removeClass('nav--active') : $nav.addClass('nav--active');

});


$('html, body').on('click', function(e) {
  console.log(e.target);
  if ( !$nav.is(e.target) && !$nav.find('*').is(e.target) && !$navToggle.is(e.target) && !$navToggle.find('*').is(e.target) ) {
    $nav.removeClass('nav--active');
  }
})


}

})()
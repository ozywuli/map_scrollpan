(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\wamp\\www\\lab\\map_scrollpan\\src\\assets\\js\\about.js":[function(require,module,exports){
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
},{}],"C:\\wamp\\www\\lab\\map_scrollpan\\src\\assets\\js\\debounce.js":[function(require,module,exports){
module.exports = function(func, wait, immediate) {


    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };


}


},{}],"C:\\wamp\\www\\lab\\map_scrollpan\\src\\assets\\js\\main.js":[function(require,module,exports){


var menu = require('./menu.js');

menu();


var about = require('./about.js');

about();




var map = require('./map.js');

map();
},{"./about.js":"C:\\wamp\\www\\lab\\map_scrollpan\\src\\assets\\js\\about.js","./map.js":"C:\\wamp\\www\\lab\\map_scrollpan\\src\\assets\\js\\map.js","./menu.js":"C:\\wamp\\www\\lab\\map_scrollpan\\src\\assets\\js\\menu.js"}],"C:\\wamp\\www\\lab\\map_scrollpan\\src\\assets\\js\\map.js":[function(require,module,exports){
var debounce = require('./debounce.js');


(function() {

module.exports = function() {

L.mapbox.accessToken = 'pk.eyJ1IjoiYW9zaWthIiwiYSI6IjQzRGIxeEkifQ.7OvmyBbXwwt9Qxjlh9Qd3w';
// In this case, we just hardcode data into the file. This could be dynamic.
// The important part about this data is that the 'id' property matches
// the HTML above - that's how we figure out how to link up the
// map and the data.


var map = L.mapbox.map('map', 'mapbox.streets', {
    zoomControl: false
});
map.scrollWheelZoom.disable();



$.getJSON('assets/data/destinations.geojson', function(data) {

var placesLayer = L.mapbox.featureLayer(data)
    .addTo(map);

// Ahead of time, select the elements we'll need -
// the narrative container and the individual sections
var $narrative = $('#narrative')
var sections = narrative.getElementsByTagName('section');
var currentId = '';

setId('cover');

function setId(newId) {
    // If the ID hasn't actually changed, don't do anything
    if (newId === currentId) return;
    // Otherwise, iterate through layers, setting the current
    // marker to a different color and zooming to it.
    placesLayer.eachLayer(function(layer) {
        if (layer.feature.properties.id === newId) {
            map.setView(layer.getLatLng(), layer.feature.properties.zoom || 14);
            layer.setIcon(L.mapbox.marker.icon({
                'marker-color': '#a8f'
            }));
        } else {
            layer.setIcon(L.mapbox.marker.icon({
                'marker-color': '#404040'
            }));
        }
    });
    // highlight the current section
    for (var i = 0; i < sections.length; i++) {
        sections[i].className = sections[i].id === newId ? 'active' : '';
    }
    // And then set the new id as the current one,
    // so that we know to do nothing at the beginning
    // of this function if it hasn't changed between calls
    currentId = newId;
}

// If you were to do this for real, you would want to use
// something like underscore's _.debounce function to prevent this
// call from firing constantly.


var panDebounce = debounce(function() {
    var narrativeHeight = $narrative.height();
    var newId = currentId;

    // Find the section that's currently scrolled-to.
    // We iterate backwards here so that we find the topmost one.
    for (var i = sections.length - 1; i >= 0; i--) {
        var rect = sections[i].getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= narrativeHeight) {
            newId = sections[i].id;
        }
    };
    setId(newId);
}, 150);


$(window).on('scroll', function() {

panDebounce();

}); // end window scroll


// highlight marker and corresponding panel on click

placesLayer.eachLayer(function(layer) {
    layer.on('click', function() {
        setId(this.feature.properties.id);
        var $listItem = $('.active');
        $('html, body').animate({
            scrollTop: $listItem.offset().top - 50
        });
    });
});



}); // end geojson ajax call



} // end module export



})() // end anonymous function wrapper
},{"./debounce.js":"C:\\wamp\\www\\lab\\map_scrollpan\\src\\assets\\js\\debounce.js"}],"C:\\wamp\\www\\lab\\map_scrollpan\\src\\assets\\js\\menu.js":[function(require,module,exports){
(function() {

module.exports = function() {

var $navToggle = $('.menu__link--nav');
var $nav = $('.nav');

$navToggle.on('click', function(e) {
  e.preventDefault();
  $nav.hasClass('nav--active') ? $nav.removeClass('nav--active') : $nav.addClass('nav--active');

});


}

})()
},{}]},{},["C:\\wamp\\www\\lab\\map_scrollpan\\src\\assets\\js\\main.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL2pzL2Fib3V0LmpzIiwic3JjL2Fzc2V0cy9qcy9kZWJvdW5jZS5qcyIsInNyYy9hc3NldHMvanMvbWFpbi5qcyIsInNyYy9hc3NldHMvanMvbWFwLmpzIiwic3JjL2Fzc2V0cy9qcy9tZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKSB7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cclxudmFyICRhYm91dFRvZ2dsZSA9ICQoJy5tZW51X19saW5rLS1hYm91dCcpO1xyXG52YXIgJGFib3V0UGFnZSA9ICQoJy5hYm91dC1wYWdlJyk7XHJcbnZhciBhYm91dFBhZ2VBY3RpdmUgPSAnYWJvdXQtcGFnZS0tYWN0aXZlJ1xyXG5cclxuJGFib3V0VG9nZ2xlLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcblxyXG4gIGlmICggJGFib3V0UGFnZS5oYXNDbGFzcyhhYm91dFBhZ2VBY3RpdmUpICkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc29sZS5sb2coMCk7XHJcbiAgICAkYWJvdXRQYWdlLnJlbW92ZUNsYXNzKGFib3V0UGFnZUFjdGl2ZSk7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcnO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkYWJvdXRQYWdlLmFkZENsYXNzKGFib3V0UGFnZUFjdGl2ZSk7XHJcbiAgICBjb25zb2xlLmxvZygxKTtcclxuICB9XHJcblxyXG59KTtcclxuXHJcblxyXG5pZiAod2luZG93LmxvY2F0aW9uLmhhc2ggPT09ICcjYWJvdXQnKSB7XHJcbiAgJGFib3V0UGFnZS5hZGRDbGFzcyhhYm91dFBhZ2VBY3RpdmUpO1xyXG59XHJcblxyXG5cclxuXHJcbn1cclxuXHJcbn0pKCkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xyXG5cclxuXHJcbiAgICB2YXIgdGltZW91dDtcclxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XHJcbiAgICAgICAgaWYgKGNhbGxOb3cpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICB9O1xyXG5cclxuXHJcbn1cclxuXHJcbiIsIlxyXG5cclxudmFyIG1lbnUgPSByZXF1aXJlKCcuL21lbnUuanMnKTtcclxuXHJcbm1lbnUoKTtcclxuXHJcblxyXG52YXIgYWJvdXQgPSByZXF1aXJlKCcuL2Fib3V0LmpzJyk7XHJcblxyXG5hYm91dCgpO1xyXG5cclxuXHJcblxyXG5cclxudmFyIG1hcCA9IHJlcXVpcmUoJy4vbWFwLmpzJyk7XHJcblxyXG5tYXAoKTsiLCJ2YXIgZGVib3VuY2UgPSByZXF1aXJlKCcuL2RlYm91bmNlLmpzJyk7XHJcblxyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHJcbkwubWFwYm94LmFjY2Vzc1Rva2VuID0gJ3BrLmV5SjFJam9pWVc5emFXdGhJaXdpWVNJNklqUXpSR0l4ZUVraWZRLjdPdm15QmJYd3d0OVF4amxoOVFkM3cnO1xyXG4vLyBJbiB0aGlzIGNhc2UsIHdlIGp1c3QgaGFyZGNvZGUgZGF0YSBpbnRvIHRoZSBmaWxlLiBUaGlzIGNvdWxkIGJlIGR5bmFtaWMuXHJcbi8vIFRoZSBpbXBvcnRhbnQgcGFydCBhYm91dCB0aGlzIGRhdGEgaXMgdGhhdCB0aGUgJ2lkJyBwcm9wZXJ0eSBtYXRjaGVzXHJcbi8vIHRoZSBIVE1MIGFib3ZlIC0gdGhhdCdzIGhvdyB3ZSBmaWd1cmUgb3V0IGhvdyB0byBsaW5rIHVwIHRoZVxyXG4vLyBtYXAgYW5kIHRoZSBkYXRhLlxyXG5cclxuXHJcbnZhciBtYXAgPSBMLm1hcGJveC5tYXAoJ21hcCcsICdtYXBib3guc3RyZWV0cycsIHtcclxuICAgIHpvb21Db250cm9sOiBmYWxzZVxyXG59KTtcclxubWFwLnNjcm9sbFdoZWVsWm9vbS5kaXNhYmxlKCk7XHJcblxyXG5cclxuXHJcbiQuZ2V0SlNPTignYXNzZXRzL2RhdGEvZGVzdGluYXRpb25zLmdlb2pzb24nLCBmdW5jdGlvbihkYXRhKSB7XHJcblxyXG52YXIgcGxhY2VzTGF5ZXIgPSBMLm1hcGJveC5mZWF0dXJlTGF5ZXIoZGF0YSlcclxuICAgIC5hZGRUbyhtYXApO1xyXG5cclxuLy8gQWhlYWQgb2YgdGltZSwgc2VsZWN0IHRoZSBlbGVtZW50cyB3ZSdsbCBuZWVkIC1cclxuLy8gdGhlIG5hcnJhdGl2ZSBjb250YWluZXIgYW5kIHRoZSBpbmRpdmlkdWFsIHNlY3Rpb25zXHJcbnZhciAkbmFycmF0aXZlID0gJCgnI25hcnJhdGl2ZScpXHJcbnZhciBzZWN0aW9ucyA9IG5hcnJhdGl2ZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2VjdGlvbicpO1xyXG52YXIgY3VycmVudElkID0gJyc7XHJcblxyXG5zZXRJZCgnY292ZXInKTtcclxuXHJcbmZ1bmN0aW9uIHNldElkKG5ld0lkKSB7XHJcbiAgICAvLyBJZiB0aGUgSUQgaGFzbid0IGFjdHVhbGx5IGNoYW5nZWQsIGRvbid0IGRvIGFueXRoaW5nXHJcbiAgICBpZiAobmV3SWQgPT09IGN1cnJlbnRJZCkgcmV0dXJuO1xyXG4gICAgLy8gT3RoZXJ3aXNlLCBpdGVyYXRlIHRocm91Z2ggbGF5ZXJzLCBzZXR0aW5nIHRoZSBjdXJyZW50XHJcbiAgICAvLyBtYXJrZXIgdG8gYSBkaWZmZXJlbnQgY29sb3IgYW5kIHpvb21pbmcgdG8gaXQuXHJcbiAgICBwbGFjZXNMYXllci5lYWNoTGF5ZXIoZnVuY3Rpb24obGF5ZXIpIHtcclxuICAgICAgICBpZiAobGF5ZXIuZmVhdHVyZS5wcm9wZXJ0aWVzLmlkID09PSBuZXdJZCkge1xyXG4gICAgICAgICAgICBtYXAuc2V0VmlldyhsYXllci5nZXRMYXRMbmcoKSwgbGF5ZXIuZmVhdHVyZS5wcm9wZXJ0aWVzLnpvb20gfHwgMTQpO1xyXG4gICAgICAgICAgICBsYXllci5zZXRJY29uKEwubWFwYm94Lm1hcmtlci5pY29uKHtcclxuICAgICAgICAgICAgICAgICdtYXJrZXItY29sb3InOiAnI2E4ZidcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxheWVyLnNldEljb24oTC5tYXBib3gubWFya2VyLmljb24oe1xyXG4gICAgICAgICAgICAgICAgJ21hcmtlci1jb2xvcic6ICcjNDA0MDQwJ1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyBoaWdobGlnaHQgdGhlIGN1cnJlbnQgc2VjdGlvblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHNlY3Rpb25zW2ldLmNsYXNzTmFtZSA9IHNlY3Rpb25zW2ldLmlkID09PSBuZXdJZCA/ICdhY3RpdmUnIDogJyc7XHJcbiAgICB9XHJcbiAgICAvLyBBbmQgdGhlbiBzZXQgdGhlIG5ldyBpZCBhcyB0aGUgY3VycmVudCBvbmUsXHJcbiAgICAvLyBzbyB0aGF0IHdlIGtub3cgdG8gZG8gbm90aGluZyBhdCB0aGUgYmVnaW5uaW5nXHJcbiAgICAvLyBvZiB0aGlzIGZ1bmN0aW9uIGlmIGl0IGhhc24ndCBjaGFuZ2VkIGJldHdlZW4gY2FsbHNcclxuICAgIGN1cnJlbnRJZCA9IG5ld0lkO1xyXG59XHJcblxyXG4vLyBJZiB5b3Ugd2VyZSB0byBkbyB0aGlzIGZvciByZWFsLCB5b3Ugd291bGQgd2FudCB0byB1c2VcclxuLy8gc29tZXRoaW5nIGxpa2UgdW5kZXJzY29yZSdzIF8uZGVib3VuY2UgZnVuY3Rpb24gdG8gcHJldmVudCB0aGlzXHJcbi8vIGNhbGwgZnJvbSBmaXJpbmcgY29uc3RhbnRseS5cclxuXHJcblxyXG52YXIgcGFuRGVib3VuY2UgPSBkZWJvdW5jZShmdW5jdGlvbigpIHtcclxuICAgIHZhciBuYXJyYXRpdmVIZWlnaHQgPSAkbmFycmF0aXZlLmhlaWdodCgpO1xyXG4gICAgdmFyIG5ld0lkID0gY3VycmVudElkO1xyXG5cclxuICAgIC8vIEZpbmQgdGhlIHNlY3Rpb24gdGhhdCdzIGN1cnJlbnRseSBzY3JvbGxlZC10by5cclxuICAgIC8vIFdlIGl0ZXJhdGUgYmFja3dhcmRzIGhlcmUgc28gdGhhdCB3ZSBmaW5kIHRoZSB0b3Btb3N0IG9uZS5cclxuICAgIGZvciAodmFyIGkgPSBzZWN0aW9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIHZhciByZWN0ID0gc2VjdGlvbnNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgaWYgKHJlY3QudG9wID49IDAgJiYgcmVjdC50b3AgPD0gbmFycmF0aXZlSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIG5ld0lkID0gc2VjdGlvbnNbaV0uaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHNldElkKG5ld0lkKTtcclxufSwgMTUwKTtcclxuXHJcblxyXG4kKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cclxucGFuRGVib3VuY2UoKTtcclxuXHJcbn0pOyAvLyBlbmQgd2luZG93IHNjcm9sbFxyXG5cclxuXHJcbi8vIGhpZ2hsaWdodCBtYXJrZXIgYW5kIGNvcnJlc3BvbmRpbmcgcGFuZWwgb24gY2xpY2tcclxuXHJcbnBsYWNlc0xheWVyLmVhY2hMYXllcihmdW5jdGlvbihsYXllcikge1xyXG4gICAgbGF5ZXIub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2V0SWQodGhpcy5mZWF0dXJlLnByb3BlcnRpZXMuaWQpO1xyXG4gICAgICAgIHZhciAkbGlzdEl0ZW0gPSAkKCcuYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6ICRsaXN0SXRlbS5vZmZzZXQoKS50b3AgLSA1MFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG59KTsgLy8gZW5kIGdlb2pzb24gYWpheCBjYWxsXHJcblxyXG5cclxuXHJcbn0gLy8gZW5kIG1vZHVsZSBleHBvcnRcclxuXHJcblxyXG5cclxufSkoKSAvLyBlbmQgYW5vbnltb3VzIGZ1bmN0aW9uIHdyYXBwZXIiLCIoZnVuY3Rpb24oKSB7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cclxudmFyICRuYXZUb2dnbGUgPSAkKCcubWVudV9fbGluay0tbmF2Jyk7XHJcbnZhciAkbmF2ID0gJCgnLm5hdicpO1xyXG5cclxuJG5hdlRvZ2dsZS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICRuYXYuaGFzQ2xhc3MoJ25hdi0tYWN0aXZlJykgPyAkbmF2LnJlbW92ZUNsYXNzKCduYXYtLWFjdGl2ZScpIDogJG5hdi5hZGRDbGFzcygnbmF2LS1hY3RpdmUnKTtcclxuXHJcbn0pO1xyXG5cclxuXHJcbn1cclxuXHJcbn0pKCkiXX0=

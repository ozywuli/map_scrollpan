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
L.control.zoomslider().addTo(map);



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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL2pzL2Fib3V0LmpzIiwic3JjL2Fzc2V0cy9qcy9kZWJvdW5jZS5qcyIsInNyYy9hc3NldHMvanMvbWFpbi5qcyIsInNyYy9hc3NldHMvanMvbWFwLmpzIiwic3JjL2Fzc2V0cy9qcy9tZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbigpIHtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblxyXG52YXIgJGFib3V0VG9nZ2xlID0gJCgnLm1lbnVfX2xpbmstLWFib3V0Jyk7XHJcbnZhciAkYWJvdXRQYWdlID0gJCgnLmFib3V0LXBhZ2UnKTtcclxudmFyIGFib3V0UGFnZUFjdGl2ZSA9ICdhYm91dC1wYWdlLS1hY3RpdmUnXHJcblxyXG4kYWJvdXRUb2dnbGUub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHJcbiAgaWYgKCAkYWJvdXRQYWdlLmhhc0NsYXNzKGFib3V0UGFnZUFjdGl2ZSkgKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zb2xlLmxvZygwKTtcclxuICAgICRhYm91dFBhZ2UucmVtb3ZlQ2xhc3MoYWJvdXRQYWdlQWN0aXZlKTtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyc7XHJcbiAgfSBlbHNlIHtcclxuICAgICRhYm91dFBhZ2UuYWRkQ2xhc3MoYWJvdXRQYWdlQWN0aXZlKTtcclxuICAgIGNvbnNvbGUubG9nKDEpO1xyXG4gIH1cclxuXHJcbn0pO1xyXG5cclxuXHJcbmlmICh3aW5kb3cubG9jYXRpb24uaGFzaCA9PT0gJyNhYm91dCcpIHtcclxuICAkYWJvdXRQYWdlLmFkZENsYXNzKGFib3V0UGFnZUFjdGl2ZSk7XHJcbn1cclxuXHJcblxyXG5cclxufVxyXG5cclxufSkoKSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XHJcblxyXG5cclxuICAgIHZhciB0aW1lb3V0O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcclxuICAgICAgICBpZiAoY2FsbE5vdykgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgIH07XHJcblxyXG5cclxufVxyXG5cclxuIiwiXHJcblxyXG52YXIgbWVudSA9IHJlcXVpcmUoJy4vbWVudS5qcycpO1xyXG5cclxubWVudSgpO1xyXG5cclxuXHJcbnZhciBhYm91dCA9IHJlcXVpcmUoJy4vYWJvdXQuanMnKTtcclxuXHJcbmFib3V0KCk7XHJcblxyXG5cclxuXHJcblxyXG52YXIgbWFwID0gcmVxdWlyZSgnLi9tYXAuanMnKTtcclxuXHJcbm1hcCgpOyIsInZhciBkZWJvdW5jZSA9IHJlcXVpcmUoJy4vZGVib3VuY2UuanMnKTtcclxuXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuTC5tYXBib3guYWNjZXNzVG9rZW4gPSAncGsuZXlKMUlqb2lZVzl6YVd0aElpd2lZU0k2SWpRelJHSXhlRWtpZlEuN092bXlCYlh3d3Q5UXhqbGg5UWQzdyc7XHJcbi8vIEluIHRoaXMgY2FzZSwgd2UganVzdCBoYXJkY29kZSBkYXRhIGludG8gdGhlIGZpbGUuIFRoaXMgY291bGQgYmUgZHluYW1pYy5cclxuLy8gVGhlIGltcG9ydGFudCBwYXJ0IGFib3V0IHRoaXMgZGF0YSBpcyB0aGF0IHRoZSAnaWQnIHByb3BlcnR5IG1hdGNoZXNcclxuLy8gdGhlIEhUTUwgYWJvdmUgLSB0aGF0J3MgaG93IHdlIGZpZ3VyZSBvdXQgaG93IHRvIGxpbmsgdXAgdGhlXHJcbi8vIG1hcCBhbmQgdGhlIGRhdGEuXHJcblxyXG5cclxudmFyIG1hcCA9IEwubWFwYm94Lm1hcCgnbWFwJywgJ21hcGJveC5zdHJlZXRzJywge1xyXG4gICAgem9vbUNvbnRyb2w6IGZhbHNlXHJcbn0pO1xyXG5tYXAuc2Nyb2xsV2hlZWxab29tLmRpc2FibGUoKTtcclxuTC5jb250cm9sLnpvb21zbGlkZXIoKS5hZGRUbyhtYXApO1xyXG5cclxuXHJcblxyXG4kLmdldEpTT04oJ2Fzc2V0cy9kYXRhL2Rlc3RpbmF0aW9ucy5nZW9qc29uJywgZnVuY3Rpb24oZGF0YSkge1xyXG5cclxudmFyIHBsYWNlc0xheWVyID0gTC5tYXBib3guZmVhdHVyZUxheWVyKGRhdGEpXHJcbiAgICAuYWRkVG8obWFwKTtcclxuXHJcbi8vIEFoZWFkIG9mIHRpbWUsIHNlbGVjdCB0aGUgZWxlbWVudHMgd2UnbGwgbmVlZCAtXHJcbi8vIHRoZSBuYXJyYXRpdmUgY29udGFpbmVyIGFuZCB0aGUgaW5kaXZpZHVhbCBzZWN0aW9uc1xyXG52YXIgJG5hcnJhdGl2ZSA9ICQoJyNuYXJyYXRpdmUnKVxyXG52YXIgc2VjdGlvbnMgPSBuYXJyYXRpdmUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NlY3Rpb24nKTtcclxudmFyIGN1cnJlbnRJZCA9ICcnO1xyXG5cclxuc2V0SWQoJ2NvdmVyJyk7XHJcblxyXG5mdW5jdGlvbiBzZXRJZChuZXdJZCkge1xyXG4gICAgLy8gSWYgdGhlIElEIGhhc24ndCBhY3R1YWxseSBjaGFuZ2VkLCBkb24ndCBkbyBhbnl0aGluZ1xyXG4gICAgaWYgKG5ld0lkID09PSBjdXJyZW50SWQpIHJldHVybjtcclxuICAgIC8vIE90aGVyd2lzZSwgaXRlcmF0ZSB0aHJvdWdoIGxheWVycywgc2V0dGluZyB0aGUgY3VycmVudFxyXG4gICAgLy8gbWFya2VyIHRvIGEgZGlmZmVyZW50IGNvbG9yIGFuZCB6b29taW5nIHRvIGl0LlxyXG4gICAgcGxhY2VzTGF5ZXIuZWFjaExheWVyKGZ1bmN0aW9uKGxheWVyKSB7XHJcbiAgICAgICAgaWYgKGxheWVyLmZlYXR1cmUucHJvcGVydGllcy5pZCA9PT0gbmV3SWQpIHtcclxuICAgICAgICAgICAgbWFwLnNldFZpZXcobGF5ZXIuZ2V0TGF0TG5nKCksIGxheWVyLmZlYXR1cmUucHJvcGVydGllcy56b29tIHx8IDE0KTtcclxuICAgICAgICAgICAgbGF5ZXIuc2V0SWNvbihMLm1hcGJveC5tYXJrZXIuaWNvbih7XHJcbiAgICAgICAgICAgICAgICAnbWFya2VyLWNvbG9yJzogJyNhOGYnXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsYXllci5zZXRJY29uKEwubWFwYm94Lm1hcmtlci5pY29uKHtcclxuICAgICAgICAgICAgICAgICdtYXJrZXItY29sb3InOiAnIzQwNDA0MCdcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gaGlnaGxpZ2h0IHRoZSBjdXJyZW50IHNlY3Rpb25cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VjdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzZWN0aW9uc1tpXS5jbGFzc05hbWUgPSBzZWN0aW9uc1tpXS5pZCA9PT0gbmV3SWQgPyAnYWN0aXZlJyA6ICcnO1xyXG4gICAgfVxyXG4gICAgLy8gQW5kIHRoZW4gc2V0IHRoZSBuZXcgaWQgYXMgdGhlIGN1cnJlbnQgb25lLFxyXG4gICAgLy8gc28gdGhhdCB3ZSBrbm93IHRvIGRvIG5vdGhpbmcgYXQgdGhlIGJlZ2lubmluZ1xyXG4gICAgLy8gb2YgdGhpcyBmdW5jdGlvbiBpZiBpdCBoYXNuJ3QgY2hhbmdlZCBiZXR3ZWVuIGNhbGxzXHJcbiAgICBjdXJyZW50SWQgPSBuZXdJZDtcclxufVxyXG5cclxuLy8gSWYgeW91IHdlcmUgdG8gZG8gdGhpcyBmb3IgcmVhbCwgeW91IHdvdWxkIHdhbnQgdG8gdXNlXHJcbi8vIHNvbWV0aGluZyBsaWtlIHVuZGVyc2NvcmUncyBfLmRlYm91bmNlIGZ1bmN0aW9uIHRvIHByZXZlbnQgdGhpc1xyXG4vLyBjYWxsIGZyb20gZmlyaW5nIGNvbnN0YW50bHkuXHJcblxyXG5cclxudmFyIHBhbkRlYm91bmNlID0gZGVib3VuY2UoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbmFycmF0aXZlSGVpZ2h0ID0gJG5hcnJhdGl2ZS5oZWlnaHQoKTtcclxuICAgIHZhciBuZXdJZCA9IGN1cnJlbnRJZDtcclxuXHJcbiAgICAvLyBGaW5kIHRoZSBzZWN0aW9uIHRoYXQncyBjdXJyZW50bHkgc2Nyb2xsZWQtdG8uXHJcbiAgICAvLyBXZSBpdGVyYXRlIGJhY2t3YXJkcyBoZXJlIHNvIHRoYXQgd2UgZmluZCB0aGUgdG9wbW9zdCBvbmUuXHJcbiAgICBmb3IgKHZhciBpID0gc2VjdGlvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICB2YXIgcmVjdCA9IHNlY3Rpb25zW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGlmIChyZWN0LnRvcCA+PSAwICYmIHJlY3QudG9wIDw9IG5hcnJhdGl2ZUhlaWdodCkge1xyXG4gICAgICAgICAgICBuZXdJZCA9IHNlY3Rpb25zW2ldLmlkO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBzZXRJZChuZXdJZCk7XHJcbn0sIDE1MCk7XHJcblxyXG5cclxuJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuXHJcbnBhbkRlYm91bmNlKCk7XHJcblxyXG59KTsgLy8gZW5kIHdpbmRvdyBzY3JvbGxcclxuXHJcblxyXG4vLyBoaWdobGlnaHQgbWFya2VyIGFuZCBjb3JyZXNwb25kaW5nIHBhbmVsIG9uIGNsaWNrXHJcblxyXG5wbGFjZXNMYXllci5lYWNoTGF5ZXIoZnVuY3Rpb24obGF5ZXIpIHtcclxuICAgIGxheWVyLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNldElkKHRoaXMuZmVhdHVyZS5wcm9wZXJ0aWVzLmlkKTtcclxuICAgICAgICB2YXIgJGxpc3RJdGVtID0gJCgnLmFjdGl2ZScpO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAkbGlzdEl0ZW0ub2Zmc2V0KCkudG9wIC0gNTBcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcblxyXG5cclxufSk7IC8vIGVuZCBnZW9qc29uIGFqYXggY2FsbFxyXG5cclxuXHJcblxyXG59IC8vIGVuZCBtb2R1bGUgZXhwb3J0XHJcblxyXG5cclxuXHJcbn0pKCkgLy8gZW5kIGFub255bW91cyBmdW5jdGlvbiB3cmFwcGVyIiwiKGZ1bmN0aW9uKCkge1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHJcbnZhciAkbmF2VG9nZ2xlID0gJCgnLm1lbnVfX2xpbmstLW5hdicpO1xyXG52YXIgJG5hdiA9ICQoJy5uYXYnKTtcclxuXHJcbiRuYXZUb2dnbGUub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICAkbmF2Lmhhc0NsYXNzKCduYXYtLWFjdGl2ZScpID8gJG5hdi5yZW1vdmVDbGFzcygnbmF2LS1hY3RpdmUnKSA6ICRuYXYuYWRkQ2xhc3MoJ25hdi0tYWN0aXZlJyk7XHJcblxyXG59KTtcclxuXHJcblxyXG59XHJcblxyXG59KSgpIl19

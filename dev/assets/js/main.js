(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\wamp\\www\\lab\\map_scrollpan\\src\\assets\\js\\main.js":[function(require,module,exports){
var menu = require('./menu.js');

    menu();


var $aboutToggle = $('.menu__link--about');
var $aboutPage = $('.about-page');


$aboutToggle.on('click', function(e) {

  console.log(1);

  $aboutPage.hasClass('active') ? $aboutPage.removeClass('active') : $aboutPage.addClass('active')

});


$(function(){




  // Bind an event to window.onhashchange that, when the hash changes, gets the
  // hash and adds the class "selected" to any matching nav link.
  $(window).on('hashchange', function(){







  }).trigger('hashchange');
  
  // Since the event is only triggered when the hash changes, we need to trigger
  // the event now, to handle the hash the page may have loaded with.

  
});

L.mapbox.accessToken = 'pk.eyJ1IjoiYW9zaWthIiwiYSI6IjQzRGIxeEkifQ.7OvmyBbXwwt9Qxjlh9Qd3w';
// In this case, we just hardcode data into the file. This could be dynamic.
// The important part about this data is that the 'id' property matches
// the HTML above - that's how we figure out how to link up the
// map and the data.
var places = { type: 'FeatureCollection', features: [
{ geometry: { type: "Point", coordinates: [-0.12960000, 51.50110000] },
  properties: { id: "cover", zoom: 9 }, type: 'Feature' },
{ geometry: { type: "Point", coordinates: [-0.15591514, 51.51830379] },
  properties: { id: "baker" }, type: 'Feature' },
{ geometry: { type: "Point", coordinates: [-0.07571203, 51.51424049] },
  properties: { id: "aldgate" }, type: 'Feature' },
{ geometry: { type: "Point", coordinates: [-0.08533793, 51.50438536] },
  properties: { id: "london-bridge" }, type: 'Feature' },
{ geometry: { type: "Point", coordinates: [0.05991101, 51.48752939] },
  properties: { id: "woolwich" }, type: 'Feature' },
{ geometry: { type: "Point", coordinates: [-0.18335806, 51.49439521] },
  properties: { id: "gloucester" }, type: 'Feature' },
{ geometry: { type: "Point", coordinates: [-0.19684993, 51.5033856] },
  properties: { id: "caulfield-gardens" }, type: 'Feature' },
{ geometry: { type: "Point", coordinates: [-0.10669358, 51.51433123] },
  properties: { id: "telegraph" }, type: 'Feature' },
{ geometry: { type: "Point", coordinates: [-0.12416858, 51.50779757] },
  properties: { id: "charing-cross" }, type: 'Feature' }
]};

var map = L.mapbox.map('map', 'mapbox.streets', {
    zoomControl: false
});
map.scrollWheelZoom.disable();

var placesLayer = L.mapbox.featureLayer(places)
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

$(window).on('scroll', function() {


    // var narrativeHeight = narrative.offsetHeight;    

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

});
},{"./menu.js":"C:\\wamp\\www\\lab\\map_scrollpan\\src\\assets\\js\\menu.js"}],"C:\\wamp\\www\\lab\\map_scrollpan\\src\\assets\\js\\menu.js":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL2pzL21haW4uanMiLCJzcmMvYXNzZXRzL2pzL21lbnUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIG1lbnUgPSByZXF1aXJlKCcuL21lbnUuanMnKTtcclxuXHJcbiAgICBtZW51KCk7XHJcblxyXG5cclxudmFyICRhYm91dFRvZ2dsZSA9ICQoJy5tZW51X19saW5rLS1hYm91dCcpO1xyXG52YXIgJGFib3V0UGFnZSA9ICQoJy5hYm91dC1wYWdlJyk7XHJcblxyXG5cclxuJGFib3V0VG9nZ2xlLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgY29uc29sZS5sb2coMSk7XHJcblxyXG4gICRhYm91dFBhZ2UuaGFzQ2xhc3MoJ2FjdGl2ZScpID8gJGFib3V0UGFnZS5yZW1vdmVDbGFzcygnYWN0aXZlJykgOiAkYWJvdXRQYWdlLmFkZENsYXNzKCdhY3RpdmUnKVxyXG5cclxufSk7XHJcblxyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cclxuXHJcblxyXG5cclxuICAvLyBCaW5kIGFuIGV2ZW50IHRvIHdpbmRvdy5vbmhhc2hjaGFuZ2UgdGhhdCwgd2hlbiB0aGUgaGFzaCBjaGFuZ2VzLCBnZXRzIHRoZVxyXG4gIC8vIGhhc2ggYW5kIGFkZHMgdGhlIGNsYXNzIFwic2VsZWN0ZWRcIiB0byBhbnkgbWF0Y2hpbmcgbmF2IGxpbmsuXHJcbiAgJCh3aW5kb3cpLm9uKCdoYXNoY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgfSkudHJpZ2dlcignaGFzaGNoYW5nZScpO1xyXG4gIFxyXG4gIC8vIFNpbmNlIHRoZSBldmVudCBpcyBvbmx5IHRyaWdnZXJlZCB3aGVuIHRoZSBoYXNoIGNoYW5nZXMsIHdlIG5lZWQgdG8gdHJpZ2dlclxyXG4gIC8vIHRoZSBldmVudCBub3csIHRvIGhhbmRsZSB0aGUgaGFzaCB0aGUgcGFnZSBtYXkgaGF2ZSBsb2FkZWQgd2l0aC5cclxuXHJcbiAgXHJcbn0pO1xyXG5cclxuTC5tYXBib3guYWNjZXNzVG9rZW4gPSAncGsuZXlKMUlqb2lZVzl6YVd0aElpd2lZU0k2SWpRelJHSXhlRWtpZlEuN092bXlCYlh3d3Q5UXhqbGg5UWQzdyc7XHJcbi8vIEluIHRoaXMgY2FzZSwgd2UganVzdCBoYXJkY29kZSBkYXRhIGludG8gdGhlIGZpbGUuIFRoaXMgY291bGQgYmUgZHluYW1pYy5cclxuLy8gVGhlIGltcG9ydGFudCBwYXJ0IGFib3V0IHRoaXMgZGF0YSBpcyB0aGF0IHRoZSAnaWQnIHByb3BlcnR5IG1hdGNoZXNcclxuLy8gdGhlIEhUTUwgYWJvdmUgLSB0aGF0J3MgaG93IHdlIGZpZ3VyZSBvdXQgaG93IHRvIGxpbmsgdXAgdGhlXHJcbi8vIG1hcCBhbmQgdGhlIGRhdGEuXHJcbnZhciBwbGFjZXMgPSB7IHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsIGZlYXR1cmVzOiBbXHJcbnsgZ2VvbWV0cnk6IHsgdHlwZTogXCJQb2ludFwiLCBjb29yZGluYXRlczogWy0wLjEyOTYwMDAwLCA1MS41MDExMDAwMF0gfSxcclxuICBwcm9wZXJ0aWVzOiB7IGlkOiBcImNvdmVyXCIsIHpvb206IDkgfSwgdHlwZTogJ0ZlYXR1cmUnIH0sXHJcbnsgZ2VvbWV0cnk6IHsgdHlwZTogXCJQb2ludFwiLCBjb29yZGluYXRlczogWy0wLjE1NTkxNTE0LCA1MS41MTgzMDM3OV0gfSxcclxuICBwcm9wZXJ0aWVzOiB7IGlkOiBcImJha2VyXCIgfSwgdHlwZTogJ0ZlYXR1cmUnIH0sXHJcbnsgZ2VvbWV0cnk6IHsgdHlwZTogXCJQb2ludFwiLCBjb29yZGluYXRlczogWy0wLjA3NTcxMjAzLCA1MS41MTQyNDA0OV0gfSxcclxuICBwcm9wZXJ0aWVzOiB7IGlkOiBcImFsZGdhdGVcIiB9LCB0eXBlOiAnRmVhdHVyZScgfSxcclxueyBnZW9tZXRyeTogeyB0eXBlOiBcIlBvaW50XCIsIGNvb3JkaW5hdGVzOiBbLTAuMDg1MzM3OTMsIDUxLjUwNDM4NTM2XSB9LFxyXG4gIHByb3BlcnRpZXM6IHsgaWQ6IFwibG9uZG9uLWJyaWRnZVwiIH0sIHR5cGU6ICdGZWF0dXJlJyB9LFxyXG57IGdlb21ldHJ5OiB7IHR5cGU6IFwiUG9pbnRcIiwgY29vcmRpbmF0ZXM6IFswLjA1OTkxMTAxLCA1MS40ODc1MjkzOV0gfSxcclxuICBwcm9wZXJ0aWVzOiB7IGlkOiBcIndvb2x3aWNoXCIgfSwgdHlwZTogJ0ZlYXR1cmUnIH0sXHJcbnsgZ2VvbWV0cnk6IHsgdHlwZTogXCJQb2ludFwiLCBjb29yZGluYXRlczogWy0wLjE4MzM1ODA2LCA1MS40OTQzOTUyMV0gfSxcclxuICBwcm9wZXJ0aWVzOiB7IGlkOiBcImdsb3VjZXN0ZXJcIiB9LCB0eXBlOiAnRmVhdHVyZScgfSxcclxueyBnZW9tZXRyeTogeyB0eXBlOiBcIlBvaW50XCIsIGNvb3JkaW5hdGVzOiBbLTAuMTk2ODQ5OTMsIDUxLjUwMzM4NTZdIH0sXHJcbiAgcHJvcGVydGllczogeyBpZDogXCJjYXVsZmllbGQtZ2FyZGVuc1wiIH0sIHR5cGU6ICdGZWF0dXJlJyB9LFxyXG57IGdlb21ldHJ5OiB7IHR5cGU6IFwiUG9pbnRcIiwgY29vcmRpbmF0ZXM6IFstMC4xMDY2OTM1OCwgNTEuNTE0MzMxMjNdIH0sXHJcbiAgcHJvcGVydGllczogeyBpZDogXCJ0ZWxlZ3JhcGhcIiB9LCB0eXBlOiAnRmVhdHVyZScgfSxcclxueyBnZW9tZXRyeTogeyB0eXBlOiBcIlBvaW50XCIsIGNvb3JkaW5hdGVzOiBbLTAuMTI0MTY4NTgsIDUxLjUwNzc5NzU3XSB9LFxyXG4gIHByb3BlcnRpZXM6IHsgaWQ6IFwiY2hhcmluZy1jcm9zc1wiIH0sIHR5cGU6ICdGZWF0dXJlJyB9XHJcbl19O1xyXG5cclxudmFyIG1hcCA9IEwubWFwYm94Lm1hcCgnbWFwJywgJ21hcGJveC5zdHJlZXRzJywge1xyXG4gICAgem9vbUNvbnRyb2w6IGZhbHNlXHJcbn0pO1xyXG5tYXAuc2Nyb2xsV2hlZWxab29tLmRpc2FibGUoKTtcclxuXHJcbnZhciBwbGFjZXNMYXllciA9IEwubWFwYm94LmZlYXR1cmVMYXllcihwbGFjZXMpXHJcbiAgICAuYWRkVG8obWFwKTtcclxuXHJcbi8vIEFoZWFkIG9mIHRpbWUsIHNlbGVjdCB0aGUgZWxlbWVudHMgd2UnbGwgbmVlZCAtXHJcbi8vIHRoZSBuYXJyYXRpdmUgY29udGFpbmVyIGFuZCB0aGUgaW5kaXZpZHVhbCBzZWN0aW9uc1xyXG52YXIgJG5hcnJhdGl2ZSA9ICQoJyNuYXJyYXRpdmUnKVxyXG52YXIgc2VjdGlvbnMgPSBuYXJyYXRpdmUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NlY3Rpb24nKTtcclxudmFyIGN1cnJlbnRJZCA9ICcnO1xyXG5cclxuc2V0SWQoJ2NvdmVyJyk7XHJcblxyXG5mdW5jdGlvbiBzZXRJZChuZXdJZCkge1xyXG4gICAgLy8gSWYgdGhlIElEIGhhc24ndCBhY3R1YWxseSBjaGFuZ2VkLCBkb24ndCBkbyBhbnl0aGluZ1xyXG4gICAgaWYgKG5ld0lkID09PSBjdXJyZW50SWQpIHJldHVybjtcclxuICAgIC8vIE90aGVyd2lzZSwgaXRlcmF0ZSB0aHJvdWdoIGxheWVycywgc2V0dGluZyB0aGUgY3VycmVudFxyXG4gICAgLy8gbWFya2VyIHRvIGEgZGlmZmVyZW50IGNvbG9yIGFuZCB6b29taW5nIHRvIGl0LlxyXG4gICAgcGxhY2VzTGF5ZXIuZWFjaExheWVyKGZ1bmN0aW9uKGxheWVyKSB7XHJcbiAgICAgICAgaWYgKGxheWVyLmZlYXR1cmUucHJvcGVydGllcy5pZCA9PT0gbmV3SWQpIHtcclxuICAgICAgICAgICAgbWFwLnNldFZpZXcobGF5ZXIuZ2V0TGF0TG5nKCksIGxheWVyLmZlYXR1cmUucHJvcGVydGllcy56b29tIHx8IDE0KTtcclxuICAgICAgICAgICAgbGF5ZXIuc2V0SWNvbihMLm1hcGJveC5tYXJrZXIuaWNvbih7XHJcbiAgICAgICAgICAgICAgICAnbWFya2VyLWNvbG9yJzogJyNhOGYnXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsYXllci5zZXRJY29uKEwubWFwYm94Lm1hcmtlci5pY29uKHtcclxuICAgICAgICAgICAgICAgICdtYXJrZXItY29sb3InOiAnIzQwNDA0MCdcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gaGlnaGxpZ2h0IHRoZSBjdXJyZW50IHNlY3Rpb25cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VjdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzZWN0aW9uc1tpXS5jbGFzc05hbWUgPSBzZWN0aW9uc1tpXS5pZCA9PT0gbmV3SWQgPyAnYWN0aXZlJyA6ICcnO1xyXG4gICAgfVxyXG4gICAgLy8gQW5kIHRoZW4gc2V0IHRoZSBuZXcgaWQgYXMgdGhlIGN1cnJlbnQgb25lLFxyXG4gICAgLy8gc28gdGhhdCB3ZSBrbm93IHRvIGRvIG5vdGhpbmcgYXQgdGhlIGJlZ2lubmluZ1xyXG4gICAgLy8gb2YgdGhpcyBmdW5jdGlvbiBpZiBpdCBoYXNuJ3QgY2hhbmdlZCBiZXR3ZWVuIGNhbGxzXHJcbiAgICBjdXJyZW50SWQgPSBuZXdJZDtcclxufVxyXG5cclxuLy8gSWYgeW91IHdlcmUgdG8gZG8gdGhpcyBmb3IgcmVhbCwgeW91IHdvdWxkIHdhbnQgdG8gdXNlXHJcbi8vIHNvbWV0aGluZyBsaWtlIHVuZGVyc2NvcmUncyBfLmRlYm91bmNlIGZ1bmN0aW9uIHRvIHByZXZlbnQgdGhpc1xyXG4vLyBjYWxsIGZyb20gZmlyaW5nIGNvbnN0YW50bHkuXHJcblxyXG4kKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcbiAgICAvLyB2YXIgbmFycmF0aXZlSGVpZ2h0ID0gbmFycmF0aXZlLm9mZnNldEhlaWdodDsgICAgXHJcblxyXG4gICAgdmFyIG5hcnJhdGl2ZUhlaWdodCA9ICRuYXJyYXRpdmUuaGVpZ2h0KCk7XHJcbiAgICB2YXIgbmV3SWQgPSBjdXJyZW50SWQ7XHJcblxyXG5cclxuXHJcbiAgICAvLyBGaW5kIHRoZSBzZWN0aW9uIHRoYXQncyBjdXJyZW50bHkgc2Nyb2xsZWQtdG8uXHJcbiAgICAvLyBXZSBpdGVyYXRlIGJhY2t3YXJkcyBoZXJlIHNvIHRoYXQgd2UgZmluZCB0aGUgdG9wbW9zdCBvbmUuXHJcbiAgICBmb3IgKHZhciBpID0gc2VjdGlvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICB2YXIgcmVjdCA9IHNlY3Rpb25zW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGlmIChyZWN0LnRvcCA+PSAwICYmIHJlY3QudG9wIDw9IG5hcnJhdGl2ZUhlaWdodCkge1xyXG4gICAgICAgICAgICBuZXdJZCA9IHNlY3Rpb25zW2ldLmlkO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBzZXRJZChuZXdJZCk7XHJcblxyXG59KTsiLCIoZnVuY3Rpb24oKSB7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cclxudmFyICRuYXZUb2dnbGUgPSAkKCcubWVudV9fbGluay0tbmF2Jyk7XHJcbnZhciAkbmF2ID0gJCgnLm5hdicpO1xyXG5cclxuJG5hdlRvZ2dsZS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICRuYXYuaGFzQ2xhc3MoJ25hdi0tYWN0aXZlJykgPyAkbmF2LnJlbW92ZUNsYXNzKCduYXYtLWFjdGl2ZScpIDogJG5hdi5hZGRDbGFzcygnbmF2LS1hY3RpdmUnKTtcclxuXHJcbn0pO1xyXG5cclxuXHJcbn1cclxuXHJcbn0pKCkiXX0=

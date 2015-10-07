var debounce = require('./debounce.js');


module.exports = function() {

L.mapbox.accessToken = 'pk.eyJ1IjoiYW9zaWthIiwiYSI6IjQzRGIxeEkifQ.7OvmyBbXwwt9Qxjlh9Qd3w';
// In this case, we just hardcode data into the file. This could be dynamic.
// The important part about this data is that the 'id' property matches
// the HTML above - that's how we figure out how to link up the
// map and the data.


var map = L.mapbox.map('map', 'mapbox.streets', {
    zoomControl: false
}).setView([40, 10], 5);
map.scrollWheelZoom.disable();
L.control.zoomslider().addTo(map);


var expandMap = require('./mobile.js')
var $expandMap = $('.expand-map');
$expandMap.on('click', function(e) {
  e.preventDefault();
  if ( !$('body').hasClass('expanded') ) {
    $('body').addClass('expanded');
    map.invalidateSize();
  } else {
    $('body').removeClass('expanded');
    map.invalidateSize();
  }
  
})


$.getJSON('assets/data/test.geojson', function(data) {

console.log(data);
var placesLayer = L.mapbox.featureLayer(data)
    .addTo(map);

})


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
        console.log(layer.feature.properties.title.toLowerCase().replace(/\s/g, '-'));
        var markerTitle = layer.feature.properties.title.toLowerCase().replace(/\s/g, '-');
        if (markerTitle === newId) {
            map.setView(layer.getLatLng(), layer.feature.properties.zoom || 5);
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
        if (sections[i].id === newId) {
            $(sections[i]).addClass('active');
        } else {
            $(sections[i]).removeClass('active');
        }
    }
    // And then set the new id as the current one,
    // so that we know to do nothing at the beginning
    // of this function if it hasn't changed between calls
    currentId = newId;
}


$('.nav').on('click', '.nav__link',function(e) {
    e.preventDefault();
    var newId = $(this).attr('data-id');
    console.log(newId);
    setId(newId);

    $('.nav').removeClass('nav--active');

    var $listItem = $('.active');
    $('html, body').animate({
        scrollTop: $listItem.offset().top + 50
    });
    $('body').removeClass('expanded');
    map.invalidateSize();

})


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
        setId(this.feature.properties.title.toLowerCase().replace(/\s/g, '-'));
        var $listItem = $('.active');
        $('html, body').animate({
            scrollTop: $listItem.offset().top - 150
        });
        $('body').removeClass('expanded');
        map.invalidateSize();
    });
});



}).done(getInfo()); // end geojson ajax call



// Ajax call for additional info about each marker
function getInfo() {

    $.getJSON('assets/data/info.json', function(info) {

        var Handlebars = require("hbsfy/runtime");
        Handlebars.registerHelper("safe", function(description) {
          return new Handlebars.SafeString(description);
        });


        var template = require("./template.hbs");
        $list = template(info);
        $('.blocks').append($list);

        var navTemplate = require('./nav.hbs');
        $navList = navTemplate(info);
        $('.nav').append($navList);



    });
}





} // end module export


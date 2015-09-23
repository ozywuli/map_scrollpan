var L = require('mapbox.js');

L.mapbox.accessToken = 'pk.eyJ1IjoiYW9zaWthIiwiYSI6IjQzRGIxeEkifQ.7OvmyBbXwwt9Qxjlh9Qd3w';
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([40, -74.50], 9);
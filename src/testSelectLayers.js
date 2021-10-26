var attribution = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'

var mapnikLayer = L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution: attribution}
)
var blackAndWhite = L.tileLayer(
    'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png',
    {attribution: attribution}
)
var clouds = L.tileLayer('http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
    opacity: 0.5
})

var map = L.map('map', {
    center: new L.LatLng(39.73, -104.99),
    zoom: 10,
    layers: [mapnikLayer, clouds]
})

var baseLayers = {
    'Mapnik': mapnikLayer,
    'Black and Whilte': blackAndWhite
}
var overlayLayers = {
    'Clouds': clouds
}

var control = L.control.selectLayers(baseLayers, overlayLayers)
control.addTo(map)

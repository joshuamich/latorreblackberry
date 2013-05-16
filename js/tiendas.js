/* 
 * Javascript para la sección de tiendas
 */

var buscadorMapa = document.getElementById("buscadorMapa");
var altobuscadorMapa = anchopantalla * 0.9 * 0.09 + "px";
var Mapa = document.getElementById("mapa");
buscadorMapa.style.height = altobuscadorMapa;
Mapa.style.height = anchopantalla * 0.6 + "px";


$(document).ready(function() {
    var mapOptions = {
        center: new google.maps.LatLng(14.604017, -90.51778),
        zoom: 14,
        panControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        zoomControl: false,
        overviewMapControl: false,
        mapTypeControl: false
    };
    var map = new google.maps.Map(document.getElementById("mapa"), mapOptions);


    function crearMarcador(lat, long) {
        var location = new google.maps.LatLng(lat, long);
        var iconoUrl = 'images/pinmap.png';
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: iconoUrl
        });
        return marker;
    }

    function addInfoWindow(marker, message) {
        var infoWindow = new google.maps.InfoWindow({
            content: message
        });
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(map, marker);
            setTimeout(function() {
                infoWindow.close();
            }, 8000);
        });
    }

    var pruebamark = crearMarcador(14.604017, -90.51778);
    var pruebamarkdos = crearMarcador(14.614017, -90.50378);
    addInfoWindow(pruebamark, "hola");
    addInfoWindow(pruebamarkdos, "hola marcador dos");
});
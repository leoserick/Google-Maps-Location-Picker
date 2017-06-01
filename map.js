//Configuramos unas variables
var map; //Contiene el mapa 
var marker = false; ////Tiene la localización del usuario
        
//Esta función inicializa el mapa 
//Se manda llamar cuando la pagina termina de cargar.
function initMap() {

    //Primero definimos donde se va a centrar el mapa en este caso es la ciudad de Gudalajara.
    var centerOfMap = new google.maps.LatLng(20.6737777,-103.4054536);

    //Opciones generales sobre el mapa
    var options = {
      center: centerOfMap, //Centrado
      zoom: 15 //Con un zoom de 15
    };

    //Se crea el objeto mapa
    map = new google.maps.Map(document.getElementById('map'), options);

    //Dejamos un listener para detectar el momento en el que se hace click sobre el mapa 
    google.maps.event.addListener(map, 'click', function(event) {                
        //Obtenemos la ubicación donde el usuario dio click
        var clickedLocation = event.latLng;
        //Si el marcador Rojo aun no esta dado de alta ...
        if(marker === false){
            //Creamos el marcador
            marker = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true //Y lo hacemos que se pueda arrastrar
            });
            //Dejamos un listener para detectar el momento en el que el marcador se "Draggea"
            google.maps.event.addListener(marker, 'dragend', function(event){
                markerLocation();
            });
        } else{
            //Si el marcador ya esta creado solamente cambiamos la ubicación por la mas nueva
            marker.setPosition(clickedLocation);
        }
        //Mandamos llamar la funcion que define la localización he impresión de coordenadas en los inputs
        markerLocation();

    });
    // Inicializamos una VENTANA INFORMATIVO:DESABILITADA 
    var infoWindow = new google.maps.InfoWindow({map: map});

        // Eventamos el mensaje para utilizar su ubicación actual .
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            //VENTANA INFORMATIVA Descomentar las tres lineas para ver un mensaje arriba de la impresión del picker 
            //infoWindow.setPosition(pos);
            // infoWindow.setContent('<p>Está es tu ubicación actual.<br>Cierra esta ventana y da click sobre la <br> ubicación para definir la ubicación</p>');
            map.setCenter(pos);
            //Si el marcador Rojo aun no esta dado de alta ...
            if(marker === false){
                //Creamos el marcador
                marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    draggable: true //Y lo hacemos que se pueda arrastrar
                });
                //Dejamos un listener para detectar el momento en el que el marcador se "Draggea"
                google.maps.event.addListener(marker, 'dragend', function(event){
                    markerLocation();
                });
            } else{
                //Si el marcador ya esta creado solamente cambiamos la ubicación por la mas nueva
                marker.setPosition(pos);
            }
            //Mandamos llamar la funcion que define la localización he impresión de coordenadas en los inputs
            markerLocation();
            //Aqui se termina el IF para verificar el map maker
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Si el navegador no soprta la geolocalización
          handleLocationError(false, infoWindow, map.getCenter());
        }
      
}
//Esta función actualiza la ubicación mas reciente obtenida y actualiza en los inputs el lat/long
function markerLocation(){
    //Actualiza la ubiacación del marker 
    var currentLocation = marker.getPosition();
    //Agrega los datos al HTML 
    document.getElementById('lat').value = currentLocation.lat(); //latitude
    document.getElementById('lng').value = currentLocation.lng(); //longitude
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: No has aceptado la geolocalización automatica.' :
      'Error: Tu navegador no soporta la geolización.');
}
        
        
//Carga el mapa cuando la pagina se termina de cargar
google.maps.event.addDomListener(window, 'load', initMap);
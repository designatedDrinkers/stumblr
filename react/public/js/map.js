function initMap() {
  window.mapAccess = {
    directionsService: new google.maps.DirectionsService,
    directionsDisplay: new google.maps.DirectionsRenderer
  };
}

function showEntireRoute(pos, service, display, waypts) {
  $('.map-container').removeClass('hide');
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: { lat: 39, lng: -105 }
  });
  display.setMap(map);
  map.setCenter(pos);

  service.route({
    origin: pos,
    destination: pos,
    travelMode: google.maps.TravelMode.WALKING,
    waypoints: waypts,
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      display.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function handleLocationError(hasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(hasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}

function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
console.log(document.getElementById('map'));
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: 39, lng: -105}
  });
  directionsDisplay.setMap(map);

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
      calculateAndDisplayRoute(pos, directionsService, directionsDisplay);
    }, function() {
      handleLocationError(true, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
  }
}

function calculateAndDisplayRoute(pos, directionsService, directionsDisplay) {
  $.get('/api/maps/route?barcount=8&location=' + [pos.lat, pos.lng].join(',')).done(function(data) {
    var waypts = data.bars.map(function(bar) {
      return {
        location: new google.maps.LatLng(bar.geometry.location.lat, bar.geometry.location.lng)
      };
    });

    directionsService.route({
      origin: pos,
      destination: pos,
      travelMode: google.maps.TravelMode.WALKING,
      waypoints: waypts,
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

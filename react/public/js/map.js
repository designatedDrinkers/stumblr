function initMap() {
  window.mapAccess = {
    directionsService: new google.maps.DirectionsService,
    directionsDisplay: new google.maps.DirectionsRenderer
  };
}

function renderRoute(barcount, start) {
  if (start) {
    $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + start).done(function(results) {
      if (results.results.length == 0) {
        // handleLocationError(false, window.mapAccess.map.getCenter());
        console.log(results);
      } else {
        var pos = {
          lat: results.results[0].geometry.location.lat,
          lng: results.results[0].geometry.location.lng
        };
        makeRouteFrom(pos, barcount);
      }
    }).fail(function() {
      // handleLocationError(false, window.mapAccess.map.getCenter());
    });
  } else if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      makeRouteFrom(pos, barcount);
    }, function() {
      // handleLocationError(true, window.mapAccess.map.getCenter());
    });
  } else {
    // handleLocationError(false, window.mapAccess.map.getCenter());
  }
}

function makeRouteFrom(pos, barcount) {
  var url = [
    '/api/maps/route?barcount=', (barcount || 3), '&location=',
    [pos.lat, pos.lng].join(',')
  ].join('');
  $.get(url).done(function(data) {
    console.log('pass');
    var waypts = data.bars.map(function(bar) {
      return {
        location: new google.maps.LatLng(bar.geometry.location.lat, bar.geometry.location.lng)
      };
    });
    showEntireRoute(pos, window.mapAccess.directionsService, window.mapAccess.directionsDisplay, waypts);
  }).fail(console.log);
}

function showEntireRoute(pos, service, display, waypts) {
  console.log(pos);
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

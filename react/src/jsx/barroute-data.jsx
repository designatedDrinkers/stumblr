import ajax from 'ajax-promise';
import statemachine from './statemachine';

module.exports = function(barcount, start) {
  console.log(barcount, start);
  if (start) {
    return ajax.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + start)
    .then(posFromAddress).then(getBars(barcount));
  } else if (window.navigator.geolocation) {
    return new Promise(function(resolve, reject) {
      window.navigator.geolocation.getCurrentPosition(resolve, reject)
    }).then(posFromNavigator).then(getBars(barcount));
  } else {
    return Promise.reject('Unable to get starting location');
  }
};
module.exports.recreate = makeRouteFrom();

function posFromAddress(results) {
  if (results.results.length == 0) return Promise.reject('Address Not Found');
  else return Promise.resolve({
    lat: results.results[0].geometry.location.lat,
    lng: results.results[0].geometry.location.lng
  });
}

function posFromNavigator(results) {
  return Promise.resolve({
    lat: results.coords.latitude,
    lng: results.coords.longitude
  });
}

function getBars(barcount) {
  return function(pos) {
    var url = [
      '/api/maps/route?barcount=', (barcount || 3), '&location=',
      [pos.lat, pos.lng].join(',')
    ].join('');
    return ajax.get(url).then(makeRouteFrom(pos));
  };
}

function makeRouteFrom(pos) {
  return function(data) {
    var waypts = data.bars.map(function(bar) {
      return {
        location: new google.maps.LatLng(bar.geometry.location.lat, bar.geometry.location.lng)
      };
    });
    if (pos) {
      statemachine.updateState('newBarRoute', data.bars);
    } else {
      pos = waypts.shift();
    }
    window.showEntireRoute(pos, window.mapAccess.directionsService, window.mapAccess.directionsDisplay, waypts);
  };
}

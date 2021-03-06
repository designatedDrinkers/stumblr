var route = require('express').Router();
var unirest = require('unirest');

module.exports = route;

route.get('/', function(request, response, next) {
  var query = request._parsedUrl.query;
  if (query) {
    query +=  '&key=' + process.env.GOOGLE_API_KEY
    unirest.get('https://maps.googleapis.com/maps/api/directions/json?' + query).end(function(data) {
      response.json(data);
    });
  } else {
    response.json({ success: false, message: 'please include a query string in your request' });
  }
});

route.get('/route', function(request, response, next) {
  var additives = { rankby: 'distance', keyword: 'bar', key: process.env.GOOGLE_API_KEY };
  var query = combine(request.query, additives);
  var barcount = query.barcount;
  delete query.barcount;
  unirest.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json' + stringify(query))
  .end(function(data) {
    var bars = slice(data.body.results, barcount);
    bars = sortBars(bars);
    response.json({ bars: bars, data: data });
  });
});

function stringify(query) {
  var array = Object.keys(query).map(function(key) {
    return [key, query[key]].join('=');
  });
  return '?' + array.join('&');
}

function combine(obj1, obj2) {
  var newObject = Object.keys(obj1).reduce(function(obj, key) {
    obj[key] = obj1[key];
    return obj;
  }, {});
  Object.keys(obj2).reduce(function(obj, key) {
    obj[key] = obj2[key];
    return obj;
  }, newObject);
  return newObject;
}

function sortBars(bars) {
  var sortedBars = bars.slice();
  var first = [], last = [];
  sortedBars.forEach(function(bar, i) {
    if (i % 2) last.unshift(bar);
    else first.push(bar);
  });
  return first.concat(last);
}

function slice(bars, barcount) {
  var sansLiquorStores = bars.slice();
  for (var i = 0; i < sansLiquorStores.length;) {
    var bar = sansLiquorStores[i];
    if (sansLiquorStores.length > barcount && (bar.types.indexOf('liquor_store') >= 0)) {
      sansLiquorStores.splice(i, 1);
    } else {
      i++;
    }
  }
  return sansLiquorStores.slice(0, barcount);
}

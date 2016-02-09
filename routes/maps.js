var route = require('express').Router();
var unirest = require('unirest');

module.exports = route;

route.get('/', function(request, response, next) {
  var query = request._parsedUrl.query;
  if (query) {
    query +=  '&key=' + process.env.GOOGLE_API_KEY
    unirest.get('https://maps.googleapis.com/maps/api/directions/json?' + query).end(function(data) {
      console.log(data);
      response.json(data);
    });
  } else {
    response.json({ success: false, message: 'please include a query string in your request' });
  }
});

//

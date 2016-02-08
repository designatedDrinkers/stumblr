var route = require('express').Router();

module.exports = route;

route.get('/current-user', function(request, response){
  response.json(request.user || {});
});

var route = require('express').Router();
var mongo = require('../services/db');
module.exports = route;

route.get('/me', function(request, response, next) {
  response.json({ user: request.user });
});

route.get('/users', function(request, response, next) {
  mongo.connect().then(function(db) {
    db.collection('users').find({}).toArray(function(err, rows) {
      response.json({ users: rows });
    });
  }).catch(next);
});

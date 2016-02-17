var route = require('express').Router();
var unirest = require('unirest');
var nodeTwitter = require('node-twitter');
var mongo = require('../services/db');
require('dotenv').load();

module.exports = route;

route.post('/checkin', function(request, response, next){
  var barIndex = request.body.bar_index;
  var routeIndex = request.body.route_index;
  var twitterRestClient = new nodeTwitter.RestClient(
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    request.user.twitter_token,
    request.user.twitter_secret
  );
  if(request.user){
    mongo.connect().then(function(db) {
      db.collection('users').findOne({ twitter_id: request.user.twitter_id }, function(err, user)  {
        db.close();
        if(err){
          response.json({message: error});
        }else{
          // var currentBar = user.routes[routeIndex].bars[barIndex].name;
          var message = request.body.message;
          twitterRestClient.statusesUpdate(
            {
              'status': message
            },
            function(error, result){
              if(error){
                response.json({error: error});
              }
              if(result){
                response.json({result: result});
              }
            }
          );
        }
      });
    });
  }else{
    response.json({message: 'You must be logged in'});
  }
});

var route = require('express').Router();
var unirest = require('unirest');
var Twitter = require('twitter');
var nodeTwitter = require('node-twitter');
require('dotenv').load();

module.exports = route;

route.post('/checkin', function(request, response, next){
  console.log('here');
  console.log(request.user);
  var twitterRestClient = new nodeTwitter.RestClient(
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    request.user.twitter_token,
    request.user.twitter_secret
  );
  twitterRestClient.statusesUpdate(
    {
      'status': 'I just checked in to a bar on my stumblr'
    },
    function(error, result){
      if(error){
        console.log(error);
        response.json({error: error});
      }
      if(result){
        console.log(result);
        response.json({result: result});
      }
    }
  );
});

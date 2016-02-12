var route = require('express').Router();
var mongo = require('../services/db');

module.exports = route;

route.get('/current-user', function(request, response){
  if (request.user) {
    mongo.connect().then(function(db) {
      db.collection('users').findOne({ twitter_id: request.user.twitter_id }, function(err, data) {
        db.close();
        if (err) {
          return response.json({ err: err });
        }
        response.json({
          _id: data._id,
          twitter_id: data.twitter_id,
          twitter_image: data.twitter_image,
          twitter_name: data.twitter_name,
          auto_tweet: data.auto_tweet === undefined ? null : data.auto_tweet
        });
      });
    }).catch(function(err) {
      response.json({ err: err });
    });
  } else {
    response.json({});
  }
});

route.put('/', function(request, response) {
  var autoTweet;
  if (!request.user) {
    return response.json({ success: false });
  } else if (request.body.auto_tweet === null || request.body.auto_tweet === 'null') {
    autoTweet = null;
  } else if (request.body.auto_tweet === true || request.body.auto_tweet === 'true') {
    autoTweet = true;
  } else if (request.body.auto_tweet === false || request.body.auto_tweet === 'false') {
    autoTweet = false;
  } else {
    return response.json({ success: false });
  }
  mongo.connect().then(function(db) {
    db.collection('users').updateOne({ twitter_id: request.user.twitter_id }, { $set: { auto_tweet: autoTweet } }, function(err, data) {
      db.close();
      if (err) {
        return response.json({ success: false });
      }
      response.json({ success: true });
    });
  }).catch(function(err) {
    response.json({ err: err });
  });
});

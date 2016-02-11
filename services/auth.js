var route = require('express').Router();
var session = require('express-session');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var mongo = require('./db');
var Promise = require('promise');

module.exports = route;

route.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
route.use(passport.initialize());
route.use(passport.session());
passport.serializeUser(function(user, done){
  done(null, user);
});
passport.deserializeUser(function(obj, done){
  done(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    console.log(profile);
    findOrCreate(profile, token, tokenSecret).then(function(user) {
      cb(null, user);
    }).catch(cb);
  }
));

route.get('/auth/twitter',
  passport.authenticate('twitter'));

route.get('/auth/twitter/callback',
  passport.authenticate('twitter'),
  function(request, response) {
    response.redirect('/');
  });

route.get('/auth/logout', function(request, response, next){
  request.logout();
  response.redirect('/');
})

function findOrCreate(profile, token, tokenSecret) {
  return mongo.connect().then(function(db) {
    return new Promise(function(resolve, reject) {
      db.collection('users').findOne({ twitter_id: profile.id }, function(err, user) {
        if (err) {
          db.close();
          return reject(err);
        } else if (user) {
          return resolve(updateUser(user, profile, token, db, tokenSecret));
        } else {
          return resolve(createUser(profile, token, db, tokenSecret));
        }
      });
    });

  });
}

function createUser(profile, token, db, tokenSecret) {
  return new Promise(function(resolve, reject) {
    var newUser = {
      twitter_id: profile.id,
      twitter_image: profile._json.profile_image_url,
      twitter_name: profile.displayName,
      twitter_token: token,
      twitter_secret: tokenSecret
    };
    db.collection('users').insert(newUser, function(err, data) {
      if (err) {
        db.close();
        return reject(err);
      } else {
        db.close();
        return resolve(newUser);
      }
    });
  });
}

function updateUser(user, profile, token, db, tokenSecret) {
  return new Promise(function(resolve, reject) {
    var updatedUser = {
      twitter_id: profile.id,
      twitter_image: profile._json.profile_image_url,
      twitter_name: profile.displayName,
      twitter_token: token,
      twitter_secret: tokenSecret
    };
    var find = { _id: mongo.ObjectId(user._id) }
    db.collection('users').updateOne(find, { $set: updatedUser }, function(err, data) {
      if (err) {
        db.close();
        return reject(err);
      } else {
        db.close();
        return resolve(updatedUser);
      }
    });
  });
}

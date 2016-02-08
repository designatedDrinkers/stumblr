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
    findOrCreate(profile, token).then(function(user) {
      cb(null, user);
    }).catch(cb);
  }
));

route.get('/auth/twitter',
  passport.authenticate('twitter'));

route.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

function findOrCreate(profile, token) {
  return mongo.connect().then(function(db) {
    db.collection('users').findOne({ twitter_id: profile.id }, function(err, user) {
      if (err) {
        db.close();
        return Promise.reject(err);
      } else if (user) {
        return updateUser(user, profile, token, db);
      } else {
        return createUser(profile, token, db);
      }
    });
  });
}

function createUser(profile, token, db) {
  return new Promise(function(resolve, reject) {
    var newUser = {
      twitter_id: profile.id,
      twitter_image: profile.profile_image_url,
      twitter_name: twitter_name,
      twitter_token: token
    };
    db.collection('users').insert(newUser, function(err, data) {
      if (err) {
        db.close();
        return Promise.reject(err);
      } else {
        db.close();
        return Promise.resolve(newUser);
      }
    });
  });
}

function updateUser(user, profile, token, db) {
  return new Promise(function(resolve, reject) {
    var updateUser = {
      twitter_id: profile.id,
      twitter_image: profile.profile_image_url,
      twitter_name: twitter_name,
      twitter_token: token
    };
    var find = { _id: mongo.ObjectId(user._id) }
    db.collection('users').updateOne(find, { $set: updatedUser }, function(err, data) {
      if (err) {
        db.close();
        return Promise.reject(err);
      } else {
        db.close();
        return Promise.resolve(updatedUser);
      }
    });
  });
}

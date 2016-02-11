var route = require('express').Router();
var mongo = require('../services/db');

module.exports = route;

route.get('/', function(request, response, next){
  mongo.connect().then(function(db){
      db.collection('users').findOne({'twitter_id': request.user.twitter_id}, function(err, user){
          if(err){
            response.json({message: err});
          }else{
            response.json({barRoutes: user.routes})
          }
          db.close();
      })
  })
});

route.get('/:index', function(request, response, next){
  mongo.connect().then(function(db){
      db.collection('users').findOne({'twitter_id': request.user.twitter_id}, function(err, user){
        var route = user.routes[request.params.index];
          if(err){
            response.json({message: err});
          }else{
            response.json({route: route})
          }
          db.close();
      })
  })
});

route.post('/', function(request, response, next){
  if(request.user){
    console.log(request.body);
    mongo.connect().then(function(db){
      db.collection('users').findOne({'twitter_id': request.user.twitter_id}, function(err, user){
        if(err){
          response.json({message: err});
          db.close();
        }else{
          if(!user.routes){
            user.routes = [];
          }
          request.body.date = new Date;
          request.body.bars = JSON.parse(request.body.bars);
          user.routes.push(request.body);
          console.log(user.routes);
          db.collection('users').updateOne({'twitter_id': request.user.twitter_id}, { $set: {routes: user.routes }}, function(err, result){
            db.close();
            if(err){
              response.json({message: err});
            }else{
              response.json({data: request.body})
            }
          })
        }
      })
    })
  }else{
    response.json({message: 'You must be logged in.'});
  }
});

route.put('/:index', function(request, response, next){
  if (request.user){
    mongo.connect().then(function(db){
      db.collection('users').findOne({'twitter_id': request.user.twitter_id}, function(err, user){
        var currentRoute = user.routes[request.params.index];
        // response.json({route: currentRoute});
        if (err) {
          response.json({ message: err });
          return db.close();
        } else if (request.body.name) {
          currentRoute.name = request.body.name;
        } else if (request.body.skip) {
          currentRoute.bars[request.body.bar_id].skipped = true;
        } else if (request.body.checked_in){
          currentRoute.bars[request.body.bar_id].checked_in = true;
        } else if (request.body.forfeit){
          currentRoute.bars.forEach(function(bar){
            if(!bar.checked_in){
              bar.skipped = true;
            }
          });
        }
        db.collection('users').update({'twitter_id': request.user.twitter_id}, {$set: {routes: user.routes }}, function(err, result){
          if (err){
            response.json({message: error});
          }else{
            response.json({sucess: true});
          }
        });
      });
    });
  }else{
    response.json({message: 'You must be Logged In.'})
  }
});

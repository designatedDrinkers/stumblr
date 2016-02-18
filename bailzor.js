var mongo = require('./services/db');

mongo.connect().then(function(db) {
  db.collection('users').findOne({ twitter_name: elana }, function(err, data) {
    if (err) return console.log(err);
    data.routes = data.routes.slice(0, 2);
    
  });
});

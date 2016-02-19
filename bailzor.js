var mongo = require('./services/db');

mongo.connect().then(function(db) {
  db.collection('users').findOne({ twitter_name: 'Elana Kopelevich' }, function(err, data) {
    if (err) return console.error(err);
    data.routes = data.routes.slice(0, 2);
    db.collection('users').update({ twitter_name: 'Elana Kopelevich' }, { $set: { routes: data.routes }}, function(err, response) {
      if (err) return console.error(err);
      console.log('success');
      db.close();
    });
  });
}).catch(console.error);

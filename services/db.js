var mongo = require('mongodb');
var Promise = require('promise');
var url = (process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost:27017/') + 'stumblr';


module.exports = {
  connect: function() {
    return new Promise(function(resolve, reject) {
      mongo.MongoClient.connect(url, function(err, db) {
        if (err) reject(err);
        else resolve(db);
      });
    });
  },
  ObjectId: mongo.ObjectId
}

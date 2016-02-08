if(process.env.NODE_ENV !== 'production'){
  require('dotenv').load();
}
var express = require('express');
var bodyParser = require('body-parser');
var auth = require('./services/auth');

var app = express();


app.use('/', auth);

app.get('/', function(request, response, next) {
  response.send('Welcome to Stumblr');
})

app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8000,
  process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
  function() {
  console.log('Server is listening...');
});

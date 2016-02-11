if(process.env.NODE_ENV !== 'production'){
  require('dotenv').load();
}
var express = require('express');
var bodyParser = require('body-parser');
var auth = require('./services/auth');
var testing = require('./testing/test');
var users = require('./routes/users');
var maps = require('./routes/maps');
var barRoutes = require('./routes/barroutes');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/react/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', auth);
app.use('/test', testing);
app.use('/api/users', users);
app.use('/api/maps', maps);
app.use('/api/barroutes', barRoutes);

app.get('/', function(request, response, next) {
  response.send('Welcome to Stumblr');
})

app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8000,
  process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
  function() {
  console.log('Server is listening...');
});


app.use(function(err, request, response, next) {
  response.status(err.status || 404);
  response.json({ error: err.message });
});

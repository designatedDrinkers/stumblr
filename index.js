var express = require('express');
var bodyParser = require('body-parser');

var app = express();

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').load();
}

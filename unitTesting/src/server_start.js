'use strict';
var express = require('express');
var parser = require('body-parser');
var app = express();
var portReplace = process.env.PORT || 3000;
app.use('/', express.static('components'));
app.listen(portReplace, function() {
  console.log("Express Server is Running on Port " + portReplace)
});

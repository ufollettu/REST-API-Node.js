process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require("./config/mongoose");
var express = require("./config/express");
var passport = require("./config/passport");


var db = mongoose();
var app = express();
var passport = passport();

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log("RestApiNode at " + PORT);
});

module.exports = app;
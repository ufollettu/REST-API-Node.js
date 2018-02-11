var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

    module.exports = function () {
    var User = mongoose.model('User');
    passport.use(new LocalStrategy(User.authenticate())); //from passport-local-mongoose plugin
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    // require('./strategies/local.js')();
    // require('./strategies/facebook.js')();
    // require('./strategies/twitter.js')();
    // require('./strategies/google.js')();
    // require('./strategies/github.js')();
};
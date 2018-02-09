var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local');

module.exports = function() {
    var User = mongoose.model('User');
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    // passport.serializeUser( function(user, done) {
    //     done(null, user.id);
    // });
    passport.deserializeUser(User.deserializeUser());
    // passport.deserializeUser( function(id, done) {
    //     User.findOne({
    //         _id: id
    //     }, '-password -salt', function(err, user) {
    //         done(err, user);
    //     });
    // });
    require('./strategies/local.js')();
    require('./strategies/facebook.js')();
    require('./strategies/twitter.js')();
    require('./strategies/google.js')();
    require('./strategies/github.js')();
};
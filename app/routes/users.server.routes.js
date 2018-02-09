var users = require("../../app/controllers/users.server.controller");
var passport = require("passport");

module.exports = function (app) {
    //local Auth route
    app.route("/signup")
        .get(users.renderSignup)
        .post(users.signup);
    app.route("/signin")
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));
    app.get('/signout', users.signout);

    //facebook AOuth route
    app.get('/oauth/facebook', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }));
    app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin',
        successRedirect: '/'
    }));

    //twitter AOuth route
    app.get('/oauth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }));
    app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin',
        successRedirect: '/'
    }));

    //google AOuth route
    app.get('/oauth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
    }));
    app.get('/oauth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin',
        successRedirect: '/'
    }));
    //github AOuth route
    app.get('/oauth/github', passport.authenticate('github', {
        failureRedirect: '/signin',
    }));
    app.get('/oauth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin',
        successRedirect: '/'
    }));
};

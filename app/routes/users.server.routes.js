var express = require("express");
var router = express.Router();
var passport = require("passport");
var users = require("../../app/controllers/users.server.controller");

//show signup form
router.route("/register")
    .get(users.renderRegister)
    .post(users.register);

//render login form
router.route("/login")
    .get(users.renderLogin)
    .post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }), function(req, res) {});

// logout
router.get("/logout", users.logout);

module.exports = router;
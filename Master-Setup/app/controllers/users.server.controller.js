var User = require("../models/user.server.model");
var passport = require("passport");

//signup view render
exports.renderRegister = function (req, res) {
    res.render("register");
};
//handling user sign up
exports.register = function (req, res) {
    // res.render("register");
    User.register(new User({username:req.body.username}), req.body.password, function (err, user) {
        if(err) {
            console.log(err);
            // req.flash("error", err.message);
            return res.render("register", {error: err.message}); //different from the lecture when return res.render
        } else {
            passport.authenticate("local")(req, res, function () {
                // req.flash("success", "Welcome" + user.username);
                res.redirect("/");
            })
        }
    })
};
//signin view render
exports.renderLogin = function (req, res) {
    res.render("login");
};
// signout redirect to index
exports.logout = function (req, res) {
    req.logout();
    // req.flash("success", "Logged You Out!");
    res.redirect("/");
};
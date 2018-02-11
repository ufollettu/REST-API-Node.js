var User = require("../../app/models/user.server.model");
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
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secret");
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
    res.redirect("/");
};
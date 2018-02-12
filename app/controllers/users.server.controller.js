const User = require("../models/user.server.model");
const passport = require("passport");

//signup view render
exports.renderRegister = (req, res) => {
    res.render("register");
};
//handling user sign up
exports.register = (req, res) => {
    // res.render("register");
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            // req.flash("error", err.message);
            return res.render("register", {error: err.message}); //different from the lecture when return res.render
        } else {
            passport.authenticate("local")(req, res, () => {
                // req.flash("success", "Welcome" + user.username);
                res.redirect("/");
            })
        }
    })
};
//signin view render
exports.renderLogin = (req, res) => {
    res.render("login");
};
// signout redirect to index
exports.logout = (req, res) => {
    req.logout();
    // req.flash("success", "Logged You Out!");
    res.redirect("/");
};
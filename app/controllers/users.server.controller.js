var User = require("mongoose").model("User");
var passport = require("passport");


//user messages handles
var getErrorMessage = function (err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    return message;
};

//signin view render
exports.renderSignin = function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Sign.in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

//signup view render, show registration form
exports.renderSignup = function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register Form',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

//handle sign up logic
exports.signup = function (req, res, next) {
    if (!req.user) {
        var message = null;
        User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
            if (err) {
                var message = getErrorMessage(err);
                req.flash("error", message);
                return res.render("register", {error: message}); //different from the lecture when return res.render
            }
            passport.authenticate("local")(req, res, function () {
                req.flash("success", "Welcome" + user.username);
                res.redirect("/");
            });
        });
    } else {
        return res.redirect('/');
    }
};

// signout redirect to index
exports.signout = function (req, res) {
    req.logout();
    req.flash("success", "Logged You Out!");
    res.redirect('/');
};

//facebook, twitter OAuth method
exports.saveOAuthUserProfile = function (req, profile, done) {
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, function (err, user) {
        if (err) {
            return done(err);
        } else {
            if (!user) {
                var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
                User.findUniqueUsername(possibleUsername, null, function (availableUsername) {
                    profile.username = availableUsername;
                    user = new User(profile);
                    user.save(function (err) {
                        if (err) {
                            var message = _this.getErrorMessage(err);
                            req.flash('error', message);
                            return res.redirect('/signup');
                        }
                        return done(err, user);
                    });
                });
            } else {
                return done(err, user);
            }
        }
    });
};

exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(400).send({
            message: 'User is not logged in'
        });
    }
    next();
};
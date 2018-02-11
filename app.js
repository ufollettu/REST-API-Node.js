var path = require('path'),
    express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./app/models/user.server.model"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    middleware = require("./app/middleware/index.server.middleware");

mongoose.connect("mongodb://localhost/auth_demo_app");
mongoose.Promise = global.Promise;

var app = express();

app.set('views', path.join(__dirname, 'app/views'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
    secret: "we don't need another hero",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); //from passport-local-mongoose plugin
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Requiring Routes
var indexRoutes = require("./app/routes/index.server.routes");
var usersRoutes = require("./app/routes/users.server.routes");

app.use(function (req, res, next) {
    // pass if user is authenticated to ALL routes
    res.locals.currentUser = req.user;
    // pass flash message to all routes
    // res.locals.error = req.flash("error");
    // res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);

app.listen(4000, function () {
    console.log("server running");
});
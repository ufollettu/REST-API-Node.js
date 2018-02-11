var path = require("path"),
    express = require("express"),
    mongoose = require("mongoose"),
    favicon = require("serve-favicon"),
    logger = require("morgan"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    User = require("./models/user.server.model"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    middleware = require("./middleware/index.server.middleware");

//mongoose config
mongoose.connect("mongodb://localhost/auth_demo_app");
mongoose.Promise = global.Promise;

// Requiring Routes
var indexRoutes = require("./routes/index.server.routes");
var usersRoutes = require("./routes/users.server.routes");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, './../public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './../public')));

app.use(require("express-session")({
    secret: "we don't need another hero",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//passport config
passport.use(new LocalStrategy(User.authenticate())); //from passport-local-mongoose plugin
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    // pass if user is authenticated to ALL routes
    res.locals.currentUser = req.user;
    // pass flash message to all routes
    // res.locals.error = req.flash("error");
    // res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/", usersRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

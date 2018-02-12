const config = require("../config/config"),
    path = require("path"),
    express = require("express"),
    favicon = require("serve-favicon"),
    logger = require("morgan"),
    compress = require("compression"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    flash = require("connect-flash"),
    passport = require("passport"),
    middleware = require("./middleware/index.server.middleware");

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(logger("dev"));
} else if (process.env.NODE_ENV === "production") {
    app.use(compress());
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, './../public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './../public')));
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    // pass if user is authenticated to ALL routes
    res.locals.currentUser = req.user;
    // pass flash message to all routes
    // res.locals.error = req.flash("error");
    // res.locals.success = req.flash("success");
    next();
});

// Requiring Routes
const indexRoutes = require("./routes/index.server.routes");
const usersRoutes = require("./routes/users.server.routes");

app.use("/", indexRoutes);
app.use("/", usersRoutes);

app.use((req, res, next) => {
    res.status(200).json({
        message: "it works!"
    });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

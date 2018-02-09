var config = require("./config");
var express = require("express");
var morgan = require("morgan");
var compress = require("compression");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var session = require("express-session");
var flash = require("connect-flash");
var passport = require("passport");

module.exports = function() {
    var app = express();

    if (process.env.NODE_ENV === "development") {
        app.use(morgan("dev"));
    } else if (process.env.NODE_ENV === "production") {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.set("views", "./app/views");
    app.set("view engine", "ejs");
    // add static files like stylesheet
    app.use(express.static("./public"));
    app.use(express.static(__dirname + "/public"));
    //flash message display
    app.use(flash());
    // Passport Configuration
    app.use(require("express-session")({
        secret: "non so cosa sia",
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function (req, res, next) {
        // pass if user is authenticated to ALL routes
        res.locals.currentUser = req.user;
        // pass flash message to all routes
        res.locals.error = req.flash("error");
        res.locals.success = req.flash("success");
        next();
    });

    // Requiring Routes
    require("../app/routes/index.server.routes.js")(app);
    require("../app/routes/users.server.routes.js")(app);
    // require("../app/routes/articles.server.routes.js")(app);
    //
    // app.use("/", indexRoutes);
    // app.use("/articles", articlesRoutes);
    // app.use("/articles/:id/comments", commentsRoutes);

    //handle URL errors --> always at the end of the routes
    app.get("*", function (req, res) {
        res.send("sorry page not found!");
    });

    return app;
};

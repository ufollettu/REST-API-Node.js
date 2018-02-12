const express = require("express");
const router = express.Router();
const passport = require("passport");
const users = require("../controllers/users.server.controller");

//show signup form
router.get("/register", users.renderRegister);
router.post("/register", users.register);

//render login form
router.get("/login", users.renderLogin);
router.post("/login", passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }), (req, res) => {});

// logout
router.get("/logout", users.logout);

module.exports = router;
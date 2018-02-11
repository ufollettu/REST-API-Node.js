var express = require("express");
var router = express.Router();
var index = require("../../app/controllers/index.server.controller");

router.get("/", index.render);

module.exports = router;
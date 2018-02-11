var express = require("express");
var router = express.Router();
var index = require("../controllers/index.server.controller");

router.get("/", index.render);

module.exports = router;
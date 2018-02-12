const express = require("express");
const router = express.Router();
const index = require("../controllers/index.server.controller");

router.get("/", index.render);

module.exports = router;
var config = require("./config");
var mongoose = require("mongoose");

module.exports = function () {
    var db = mongoose.connect(config.db);
    mongoose.Promise = global.Promise;

    require("../app/models/user.server.model");

    return db;
};

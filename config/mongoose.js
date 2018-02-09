var config = require("./config");
var mongoose = require("mongoose");

module.exports = function () {
    var url = process.env.DATABASEURL || config.db;
    var db = mongoose.connect(url);
    mongoose.Promise = global.Promise;

    require("../app/models/user.server.model");
    require("../app/models/article.server.model");

    return db;
};

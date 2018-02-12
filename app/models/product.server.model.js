const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({


}, { usePushEach: true });

productSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Product", productSchema);
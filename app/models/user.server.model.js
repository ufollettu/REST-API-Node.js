var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: 'Username is required'
    },
    password: {
        type: String,
        validate: [
            function (password) {
                return password && password.length > 6;
            }, 'Password should be longer'
        ]
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
    created: {
        type: Date,
        default: Date.now
    }
}, {usePushEach: true});

userSchema.virtual('fullName')
    .get(function () {
        return this.firstName + ' ' + this.lastName;
    })
    .set(function (fullName) {
        var splitName = fullName.split(' ');
        this.firstName = splitName[0] || '';
        this.lastName = splitName[1] || '';
    });

userSchema.statics.findUniqueUsername = function (username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne({
        username: possibleUsername
    }, function (err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

userSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

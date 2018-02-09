var passport = require('passport'),
    url = require('url'),
    GitHubStrategy = require('passport-github').Strategy,
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');

module.exports = function () {

    passport.use(new GitHubStrategy({
            clientID: config.github.clientID,
            clientSecret: config.github.clientSecret,
            callbackURL: config.github.callbackURL,
            passReqToCallback: true
        },

        function (req, accessToken, refreshToken, profile, done) {
            var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;
            var providerUserProfile = {
                // firstName: profile.name.givenName,
                // lastName: profile.name.familyName,
                fullName: profile.displayName,
                // email: profile.emails[0].value,
                username: profile.username,
                provider: 'github',
                providerId: profile.id,
                providerData: providerData
            };

            users.saveOAuthUserProfile(req, providerUserProfile, done);
        }));
};
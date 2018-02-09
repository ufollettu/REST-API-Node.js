var users = require('../../app/controllers/users.server.controller'),
    articles = require('../../app/controllers/articles.server.controller');

module.exports = function (app) {
    //RESTful Routes
    app.route('/api/articles')
        .get(articles.list) //INDEX
        .post(users.requiresLogin, articles.create); //CREATE

    app.route('/api/articles/:articleId')
        .get(articles.read) //SHOW
        .put(users.requiresLogin, articles.hasAuthorization, articles.update) //UPDATE
        .delete(users.requiresLogin, articles.hasAuthorization, articles.delete); //DESTROY

    app.param('articleId', articles.articleByID);
};
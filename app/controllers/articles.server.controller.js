var mongoose = require('mongoose'),
    Article = mongoose.model('Article');

var getErrorMessage = function (err) {
    if(err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknow server error';
    }
};
// CRUD create
exports.create = function (req, res) {
    var article = new Article(req.body);
    article.creator = req.user;

    article.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(article);
        }
    })
};

exports.list = function (req, res) {
    Article.find()
        .sort('-created')
        .populate('creator', 'firstName lastName fullName')
        .exec(function (err, articles) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(articles);
            }
        });
};
// middleware to find :id
exports.articleByID = function (req, res, next, id) {
    Article.findById(id)
        .populate('creator', 'firstName lastName fullName')
        .exec(function (err, article) {
            if (err) return next(err);
            if (!article) return next(new Error('Failed to load article ') + id);

            req.article = article; // for the read, update and delete CRUD operations (see below)
            next();
        });
};
// CRUD read
exports.read = function (req, res) {
    res.json(req.article);
};

//CRUD update
exports.update = function (req, res) {
    var article = req.article;

    article.title = req.body.title;
    article.content = req.body.content;

    article.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(article);
        }
    })
};

//CRUD delete
exports.delete = function (req, res) {
    var article = req.article;

    article.remove(function (err) {
        if (err) {
            return res.status(400). send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(article);
        }
    });
};

//Auth Middleware()
exports.hasAuthorization = function (req, res, next) {
    if (req.article.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};
exports.render = function (req, res) {
    res.render('index', {
        title : "Ciaone",
        user: JSON.stringify(req.user)
    });
};

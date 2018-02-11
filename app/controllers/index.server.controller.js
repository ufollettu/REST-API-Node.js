exports.render = function (req, res) {
    res.render("index", {
        title : "Express",
        user: JSON.stringify(req.user)
    });
};
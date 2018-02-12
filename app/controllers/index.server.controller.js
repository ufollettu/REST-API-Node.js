exports.render = (req, res) => {
    res.render("index", {
        title: "Express",
        user: JSON.stringify(req.user)
    });
};
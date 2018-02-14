exports.render = (req, res) => {
	res.render('index', {
		title: 'Node Rest Shop',
		user: JSON.stringify(req.user)
	});
};
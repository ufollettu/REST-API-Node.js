const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'Please Login First!');
	res.redirect('/login');
};

middlewareObj.checkAuth = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, config.tokenKey);
		req.userData = decoded;
		next();
	} catch (error) {
		return res.status(401).json({
			message: 'Auth failed'
		});
	}
};

module.exports = middlewareObj;
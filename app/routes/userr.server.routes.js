const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const userr = require('../controllers/userr.server.controller');

router.post('/signup', userr.userrSignup);
router.post('/signin', userr.userrSignin);
router.delete('/:userrId', middleware.checkAuth, userr.userrDelete);

module.exports = router;
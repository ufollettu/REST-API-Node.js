module.exports = {
	//Development configuration options
	db: 'mongodb://localhost/rest-api-node',
	sessionSecret: 'developmentSessionSecret',
	tokenKey: 'secretKey',
	facebook: { //OAuth FB App Data
		clientID: '135099493853031',
		clientSecret: '4f514f22c099edfa4e6fbc0e5262fffa',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	},
	twitter: { //OAuth TW App Data
		clientID: 'BXkYDRsUmFLYIQkMlKB6oCHG6',
		clientSecret: 's4cMPteySzPrEAUmr1nnI37jNxzLvVahCFgrCAHeUQ8NmfiGLb',
		callbackURL: 'http://localhost:3000/oauth/twitter/callback'
	},
	google: { //OAuth Goo App Data
		clientID: '122231928484-dscb3ho04vmgkjnm1lasvidppkt18re0.apps.googleusercontent.com',
		clientSecret: 'AId0-G5HO5D0yYag255ijBJN',
		callbackURL: 'http://localhost:3000/oauth/google/callback'
	},
	github: { //OAuth GH App Data
		clientID: '2cc734bd5eb906f3af50',
		clientSecret: '050fe08b0015fa404ab72d7b068de4b68d346bdb',
		callbackURL: 'http://localhost:3000/oauth/github/callback'
	}
};

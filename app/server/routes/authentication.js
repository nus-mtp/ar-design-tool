var isLoggedIn = function(req, res, next) {
	console.log('checking whether logged in:');
	if(req.isAuthenticated()) {
		console.log('authenticated!');
		return next();
	}
	console.log('not logged in, redirecting to login!');
	res.redirect('/login');
};

module.exports.isLoggedIn = isLoggedIn;
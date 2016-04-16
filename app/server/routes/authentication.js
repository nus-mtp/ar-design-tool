/**
 * @module Authentication
 * @parent Routes
 * This authentication module handles all authentication related functions.
 * To use, require module from /server/routes/authentication    
 */
 
/**
 * @function isLoggedIn
 * @parent Authentication
 * isLoggedIn checks whether the user is already logged in by checking req.isAuthenticated.
 * If user is logged in, it will call the next function. Otherwise, it will redirect to login page.
 */
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
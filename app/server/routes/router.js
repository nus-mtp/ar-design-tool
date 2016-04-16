/**
 * @module Router
 * @parent Routes
 * All other normal routes goes here
 * To use, require module from /server/routes/router
 */
var auth		= require('./authentication'),
	passport 	= require('passport'),
	express 	= require('express');

var router 	= express.Router();

/**
 * @module GET/
 * @parent Router
 * @body
 * GET Root of site. Checks if user is logged in first, if logged in, load vumixManagerView from server views folder.
 */
router.get('/', auth.isLoggedIn, function (req, res) {
	res.render('vumixManagerView',{name: req.user.name, id:req.user.id});
});

/**
 * @module GET/project/:id
 * @parent Router
 * @body
 * GET Routes to editor view, checks if it is logged in, if yes, load vumixEditorView
 */
router.get('/project/:id', auth.isLoggedIn, function(req, res) {
	res.render('vumixEditorView', {name: req.user.name, id:req.user.id, pid: req.params.id});
});

/**
 * @module GET/login
 * @parent Router
 * @body
 * GET Routes to the login page, loading loginView.
 */
router.get('/login', function (req, res) {
	res.render('loginView');
});

/**
 * @module GET/auth/google/
 * @parent Router
 * @body
 * GET Routes to authenticate google account, used by passportjs
 */
router.get('/auth/google/', passport.authenticate('google', {
	scope: ['profile', 'email']
}));

/**
 * @module GET/auth/google/callback
 * @parent Router
 * @body
 * GET After authentication, this route is called. Upon which, it either redirects to the root page or again, the login page.
 */
router.get('/auth/google/callback', passport.authenticate('google', { 
	successRedirect: '/', 
	failureRedirect: '/login' 
}));

/**
 * @module GET/logout
 * @parent Router
 * @body
 * GET Logouts the user and redirects to the root page.
 */
router.get('/logout', function(req, res) {
	console.log("logging out!");
	console.log('===============//');
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
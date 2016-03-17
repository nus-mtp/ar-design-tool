var passport 		= require('passport'),
	express 		= require('express');

var router 	= express.Router();

router.get('/', isLoggedIn, function (req, res) {
	res.render('vumixManagerView',{name: req.user.name, id:req.user.id});
});

router.get('/state', function(req, res) {
	res.render('vumixEditorView');
});

router.get('/login', function (req, res) {
	res.render('loginView');
});

router.get('/auth/google/', passport.authenticate('google', {
	scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google', { 
	successRedirect: '/', 
	failureRedirect: '/login' 
}));

router.get('/logout', function(req, res) {
	console.log("logging out!");
	console.log('===============//');
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

function isLoggedIn(req, res, next) {
	console.log('checking whether logged in:');
	if(req.isAuthenticated()) {
		console.log('authenticated!');
		return next();
	}
	console.log('not logged in, redirecting to login!');
	res.redirect('/login');
}

module.exports = router;
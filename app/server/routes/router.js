var express 	= require('express'),
	passport 	= require('passport');

var router 	= express.Router();

router.get('/', isLoggedIn, function (req, res) {
	res.render('indexView');
});

router.get('/manager', function(req, res) {
	res.render('vumixManagerView');
});

router.get('/editor', function(req, res) {
	res.render('vumixEditorView');
});

router.get('/login', function (req, res) {
	console.log(req.cookies);
	console.log(req.session);

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
	console.log('===============//')
	req.logout();
	res.redirect('/');
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	console.log('not logged in, redirecting to login!');
	res.redirect('/login');
}

module.exports = router;
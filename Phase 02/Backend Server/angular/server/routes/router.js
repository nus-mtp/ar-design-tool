var express 	= require('express'),
	passport 	= require('passport');
var router 	= express.Router();

router.get('/', function (req, res) {
	res.render('index');
});

router.get('/login', function (req, res) {
	res.render('login');
});

router.get('/auth/google/', passport.authenticate('google', {
	scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google', { 
	successRedirect: '/', 
	failureRedirect: '/login' 
}));



module.exports = router;
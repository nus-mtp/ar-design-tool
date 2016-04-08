var auth		= require('./authentication'),
	passport 	= require('passport'),
	express 	= require('express');

var router 	= express.Router();

router.get('/', auth.isLoggedIn, function (req, res) {
	res.render('vumixManagerView',{name: req.user.name, id:req.user.id});
});

router.get('/project/:id', auth.isLoggedIn, function(req, res) {
	res.render('vumixEditorView', {name: req.user.name, id:req.user.id, pid: req.params.id});
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

router.use(function(req, res, next){
  res.status(404);
  // // respond with html page
  // if (req.accepts('html')) {
  //   res.render('404', { url: req.url });
  //   return;
  // }

  // // respond with json
  // if (req.accepts('json')) {
  //   res.send({ error: 'Not found' });
  //   return;
  // }
  // default to plain-text. send()
  res.redirect('/');
});

module.exports = router;
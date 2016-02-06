var GoogleStrategy 	= require('passport-google').Strategy;
var User 			= require('../models/user');
var configAuth		= require('/auth');

module.exports = function(passport) {
	passport.use(new GoogleStrategy({
		clientID: configAuth.googleAuth.clientID,
		clientSecret: configAuth.googleAuth.clientSecret,
		callbackURL: configAuth.googleAuth.callbackURL
	}),
	function(accessToken, refreshToken, profile, done) {
		process.nextTick(function() {
			User.findOne({'google.id': profile.id}, function(err, user){
				// if cannot find user
				if(err)
					return done(err);
				// if found user, return no error and return user to callback
				if(user)
					return done(null, user);
				else {
					var newUser = new User();
					newUser.google.id = profile.id;
					newUser.google.token = accessToken;
					newUser.google.name = profile.name.displayName;
					newUser.google.email = profile.emails[0].value;

					newUser.save(function(err) {
						if(err) 
							throw err;
						return done(null, newUser);
					});
					console.log(profile);
				}
			});
		});	
	}); 
} 
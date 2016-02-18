/**
 * @module passportgoogle
 * @parent Server_Modules
 * This module configures passportjs 
 *
 * @param {{}} passport 
 *	Requires passportjs
 * 
 */
var GoogleStrategy 	= require('passport-google-oauth').OAuth2Strategy;
var models 			= require('../models');
var configAuth		= require('../config/auth');

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		models.googleUser.findById(id).then(function(user) {
			done(user);
		});
	});

	/**
	 * @function passport.use.GoogleStrategy
	 * @parent passportgoogle
	 * This function configures passportjs to use the Google strategy
	 */
	passport.use(new GoogleStrategy({
		clientID: configAuth.googleAuth.clientID,
		clientSecret: configAuth.googleAuth.clientSecret,
		callbackURL: configAuth.googleAuth.callbackURL,
	},
	function(accessToken, refreshToken, profile, done) {
		process.nextTick(function() {
			console.log("this is my profile received by google:")
			console.log(profile)
			console.log("this is my user:")
			models.googleUser.findOrCreate({where: {'id': profile.id}, 
				defaults: {
					id: profile.id,
					name: profile.displayName,
					token: accessToken,
					email: profile.emails[0].value
				}
			}).spread(function(googleUser, created) {
				console.log(googleUser.get({
					plain: true
				}))
				console.log(created);
			})
		})
	}));
}	
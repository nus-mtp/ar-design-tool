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
var User 			= require('../models/user');
var configAuth		= require('../config/auth');

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id).then(function(user) {
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
			User.findOrCreate({where: {'id': profile.id}, 
				defaults: {
					name: profile.name.displayName,
					token: accessToken,
					email: profile.emails[0].value,
					googleId: profile.id
				}}).spread(function(user, created) {
					plain: true
				})
				console.log(created);
			})
		}; 
	}));
}	
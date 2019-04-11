const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../config');

const User = require('../models/User');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => done(null, user));
});

passport.use(new GoogleStrategy({
		clientID: config.GOOGLE_CLIENT_ID,
		clientSecret: config.GOOGLE_CLIENT_SECRET,
		callbackURL: '/auth/google/callback',
		proxy: true
	},
	(accessToken, refreshToken, profile, done) => {
		User.findOne({ googleId: profile.id })
			.then((existingUser) => {
				if (existingUser) {
					//console.log('User already exists.');
					done(null, existingUser);
				}
				else {
					new User({ googleId: profile.id })
						.save()
						.then(user => done(null, user));
				}
			});
	})
);
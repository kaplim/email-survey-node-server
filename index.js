const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./services/passport');
const config = require('./config');

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
	console.log('mlab connected.');
});

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 3600 * 1000,  // 30 days in milliseconds
		keys: [config.COOKIE_KEY]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

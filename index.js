const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./services/passport');
const config = require('./config');

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
	console.log('mlab connected.');
});

const app = express();

app.use(bodyParser.json());

app.use(
	cookieSession({
		maxAge: 30 * 24 * 3600 * 1000,  // 30 days in milliseconds
		keys: [config.COOKIE_KEY]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	// Express will serve up client production files.
	app.use(express.static('client/build'));

	// Express will redirect to index.html for all other requests.
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

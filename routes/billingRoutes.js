const config = require('../config');
const stripe = require('stripe')(config.STRIPE_SECRET_KEY);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		//console.log(req.body);

		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 surveys',
			source: req.body.id
		});

		//console.log(charge);

		req.user.credits += 5;
		const user = await req.user.save();

		res.send(user);
	});
}
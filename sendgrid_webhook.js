var localtunnel = require('localtunnel');

setTimeout(() => {
	localtunnel(5000, { subdomain: 'rrrcfjremaindo' },
		function(err, tunnel) {
	  		console.log('LT running', tunnel.url)
	});
}, 2000);
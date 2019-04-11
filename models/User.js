const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	googleId: String
	
}); //, { collection: 'new_name' });

module.exports = mongoose.model('User', userSchema);
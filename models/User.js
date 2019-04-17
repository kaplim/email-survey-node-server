const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	googleId: String,
	credits: { type: Number, default: 0 }
}); //, { collection: 'new_name' });

module.exports = mongoose.model('User', userSchema);
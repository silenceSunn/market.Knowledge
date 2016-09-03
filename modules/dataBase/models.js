var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	login: String,
	hash: String,
	invite: String,
	firstName: String,
	secondName: String,
	thirdName: String,
	status: String
});

module.exports = mongoose.model('User', userSchema);
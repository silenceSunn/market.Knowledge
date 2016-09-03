var mongoose = require('mongoose');
var inviteSchema = mongoose.Schema({
	invite: String,
	status: String

});
module.exports = mongoose.model('Invite', inviteSchema);
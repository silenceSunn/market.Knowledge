var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');
var Invite = require('./../../modules/dataBase/inviteModel.js');

function inviteDBOut(callback) {
	var data = [];
	Invite.find({}, function (err, data) {
		return callback(data)

	});
}
module.exports = inviteDBOut;
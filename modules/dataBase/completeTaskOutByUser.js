var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');

var completeTask = require('./completeTaskModel.js');


function completeTaskOutByUser(user, callback) {

	var data = []

	completeTask.find({user_id: user}, function (err, data) {
		return callback(data)
	});
}
module.exports = completeTaskOutByUser;
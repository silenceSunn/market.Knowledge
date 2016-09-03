var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');

var completeTask = require('./completeTaskModel.js');


function completeTasksOut(callback) {

	var data = []

	completeTask.find({}, function (err, data) {
		return callback(data)
	});
}
module.exports = completeTasksOut;
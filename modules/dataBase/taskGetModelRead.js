var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');
var TaskGet = require('./tasksGetModel.js');

function taskGetModelRead(callback) {
	var LikeData = [];

	TaskGet.find({}, function (err, LikeData) {
			return callback(LikeData)
	});
}
module.exports = taskGetModelRead;
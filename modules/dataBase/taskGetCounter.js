var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');
var TaskGet = require('./tasksGetModel.js');
var Like = require('./likeModel');

function taskGetCounter(id, callback) {
	var TaskGetData = [];
	var LikeData = [];

	TaskGet.find({user_id: id}, function (err, TaskGetData) {
		return callback(TaskGetData.length);
	});
}
module.exports = taskGetCounter;
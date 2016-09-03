var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');
var TaskGet = require('./tasksGetModel.js');
var Like = require('./likeModel');

function taskGetReadByUser(id, callback) {

	var TaskGetData = [];
	var LikeData = [];

	TaskGet.find({user_id: id}, function (err, TaskGetData) {
		return callback(TaskGetData);
	});
}
module.exports = taskGetReadByUser;
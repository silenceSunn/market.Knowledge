var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');
var Task = require('./taskModel.js');
var Like = require('./likeModel.js');
var TasksGet = require('./tasksGetModel.js');
var CompleteTask = require('./completeTaskModel');

function taskInsert(id) {
	Task.remove({_id: id}, function (err) {
		if (err) throw err
	});

	Like.remove({task_id: id}, function (err) {
		if (err) throw err;
	});

	TasksGet.remove({task_id: id}, function (err) {
		if (err) throw err;
	});

	CompleteTask.remove({task_id: id}, function (err) {
		if (err) throw err;
	});
}
module.exports = taskInsert;

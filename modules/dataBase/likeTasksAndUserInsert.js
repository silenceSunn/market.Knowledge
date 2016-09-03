var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');

var TasksGet = require('./tasksGetModel.js');
var Like = require('./likeModel.js');

function likeTasksAndUserInsert(user, task) {
	TasksGet.find({task_id: task, user_id: user}, function(err, value) {
		if (value.length){
			TasksGet.remove({task_id: task},function(err){
				if (err) {
				}
			});

		} else {
			TasksGet.find({task_id: task}, function (err, user_id) {
				if (err) throw err;
				if (user_id.length) {
					TasksGet.update({task_id: task, user_id: user}, function (err, like) {
						if (err) throw err
					})
				} else {
					var newTasksGet = new TasksGet({
						user_id: user,
						task_id: task
					});
					newTasksGet.save(function (err) {

						if (err) throw err;
					});
				}
			});
		}
	})

}

module.exports = likeTasksAndUserInsert;
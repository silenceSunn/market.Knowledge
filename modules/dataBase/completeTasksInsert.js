var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');

var completeTask = require('./completeTaskModel.js');

function completeTasksInsert(user, task) {
	completeTask.find({task_id: task, user_id: user}, function (err, value) {
		if (value.length) {
			completeTask.remove({task_id: task}, function (err) {
				if (err) throw err;
			});

		} else {
			completeTask.find({task_id: task}, function (err, user_id) {
				if (err) throw err;
				if (user_id.length) {
					completeTask.update({task_id: task, user_id: user}, function (err, like) {
					})
				} else {

					var newcompleteTask = new completeTask({
						user_id: user,
						task_id: task
					});
					newcompleteTask.save(function (err) {
						if (err) throw err
					});
				}
			});
		}
	})
}

module.exports = completeTasksInsert;
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');

var Like = require('./likeModel.js');


function likeTasksInsert(user, task) {
	Like.find({user_id: user, task_id: task}, function (err, user_id) {
		if (err) throw err;
		if (!(user_id.length)) {
			Like.find({user_id: user}, function (err, like) {
				if (err) throw err;
				if (like.length) {
					Like.update ({user_id: user}, {$push: {task_id: task}}, function (err) {
						if (err) throw err;
					})
				} else {
					var newLike = new Like({
						user_id: user,
						task_id: task
					});
					newLike.save(function (err) {
						if (err) throw err;
					})
				}

			})
		} else {
			Like.update({user_id: user}, {$pull: {task_id: task}}, function (err) {
				if (err) throw err;
			})
		}
	});
}

module.exports = likeTasksInsert;
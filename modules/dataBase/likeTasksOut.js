var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');
var Like = require('./likeModel.js');

function likeTasksOut(user, callback) {

	Like.find({user_id: user}, function (err, LikeData) {
		if (err) throw  err;
		if (!(LikeData[0])) {
			LikeData[0] = {
				task_id: []
			}
		}

		return callback(LikeData[0].task_id);


	});
}

module.exports = likeTasksOut;
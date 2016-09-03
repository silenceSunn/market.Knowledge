var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');
var Like = require('./likeModel.js');

function likeTasksAndUserOut(callback) {

	var LikeData = [];

	Like.find({}, function (err, LikeData) {

		return callback(LikeData)
	});
}
module.exports = likeTasksAndUserOut;
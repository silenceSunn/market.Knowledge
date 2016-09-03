var mongoose = require('mongoose');


var likeSchema = mongoose.Schema({
	user_id: String,
	task_id: Array

});

module.exports = mongoose.model('Like', likeSchema);
var mongoose = require('mongoose');

//======================БД с пользователями=============================================================================

var completeTaskSchema = mongoose.Schema({
	user_id: String,
	task_id: String

});

//======================================================================================================================
module.exports = mongoose.model('CompleteTask', completeTaskSchema);
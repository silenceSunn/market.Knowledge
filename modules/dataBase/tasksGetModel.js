var mongoose = require('mongoose');

var tasksGetSchema = mongoose.Schema({
	user_id: String,
	task_id: String
});

module.exports = mongoose.model('TasksGet', tasksGetSchema);
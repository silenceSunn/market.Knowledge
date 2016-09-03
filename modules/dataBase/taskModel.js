var mongoose = require('mongoose');
var taskSchema = mongoose.Schema({
	cardName: String,
	longDescription: String,
	shortDescription: String,
	reward: String,
	deadline: String,
	customer: Boolean,
	employee: Boolean
});
module.exports = mongoose.model('Task', taskSchema);
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');
var Task = require('./taskModel.js');

function dataBaseFindById(id, callback) {
	Task.find({_id: id}, function (err, data) {
		if (data) {
			return callback(data[0])
		}
	});
}
module.exports = dataBaseFindById;
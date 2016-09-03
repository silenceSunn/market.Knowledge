var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');
var Task = require('./taskModel.js');

function dataBaseFind(callback) {
	Task.find({}, function (err, data) {
			return callback(data);
	});
}
module.exports = dataBaseFind;
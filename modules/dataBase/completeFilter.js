var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');

var completeTask = require('./completeTaskModel.js');
var dataBaseFind = require('./dataBaseFind.js');

function statusFilter(socket, callback) {
	var filteredData = [];
	dataBaseFind(function (data) {
		data.forEach(function (value, index) {
			if (value[socket.request.session.status]) {

				filteredData.push(value)
			}
		});
		return callback(filteredData);
	})

}


function completeFilter(socket, callback) {

	statusFilter(socket, function (firstFilteredData) {

		var filteredData = [];
		//var completeValue = [];

		completeTask.find({user_id: socket.request.session.user}, function (err, completeData) {

			if (completeData.length) {
				completeData.forEach(function (completeValue) {
					firstFilteredData.forEach(function (value) {
						if (value._id != completeValue.task_id) {
							filteredData.push(value)
						}
					});
				});

				return callback(filteredData);
			} else {

				return callback(firstFilteredData);
			}
		})
	})

}

module.exports = completeFilter;
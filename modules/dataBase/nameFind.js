var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');
var User = require('./models.js');

function nameFind(callback) {
	var data = [];
	User.find({}, function (err, data) {
			var nameData = [];
			data.forEach(function (value, index) {
				nameData[index] = {
					user_id: value._id,
					firstName: value.firstName,
					secondName: value.secondName,
					thirdName: value.thirdName
				};
			});
			return callback(nameData);
	});
}
module.exports = nameFind;
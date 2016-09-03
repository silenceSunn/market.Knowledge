var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');
var Task = require('./taskModel.js');

function taskInsert(id, cardData) {
	Task.update({_id: id}, {
		$unset: {
			employee: '',
			customer: ''
		}
	}, function (err) {
		if (err) throw err;

		Task.update({_id: id}, {
			$set: {
				cardName: cardData.cardName,
				longDescription: cardData.longDescription,
				shortDescription: cardData.shortDescription,
				reward: cardData.reward,
				deadline: cardData.deadline,
				customer: cardData.customer,
				employee: cardData.employee
			}
		}, function (err) {
			if (err) throw err;
		});
	});
}
module.exports = taskInsert;

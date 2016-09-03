var express = require('express');
var router = express.Router();

const crypto = require('crypto');

var mongoose = require('mongoose');


var Task = require('./../../modules/dataBase/taskModel.js');
var loadAdministrator = require('./../../modules/access/loadAdministrator.js');



router.route('/create_card')
	.get (loadAdministrator, function (req, res) {
		res.render('create_card.jade');
	})
	.post(function (req, res) {
		var cardData = req.body;
		Task.find({login: cardData.cardName}, function (task) {
			if (task) {
				res.redirect('/registr');
			} else {
				var newTask = new Task({
					cardName: cardData.cardName,
					longDescription: cardData.longDescription,
					shortDescription: cardData.shortDescription,
					reward: cardData.reward,
					deadline: cardData.deadline,
					customer: cardData.customer,
					employee: cardData.employee
				});
				newTask.save(function (err) {
					if (err) throw err;

				});
			}

		});
		res.redirect('/cards')
	});
module.exports = router;
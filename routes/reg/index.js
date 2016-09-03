var express = require('express');
var router = express.Router();

const crypto = require('crypto');

var mongoose = require('mongoose');

var User = require('./../../modules/dataBase/models.js');
var Invite = require('./../../modules/dataBase/inviteModel.js');

//======================================================================================================================

router.route('/registration')
	.get (function (req, res) {
		if ((req.session.status == 'customer') || (req.session.status == 'employee')) {
			res.render('registration.jade');
		} else {
			res.render('registration-new.jade');
		}

		if (req.session.status == 'administrator'){
			res.render('registration-admin.jade');
		}
	})
	.post(function (req, res) {

		var userData = req.body;
		console.error(userData);
		if (userData.userLogin && userData.userPassword) {
				Invite.find({invite: userData.userInvite}, function (err, inv) {
					if (err) console.error(err);
					if (inv.length > 0) {
						console.log ('invite ok!');
						User.find({login: userData.userLogin}, function (err, login) {
							if (err) console.error(err);
							if (!(login.length > 0)) {
								console.log ('login ok!');
								var userLogin = new User({
									login: userData.userLogin,
									hash: crypto.createHash('sha256').update(userData.userLogin.toString() + userData.userPassword.toString()).digest('hex'),
									firstName: userData.firstName,
									secondName: userData.secondName,
									thirdName: userData.thirdName,
									status: inv[0].status
								});
								Invite.remove({invite: userData.userInvite}, function (err){
									console.log('REMOVED SUCCESS')
								});
								userLogin.save(function (err, newInvite) {
									console.log('registration complete!');
								});
							}
						})
					}
					else {
						console.log('something is getting wrong...')
					}
				});
			//});
		}
		else {
			console.log('please, check the form');
		}
		res.redirect('/auth');
	});

module.exports = router;
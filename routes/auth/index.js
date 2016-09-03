var express = require('express');
var app = express();

var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var crypto = require('crypto');


var router = express.Router();


//=================================================================================
var cookieParser = require('cookie-parser');
var session = require('express-session');
router.use(cookieParser());


var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');

var MongoStore = require('connect-mongo')(session);

var User = require('./../../modules/dataBase/models.js');

router.route('/auth')
	.get (function (req, res) {
		res.render('auth.jade');
	})
	.post(function (req, res) {
			var userData = req.body;
			User.find({
				login: userData.userLogin,
				hash: crypto.createHash('sha256').update(userData.userLogin.toString() + userData.userPassword.toString()).digest('hex')
			}, function (err, login) {
				if (login.length > 0) {
					req.session.user = login[0]._id;
					req.session.status = login[0].status;
					req.session.save();
				}
				else {
				}
			});
		res.redirect('/cards');
	});
module.exports = router;
var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');


function loadAdministrator(req, res, next) {
	if (req.session.status == 'administrator') {
		next();
	} else {
		var userStatus = 'Access denied. Your status is ' + req.session.status + '. ' + 'You should log in as administrator.';
		res.end(userStatus);

	}
}

module.exports = loadAdministrator;
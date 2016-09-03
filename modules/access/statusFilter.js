var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');

function statusFilter(socket, data) {
	var filteredData = [];
	data.forEach(function (value, index) {
		if (value[socket.request.session.status]) {
			filteredData.push(value)
		}
	});
	return filteredData;
}

module.exports = statusFilter;
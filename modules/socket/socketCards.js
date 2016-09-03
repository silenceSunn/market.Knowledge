var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var cardData;

function socketCards(data) {
	cardData = data;
	console.log(data);
	io.on('connection', function (socket) {
		socket.emit('data', cardData);
		console.log('io= ', cardData);

	});
}

module.exports = socketCards;
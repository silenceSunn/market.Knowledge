$(function () {

	var socket = io.connect('http://localhost');

	socket.on('data', function (data) {
		console.log('SOCKET TEST! =', data)
	});
});
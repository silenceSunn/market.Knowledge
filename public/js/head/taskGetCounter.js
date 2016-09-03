$(function () {
	$('#_taskGet_Badge').text('');
	var socket = io.connect('http://localhost');

	socket.on('taskGetCounter', function (countData) {
		$('#_taskGet_Badge').text(countData);
	});
});
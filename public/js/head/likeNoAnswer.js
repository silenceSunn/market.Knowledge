$(function () {

	$('#_taskGet_Badge').text('');

	var socket = io.connect('http://localhost');

	socket.on('likeNoAnswer', function (countData) {
		$('#_likeNoAnswer_Badge').text(countData);
		$('#_likesView_Badge').text(countData);

	});

});
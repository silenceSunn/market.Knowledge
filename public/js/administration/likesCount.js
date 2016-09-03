$(function () {
	var socket = io.connect('http://localhost');
	socket.on('tasksGetCount', function (tasksGetCount) {
		for (var key in tasksGetCount) {
			$('#badge' + key).text(tasksGetCount[key])
		}
	});
});
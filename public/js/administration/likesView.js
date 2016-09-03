$(function () {
		var socket = io.connect('http://localhost');

		socket.on('tasksGetCount', function (tasksGetCount) {
			console.log('tasksGetCount', tasksGetCount);
			for (var key in tasksGetCount) {
				$('#card' + key).hide();
			}
		});
});
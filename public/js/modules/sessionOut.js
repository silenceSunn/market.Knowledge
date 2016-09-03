function sessionOut () {

	console.log('session out here!');

	var socket = io.connect('http://localhost');

	socket.on('statusIn', function(data){

		console.log(data);

		if (data == 'administrator') data = 'Вы авторизованы как администратор ▼';
		if (data == 'customer') data = 'Вы авторизованы как партнер ▼';
		if (data == 'employee') data = 'Вы авторизованы как сотрудник ▼';

		$('#defaultNavbar').text(data);
	});

}

sessionOut();
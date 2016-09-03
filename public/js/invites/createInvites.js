$('#_create_').on('click', function () {

	var socket = io.connect('http://localhost');
	$('#CreateInvite').modal('show');
	$('#applyClick').click(function () { //отправка формы по сокету
		var data = $('#form').serializeArray();
		socket.emit('invitesAmt', data);
	});
});
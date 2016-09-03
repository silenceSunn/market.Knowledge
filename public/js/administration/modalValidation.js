function modalValidation(data) {
	var counter = 0;
	for (var i = 0; i < 5; i++) {
		if (!(data[i].value)) {
			break;
		} else {
			counter++;
		}
	}

	if (counter == 5){
		console.log('SO DEEP!');
		$('#alert').hide();
		$('#CardEditModal').modal('hide');
		return true
	} else {
		$('#alert').show();
		return false
	}
}
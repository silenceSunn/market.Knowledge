function fullDescriptionModal(data) {
	$('[id^="card"]').on('click', function () {
		$('#taskModal').modal('show');

		var clickedCard = this.id.substring(4)

		data.forEach(function (value, index, arr) {
			if (value._id == clickedCard) {

				$('#taskNameModal').text(value.cardName);
				$('#rewardModal').text(value.reward + ' руб.');
				$('#longDescriptionModal').text(value.longDescription);
				$('#deadlineModal').text('Дедлайн: ' + value.deadline);
			}
		});

	});
}
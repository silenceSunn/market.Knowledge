$(function () {

	var socket = io.connect('http://localhost');

	var activeTab = '_complete_';


	var counter = 0;
	var monthIdentity = '#month' + activeTab;

	//изменен понрядок сокетов
	socket.on('completeTask', function (likeData) {
		createMonthHeaders(activeTab);
		socket.on('filteredData', function (data) {
			data.forEach(function (value) {
				likeData.forEach(function (likeDataValue) {

					if (value._id == likeDataValue.task_id) {
						counter++;
						$('#' + activeTab + 'Badge').text(counter);
						createCardsCommonComplete(value, monthIdentity, activeTab);

					}
				})
			});

			var activeLike = 'like' + activeTab;
			$('[id^="like_complete_"]').on('click', function (event) {
				event.stopPropagation();
				var index = this.id.substring((activeLike).length);
				socket.emit('clickedComplete', index, function () {
				});
				$(this).toggleClass('clickedComplete');
			});
			$('[id^="head"]').on('click', function () {
				$('#taskModal').modal('show');

				var clickedCard = this.id.substring(4);

				data.forEach(function (value, index, arr) {
					if (value._id == clickedCard) {
						$('#taskNameModal').text(value.cardName);
						$('#rewardModal').text(value.reward + ' руб.');
						$('#longDescriptionModal').text(value.longDescription);
						$('#deadlineModal').text('Дедлайн: ' + value.deadline);
					}
				});
			});
		});

	});
});

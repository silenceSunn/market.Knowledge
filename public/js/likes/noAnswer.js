$(function () {

	var socket = io.connect('http://localhost');


	var activeTab = '_noAnswer_';


	var counter = 0;
	var badgeIdentity = '#' + activeTab + 'Badge';
	var monthIdentity = '#month' + activeTab;


	socket.on('like', function (likeData) {
		socket.on('getTaskByUser', function (taskData) {
			socket.on('filteredData', function (data) {
				createMonthHeaders(activeTab);
				taskData.forEach(function (task) {
					likeData.forEach(function (likeDataValue, index) {

						if (likeDataValue == task.task_id) {

							likeData.splice(index, 1);
						}
					});


				});

				likeData.forEach(function (likeDataValue) {
					data.forEach (function (value) {


						if (value._id == likeDataValue) {
							counter++;
							$(badgeIdentity).empty();
							$(badgeIdentity).append(counter);

							var className = 'col-lg-10 col-md-9 gridCommon shadow centerText';
							createCardsCommon(className, value, monthIdentity, activeTab);
						}
					})
				});

				$('[id^="head"]').on('click', function () {
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

			});
		});
	})
})
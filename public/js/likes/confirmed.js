$(function () {

	var socket = io.connect('http://localhost');

	var activeTab = '_confirmed_';


	var badgeIdentity = '#' + activeTab + 'Badge';
	var monthIdentity = '#month' + activeTab;

	var counter = 0;

	socket.on('getTaskByUser', function (getTasksData) {
		socket.on('filteredData', function (data) {
			createMonthHeaders(activeTab);
			data.forEach(function (value) {
				getTasksData.forEach(function (getTasksValue) {
					if (getTasksValue.task_id == value._id) {
						counter++;
						$(badgeIdentity).empty();
						$(badgeIdentity).append(counter);
						var className = 'col-lg-10 col-md-9 gridCommon shadow centerText';
						createCardsCommonConfirmed(className, value, monthIdentity, activeTab);
					}
				})
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
			var activeLike = 'like' + activeTab;
			$('[id^="like_confirmed_"]').on('click', function (event) {
				event.stopPropagation();
				var index = this.id.substring((activeLike).length);
				socket.emit('clickedComplete', index, function () {
				});
				$(this).toggleClass('clickedComplete')
			});


		});


	});
});
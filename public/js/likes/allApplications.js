$(function () {

	var socket = io.connect('http://localhost');
	var activeTab = '_allApplications_';
	var counter = 0;
	var badgeIdentity = '#' + activeTab + 'Badge';
	var monthIdentity = '#month' + activeTab;

	socket.on('like', function (likeData) {
		socket.on('filteredData', function (data) {
			createMonthHeaders(activeTab);
			data.forEach(function (value) {
				likeData.forEach(function (likeDataValue) {
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
			//clickLike(socket, activeTab);
			var activeLike = 'like' + activeTab;
			$('[id^="like_allApplications_"]').on('click', function (event) {
				event.stopPropagation();
				var index = this.id.substring((activeLike).length);
				socket.emit('clickLike', index, function () {
				});
				$(this).toggleClass('clicked')
				if (!($(this).hasClass("clicked"))) {
					counter--;
					$(badgeIdentity).empty();
					$(badgeIdentity).append(counter);
				}

				else {
					counter++;

					$(badgeIdentity).empty();
					$(badgeIdentity).append(counter);
				}
			});
		});

	});


});

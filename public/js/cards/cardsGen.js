$(function () {

	var socket = io.connect('http://localhost');

	var activeTab = '_card_'

	createMonthHeaders(activeTab);


	socket.on('like', function (likeData) {
		socket.on('filteredData', function (data) {
			data.forEach(function (value, index, arr) {

				var month = new Date(value.deadline);
				month = month.getMonth();
				var taskElement = document.createElement('div');
				taskElement.className = 'col-md-5 panel panel-primary commonCards';
				taskElement.id = 'card' + value._id;

				var infoElementHeading = document.createElement('div');
				infoElementHeading.className = 'panel-heading row cardCursor';
				infoElementHeading.innerHTML = '<h3 class="cardName"> ' + value.cardName + '</h3>';
				infoElementHeading.id = 'head' + value._id;

				var infoElement = document.createElement('div');
				infoElement.className = 'panel-body';
				infoElement.innerHTML = '<p class="reward">' + value.reward + ' руб.</p>' +
					'<p class="shortDescription">' + value.shortDescription + '</p>' +
					'<p class="deadline">Дедлайн: ' + value.deadline + '</p>';


				var likeElement = document.createElement('div');
				likeElement.className = 'glyphicon glyphicon-heart likeIcons';
				likeElement.id = 'like' + activeTab + value._id;

				function createCards() {
					$('#month' + activeTab + month).append(taskElement);
					taskElement.appendChild(infoElementHeading);
					taskElement.appendChild(infoElement);
					taskElement.appendChild(likeElement);

				}

				if ($('#month' + activeTab + month).is(':visible')) {
					createCards();
				} else {
					$('#month' + activeTab + month).show();
					createCards(); //мля, тут такое для наглядности.
				}


			});

			likeData.forEach(function (value, index, arr) {
				$('#like' + activeTab + value).toggleClass('clicked');
			});


			var like = 'like' + activeTab;
			$('[id^="like_card_"]').click(function () {
				var index = this.id.substring(like.length);
				socket.emit('clickLike', index, function () {
				});
				$(this).toggleClass('clicked')
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

});
$(function () {

	var socket = io.connect('http://localhost');
	var sumValue = []; //для подсчета суммы вознаграждения за квартал
	sumValue[1] = 0;
	sumValue[2] = 0;
	sumValue[3] = 0;
	sumValue[4] = 0;

	var activeTab = '_kvartalView_';


	socket.on('like', function (likeData) {
		socket.on('filteredData', function (data) {
			createKvartHeaders(activeTab);
			data.forEach(function (value, index, arr) {

				var month = new Date(value.deadline);
				month = month.getMonth() + 1;
				month = Math.ceil(month / 3)
				var taskElement = document.createElement('div');
				taskElement.className = 'col-md-5 panel panel-primary commonCards';
				taskElement.id = 'card' + value._id;

				var infoElementHeading = document.createElement('div');
				infoElementHeading.className = 'panel-heading row cardCursor';
				infoElementHeading.innerHTML = '<h3 class="cardName"> ' + value.cardName + '</h3>'
				infoElementHeading.id = 'head' + value._id;

				var infoElement = document.createElement('div');
				infoElement.className = 'panel-body';
				infoElement.innerHTML = '<p class="reward">' + value.reward + ' руб.</p>' +
					'<p class="shortDescription">' + value.shortDescription + '</p>' +
					'<p class="deadline">Дедлайн: ' + value.deadline + '</p>';


				var likeElement = document.createElement('div');
				likeElement.className = 'glyphicon glyphicon-heart likeIcons';
				likeElement.id = 'like' + activeTab + value._id;
				sumValue[month] += Number(value.reward);





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

			for (var index = 1; index <= 4; index++) {
				var resultElement = document.createElement('div');
				resultElement.className = 'col-md-12 label label-primary';
				resultElement.innerHTML = '<h4>Всего: ' + sumValue[index] + ' руб.</h4>';
				$('#labelmonth' + activeTab + index).append(resultElement);
			}

			likeData.forEach(function (value, index, arr) {
				$('#like' + activeTab + value).toggleClass('clicked');
			});


			var like = 'like' + activeTab;
			$('[id^="like_kvartalView_"]').click(function () {
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
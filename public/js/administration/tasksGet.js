$(function () {
	var socket = io.connect('http://localhost');
	var activeTab = '_card_';
	var changeCard = 'changeCard';
	var deleteCard = 'deleteCard';
	var counter = 0;

	socket.on('data', function (data) {
		createMonthHeaders(activeTab);
		data.forEach(function (value, index, arr) {

			var month = new Date(value.deadline);
			month = month.getMonth();


			var taskElement = document.createElement('div');
			taskElement.className = 'col-md-11 panel panel-primary commonCards';
			taskElement.id = 'card' + value._id;

			var infoElementHeading = document.createElement('div');
			infoElementHeading.className = 'panel-heading row cardCursor';
			infoElementHeading.innerHTML = '<h3 class="cardName">' + value.cardName + '</h3>'
			infoElementHeading.id = 'head' + value._id;

			var infoElement = document.createElement('div');
			infoElement.className = 'panel-body';
			infoElement.innerHTML = '<p class="reward">' + value.reward + ' руб.</p>' +
				'<p class="shortDescription">' + value.shortDescription + '</p>' +
				'<p class="deadline">Дедлайн: ' + value.deadline + '</p>';


			var editElement = document.createElement('div');
			editElement.id = changeCard + value._id;
			editElement.className = 'glyphicon glyphicon-pencil likeIcons';

			var badgeElement = document.createElement('a');
			badgeElement.id = 'badge' + value._id;
			badgeElement.className = 'badge';


			var deleteElement = document.createElement('div');
			deleteElement.id = deleteCard + value._id;
			deleteElement.className = 'glyphicon glyphicon-trash likeIcons';

			var formLikeElement = document.createElement('div');
			formLikeElement.className = ('form-group');

			var labelLikeElement = document.createElement('label');
			labelLikeElement.className = ('col-md-2 control-label tasksGetName');
			labelLikeElement.innerHTML = 'Задание на выполнении: ';


			var divLikeElement = document.createElement('div');
			divLikeElement.className = ('col-md-10');

			var getElement = document.createElement('select');
			getElement.id = 'get' + value._id;
			getElement.className = 'form-control';

			var optionElement = document.createElement('option');
			optionElement.value = '';
			optionElement.innerHTML = 'Выбрать нового пользователя';


			var giveClickElement = document.createElement('a');
			giveClickElement.id = 'giveTask' + value._id;
			giveClickElement.className = 'btn btn-primary';
			giveClickElement.innerHTML = 'Выбрать пользователя';


			function createCardsINTASKGET() {
				$('#month' + activeTab + month).append(taskElement);
				taskElement.appendChild(infoElementHeading);
				infoElementHeading.appendChild(badgeElement);
				taskElement.appendChild(infoElement);
				taskElement.appendChild(editElement);
				taskElement.appendChild(deleteElement);
				taskElement.appendChild(formLikeElement);
				formLikeElement.appendChild(labelLikeElement);
				formLikeElement.appendChild(divLikeElement);
				divLikeElement.appendChild(getElement);
				getElement.appendChild(optionElement);
				taskElement.appendChild(giveClickElement);

				counter++;
				$('#' + activeTab + 'Badge').text(counter);
			}

			if ($('#month' + activeTab + month).is(':visible')) {
				createCardsINTASKGET();

			} else {
				$('#month' + activeTab + month).show();
				createCardsINTASKGET();
			}
		});

		socket.on('likeAdmin', function (likeData) {
			socket.on('names', function (nameData) {
				likeData.forEach(function (value) {
					value.task_id.forEach(function (tasksId) {
						nameData.forEach(function (nameValue, index) {

							if (nameValue.user_id == value.user_id) {

								var likeElement = document.createElement('option');
								likeElement.id = 'like' + tasksId + value.user_id;
								//likeElement.className = '';
								likeElement.value = tasksId + value.user_id;
								likeElement.innerHTML = nameValue.secondName + ' ' + nameValue.firstName + ' ' + nameValue.thirdName;

								$('#get' + tasksId).append(likeElement);
							}
						})
					});
				});
			});
		});

		socket.on('getTask', function (likeData) {
			socket.on('names', function (nameData) {
				likeData.forEach(function (value) {

					nameData.forEach(function (nameValue, index) {

						if (nameValue.user_id == value.user_id) {
							var getTaskName = document.createElement('div');
							getTaskName.id = 'getTaskName' + value.task_id;
							getTaskName.className = 'label label-success tasksGetName';
							getTaskName.innerHTML = nameValue.secondName + ' ' + nameValue.firstName + ' ' + nameValue.thirdName;

							//$('#get' + value.task_id).val(value.task_id + value.user_id).change();
							$('#get' + value.task_id).before(getTaskName);
						}
					});
				});
			})
		});
		socket.on('names', function (nameData) {
			$('[id^="giveTask"]').on('click', function () { //нажатие на кнопку подтверждения Имеет id задания
				var index = 0;
				var taskVal = 0;
				index = this.id.substring(8);
				var getIndex = 'get' + index;
				taskVal = $('#' + getIndex).val(); //имеет id пользователя
				if ((index) && (taskVal)) {
					socket.emit('clickGetTask', taskVal.substring(index.length), index, function () { //на этом момента fix, в послеующих операциях имена
						//соответствуют наоборот
					})
				}

				var taskValElem = 0;
				nameData.forEach(function (nameValue) {
					if (taskVal.substring(index.length) == nameValue.user_id) {
						taskValElem = nameValue;
					}
				});

				if (taskVal) {

					if ($('#getTaskName' + index).text() == (taskValElem.secondName + ' ' + taskValElem.firstName + ' ' + taskValElem.thirdName)) {
						$('#getTaskName' + index).remove();

					} else {
						$('#getTaskName' + index).remove();

						var getTaskName = document.createElement('div');
						getTaskName.id = 'getTaskName' + index;
						getTaskName.className = 'label label-success tasksGetName';
						getTaskName.innerHTML = taskValElem.secondName + ' ' + taskValElem.firstName + ' ' + taskValElem.thirdName;

						$('#get' + index).before(getTaskName);
					}
				}
			})
		});

		$('[id^="changeCard"]').on('click', function () {

			var index = this.id.substring(changeCard.length);
			socket.emit('clickTaskEdit', index, function (confirmation) {
				$('#CardEditModal').modal('show');
				socket.on('cardEdit', function (data) {
					$('#CardName').val(data.cardName);
					$('#longDescription').val(data.longDescription);
					$('#shortDescription').val(data.shortDescription);
					$('#reward').val(data.reward);
					$('#deadline').val(data.deadline);
					if (data.customer) {
						$('#customer').prop('checked', true);
					} else {
						$('#customer').prop('checked', false);
					}
					if (data.employee) {
						$('#employee').prop('checked', true);
					} else {
						$('#employee').prop('checked', false);
					}
				})
			});
			$('#applyClick').click(function () { //отправка формы по сокету
				var data = $('#form').serializeArray();
				if (modalValidation(data)) {
					socket.emit('taskInsert', data, index);
				}

				$('#cancelClick').click(function () {
					$('#alert').hide();
				});

			});
		});


		$('[id^=deleteCard]').on('click', function () {
			var index = this.id.substring(deleteCard.length);
			socket.emit('taskRemove', index);
			$('#card' + index).remove();
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
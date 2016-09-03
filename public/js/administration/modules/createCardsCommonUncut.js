function createCardsCommonUncut(value, monthIdentity, activeTab) {

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

	var badgeElement = document.createElement('div');
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
		$(monthIdentity + month).append(taskElement);
		taskElement.appendChild(infoElementHeading);
		taskElement.appendChild(badgeElement);
		taskElement.appendChild(infoElement);
		taskElement.appendChild(editElement);
		taskElement.appendChild(deleteElement);
		taskElement.appendChild(formLikeElement);
		formLikeElement.appendChild(labelLikeElement);
		formLikeElement.appendChild(divLikeElement);
		divLikeElement.appendChild(getElement);
		getElement.appendChild(optionElement);
		taskElement.appendChild(giveClickElement);
	}

	if ($(monthIdentity + month).is(':visible')) {
		createCardsINTASKGET();

	} else {
		$(monthIdentity + month).show();
		createCardsINTASKGET();
	}
}

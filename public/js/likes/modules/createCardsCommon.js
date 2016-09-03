//этот модуль только для confirmed.js, остальныке подтягивают из /public/modules
function createCardsCommonConfirmed(className, value, monthIdentity, activeTab) {

	var likeId = 'like' + activeTab + value._id;

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


	var likeElement = document.createElement('div');
	likeElement.className = 'glyphicon glyphicon-star completelikeIcons';
	likeElement.id = likeId;

	function createCards() {
		$(monthIdentity + month).append(taskElement);
		taskElement.appendChild(infoElementHeading);
		taskElement.appendChild(infoElement);
		taskElement.appendChild(likeElement);
		//$('#' + likeId).toggleClass('clickedComplete'); //все прокликиваются

	}


	if ($(monthIdentity + month).is(':visible')) {
		createCards();
	} else {
		$(monthIdentity + month).show();
		createCards(); //мля, тут такое для наглядности.
	}
}
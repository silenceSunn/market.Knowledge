function createCardsCommon(className, value, activeTab) {

	var taskElement = document.createElement('li');
	taskElement.className = 'panel panel-default panel-body';
	taskElement.innerHTML = '<p>invite: ' + value.invite + '</p>';

	function createCards() {
		$('#' + activeTab + 'List').append(taskElement);
	}

	createCards();
}
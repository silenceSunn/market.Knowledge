function createMonthHeaders(activeTab){
	//socket.io будет подключаться раньше.
	//надо изежать конфликта имен в month
	var dateNow = new Date();
	dateNow = dateNow.getMonth();
	var monthName = [];
	var monthNow = 0;
	monthName[0] = 'Январь';
	monthName[1] = 'Февраль';
	monthName[2] = 'Март';
	monthName[3] = 'Апрель';
	monthName[4] = 'Май';
	monthName[5] = 'Июнь';
	monthName[6] = 'Июль';
	monthName[7] = 'Август';
	monthName[8] = 'Сентябрь';
	monthName[9] = 'Октябрь';
	monthName[10] = 'Ноябрь';
	monthName[11] = 'Декабрь';

	//activeTab передается здесь, а используется в createMonth
	for (var indexOne = 0; indexOne < 12; indexOne++){
		monthNow = dateNow + indexOne;
			createMonth(monthNow, activeTab, monthName);
		if (monthNow == 11) {
			for (var indexTwo = 0; indexTwo < dateNow; indexTwo++){
				createMonth(indexTwo, activeTab, monthName)
			}
			break;
		}

	}
}

function createMonth(month, activeTab, monthName){// где month - indexTwo или monthNow
	var monthElementId = 'month' + activeTab + month;
	var monthFatherElement = document.createElement('div');
	//monthFatherElement.className = 'col-md-10';
	monthFatherElement.id = monthElementId;

	var monthElement = document.createElement('div');
	monthElement.className = 'col-md-12 label label-primary';
	monthElement.innerHTML = '<h2>' + monthName[month] + '</h2>';

	$('#' + activeTab + 'List').append(monthFatherElement);
	monthFatherElement.appendChild(monthElement);
	$('#' + monthElementId).hide()

}
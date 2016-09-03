$(function () {

	var socket = io.connect('http://localhost');
	var activeTab = '_employee_';
	var counter = 0;
	var badgeIdentity = '#' + activeTab + 'Badge';
	socket.on('inviteSocket', function (inviteData) {
		inviteData.forEach(function (value) {
			if (value.status == 'employee') {
				counter++;
				$(badgeIdentity).empty();
				$(badgeIdentity).append(counter);
				var className = 'col-lg-10 col-md-9 gridCommon shadow centerText';
				createCardsCommon(className, value, activeTab);
			}
		});


	});


});

$(function () {

	var socket = io.connect('http://localhost');

	socket.on('tasksGetCount', function (tasksGetCounts) {

		$('#_card_').on('click', function () {
			$('#_card_List').show();
			$('[id^="card"]').show();
			$('#_complete_List').hide();
			$('#_complete_').removeClass('btn-primary');
			$('#_likesView_').removeClass('btn-primary');
			$('#_card_').addClass('btn-primary');
		});

		$('#_likesView_').on('click', function () {
			$('#_card_List').show();
			//$('[id^="month_card_"]').hide();
			$('[id^="card"]').each(function () {
				$(this).hide();
				for (var key in tasksGetCounts) {
					if ((this.id == ('card' + key)) && !($("div").is('#getTaskName' + key))) {
						$(this).show();

					}
				}
			});
			$('#_complete_List').hide();
			$('#_complete_').removeClass('btn-primary');
			$('#_card_').removeClass('btn-primary');
			$('#_likesView_').addClass('btn-primary');
		});

		$('#_complete_').on('click', function () {
			$('#_complete_List').show();
			$('#_card_List').hide();
			$('#_card_').removeClass('btn-primary');
			$('#_likesView_').removeClass('btn-primary');
			$('#_complete_').addClass('btn-primary');
		});
	});

});
function clickLike (socket, activeTab) {
	var activeLike = 'like' + activeTab;
	$('[id^=activeLike').on('click', function (event) {
		event.stopPropagation();
		var index = this.id.substring((activeLike).length);
		socket.emit('clickLike', index, function () {
		});
		$(this).toggleClass('clicked')
	});
}
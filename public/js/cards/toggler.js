$(function() {
	$('#toggle-event').change(function() {
		if($(this).prop('checked')){
			$('#cardList').show();
			$('#kvartList').hide();
		} else {
			$('#cardList').hide();
			$('#kvartList').show();
		}
	})
});
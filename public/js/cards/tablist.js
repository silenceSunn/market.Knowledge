$(function() {
	$('#_card_').on('click', function () {
		$('#_card_List').show();
		$('#_kvartalView_List').hide();
		$('#_kvartalView_').removeClass('btn-primary');
		$('#_card_').addClass('btn-primary');
	});

	$('#_kvartalView_').on('click', function () {
		$('#_kvartalView_List').show();
		$('#_card_List').hide();
		$('#_card_').removeClass('btn-primary');
		$('#_kvartalView_').addClass('btn-primary');
	});
});
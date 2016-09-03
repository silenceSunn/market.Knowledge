$(function() {
	$('#_allApplications_').on('click', function(){
		$('#_allApplications_List').show();
		$('#_confirmed_List').hide();
		$('#_noAnswer_List').hide();
		$('#_confirmed_').removeClass('btn-primary');
		$('#_noAnswer_').removeClass('btn-primary');
		$('#_allApplications_').addClass('btn-primary');
	});

	$('#_confirmed_').on('click', function(){
		$('#_confirmed_List').show();
		$('#_noAnswer_List').hide();
		$('#_allApplications_List').hide();
		$('#_allApplications_').removeClass('btn-primary');
		$('#_noAnswer_').removeClass('btn-primary');
		$('#_confirmed_').addClass('btn-primary');

	});

	$('#_noAnswer_').on('click', function(){
		$('#_noAnswer_List').show();
		$('#_confirmed_List').hide();
		$('#_allApplications_List').hide();
		$('#_confirmed_').removeClass('btn-primary');
		$('#_allApplications_').removeClass('btn-primary');
		$('#_noAnswer_').addClass('btn-primary');
	});
});
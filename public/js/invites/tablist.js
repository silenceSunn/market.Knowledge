$(function() {
	$('#_administrator_').on('click', function(){
		$('#_administrator_List').show();
		$('#_customer_List').hide();
		$('#_employee_List').hide();
		$('#_customer_').removeClass('btn-primary');
		$('#_employee_').removeClass('btn-primary');
		//$('#_create_').removeClass('success');
		$('#_administrator_').addClass('btn-primary');
	});

	$('#_customer_').on('click', function(){
		$('#_customer_List').show();
		$('#_employee_List').hide();
		$('#_administrator_List').hide();
		$('#_administrator_').removeClass('btn-primary');
		$('#_employee_').removeClass('btn-primary');
		$('#_customer_').addClass('btn-primary');

	});

	$('#_employee_').on('click', function(){
		$('#_employee_List').show();
		$('#_customer_List').hide();
		$('#_administrator_List').hide();
		$('#_customer_').removeClass('btn-primary');
		$('#_administrator_').removeClass('btn-primary');
		$('#_employee_').addClass('btn-primary');
	});
});
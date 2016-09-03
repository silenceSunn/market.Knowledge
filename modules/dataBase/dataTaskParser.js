function dataParser (data){
	var parsedData = {};
	var cardName = 'cardName';
	var longDescription = 'longDescription';
	var shortDescription = 'shortDescription';
	var reward = 'reward';
	var deadline = 'deadline';
	var employee = 'employee';
	var customer = 'customer';

	data.forEach(function (dataEach, index){
		if (dataEach.name == cardName) parsedData[cardName] = dataEach.value;
		if (dataEach.name == longDescription) parsedData[longDescription] = dataEach.value;
		if (dataEach.name == shortDescription) parsedData[shortDescription] = dataEach.value;
		if (dataEach.name == reward) parsedData[reward] = dataEach.value;
		if (dataEach.name == deadline) parsedData[deadline] = dataEach.value;
		if (dataEach.name == employee) parsedData[employee] = true;
		if (dataEach.name == customer) parsedData[customer] = true;
	});

	return (parsedData);

}
module.exports = dataParser;
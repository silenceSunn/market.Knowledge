function inviteParser (data) {
	var parsedData = {};
	parsedData.employee = data[0].value;
	parsedData.customer = data[1].value;
	parsedData.administrator = data[2].value;
	return (parsedData);
}
module.exports = inviteParser;
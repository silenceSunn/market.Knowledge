var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');
var Invite = require('./../../modules/dataBase/inviteModel.js');
const crypto = require('crypto');

var keySize = 15;
var existsLimit = 10;

function inviteSchemaCreateAndSave(buf, inviteField) {
	var newInvite = new Invite({
		invite: buf,
		status: inviteField
	});
	newInvite.save(function (err) {
		if (err) throw err;
	});

}

function inviteInsert(inviteData, inviteField) {

	if ([inviteField] in inviteData) {

		for (var i = 0; i < inviteData[inviteField]; i++) {


			crypto.randomBytes(keySize, (err, buf) => {
				if (err) throw err;

				buf = buf.toString('hex');
				var data = 0;
				Invite.find({invite: buf}, function (data) {
					if (data) {
						var flag = 0;
						for (var errorCounter = 0; errorCounter < existsLimit; errorCounter++) {
							crypto.randomBytes(keySize, (err, bufRepeat) => { //ecma 6
								if (err) throw err;
								bufRepeat = bufRepeat.toString('hex');
								Invite.find({invite: bufRepeat}, function (data) {
									if (data) {
										console.log();
									}
									else {
										inviteSchemaCreateAndSave(bufRepeat, inviteField);
										console.log('regeneration complete, but the database maybe is full');
										flag = 1;

									}
								});
							});
							if (flag) break;
							if (errorCounter == existsLimit) {
								console.error('ERROR. It is impossible to generate a new key. Perhaps the database is full')
							}

						}
					}
					else {
						inviteSchemaCreateAndSave(buf, inviteField)
					}
				});
			});
		}
	}
}


function createInvites(inviteData) {

	console.log('createInvites');

	inviteInsert(inviteData, 'employee');
	inviteInsert(inviteData, 'customer');
	inviteInsert(inviteData, 'administrator');
}

module.exports = createInvites;
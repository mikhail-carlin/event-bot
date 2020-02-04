var userModel = require('../models/userModel');

function getAll(callback) {
	userModel.find({}, (err, users) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, users);
		}
	})
}

function isNew(telegramId, callback) {
	userModel.findOne({ telegramId: telegramId }, (err, existingUser) => {
		if (err) {
			callback(err, null);
			return;
		}

		if (existingUser) {
			callback(null, false);
		} else {
			callback(null, true);
		}
	});
}

function saveUser(userInfo, callback) {
	isNew(userInfo.telegramId, (err, result) => {
		if (err) {
			callback(err, null);
			return;
		}

		if (result) {
			var newUserDto = new userModel({
				telegramId: userInfo.telegramId,
				fistName: userInfo.firstName,
				lastName: userInfo.lastName
			});

			newUserDto.save((err) => {
				if (err) {
					callback(err, null);
				} else {
					callback(null, true);
				}
			});
		} else {
			callback(null, false);
		}
	})
}

module.exports = {
	getAll,
	isNew,
	saveUser
};
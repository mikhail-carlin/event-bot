var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	telegramId: String,
	fistName: String,
	lastName: String
});

var User = mongoose.model('user', UserSchema);

module.exports = User;
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VoteSchema = new Schema({
	telegramId: String,
	question: String,
	answer: String,
	time: String
});

var Vote = mongoose.model('vote', VoteSchema);

module.exports = Vote;

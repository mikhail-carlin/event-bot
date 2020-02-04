var voteModel = require('../models/voteModel');

function getAll(callback) {
	voteModel.find({}, (err, votes) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, votes);
		}
	})
}

function isNew(telegramId, question, callback) {
	voteModel.findOne({ telegramId: telegramId, question: question }, (err, existingVote) => {
		if (err) {
			callback(err, null);
			return;
		}
		if (existingVote) {
			callback(null, false);
		} else {
			callback(null, true);
		}
	});
}

function saveVote(voteInfo, callback) {
	isNew(voteInfo.telegramId, voteInfo.question, (err, result) => {
		if (err) {
			callback(err, null);
			return;
		}

		if (result) {
			var newVoteDto = new voteModel({
				telegramId: voteInfo.telegramId,
				question: voteInfo.question,
				answer: voteInfo.answer,
				time: voteInfo.time
			});

			newVoteDto.save((err) => {
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
	saveVote
};

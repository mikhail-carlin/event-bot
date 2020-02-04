var botUtils = require('../botUtils');
var messagesService = require('../../services/messageService');
var voteService = require('../../services/voteService');

function addVoteHandler(bot, messageOptions) {
	bot.on('callback_query', (query) => {
		var clientInfo = botUtils.getClientInfo(query);
		var lastMessageText = botUtils.getLastMessageText(query);

		if (query.data === 'yes' || query.data === 'no') {
			var voteInfo = {
				telegramId: clientInfo.telegramId,
				question: lastMessageText,
				answer: query.data,
				time: Date.now().toString()
			};

			voteService.saveVote(voteInfo, (saveErr, _) => {
				if (saveErr) {
					bot.sendMessage(clientInfo.telegramId, 'Some error! Sorry', messageOptions);
					return;
				}
				messagesService.getByTitle('thanks', (err, message) => {
					if (err) {
						bot.sendMessage(clientInfo.telegramId, 'Some error! Sorry', messageOptions);
					} else {
						bot.sendMessage(clientInfo.telegramId, message.text, messageOptions);
					}
				});
			});
		}
	});
}

module.exports = addVoteHandler;
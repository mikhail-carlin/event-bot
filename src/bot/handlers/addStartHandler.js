var botUtils = require('../botUtils');
var messagesService = require('../../services/messageService');
var userService = require('../../services/userService');

function addStartHandler(bot, messageOptions) {
	var clientMessage = new RegExp('\/start');

	bot.onText(clientMessage, (query, _) => {
		var clientInfo = botUtils.getClientInfo(query);

		userService.saveUser(clientInfo, (saveErr, _) => {
			if (saveErr) {
				bot.sendMessage(clientInfo.telegramId, 'Some error! Sorry', messageOptions);
				return;
			}

			messagesService.getByTitle('start', (getErr, message) => {
				if (getErr) {
					bot.sendMessage(clientInfo.telegramId, 'Some error! Sorry', messageOptions);
				} else {
					bot.sendMessage(clientInfo.telegramId, message.text, messageOptions);
				}
			});
		});
	});
}

module.exports = addStartHandler
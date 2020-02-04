var botUtils = require('../botUtils');
var messagesService = require('../../services/messageService');

function addCalendarHandler(bot, messageOptions) {
	bot.on('callback_query', (query) => {
		var clientInfo = botUtils.getClientInfo(query);

		if (query.data === 'calendar') {
			messagesService.getByTitle('calendar', (err, message) => {
				if (err) {
					bot.sendMessage(clientInfo.telegramId, 'Some error! Sorry', messageOptions);
				} else {
					bot.sendMessage(clientInfo.telegramId, message.text, messageOptions);
				}
			});
		}
	});
}

module.exports = addCalendarHandler;
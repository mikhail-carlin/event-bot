var TelegramBot = require('node-telegram-bot-api');
var botUtils = require('./botUtils');
var addCalendarHandler = require('./handlers/addCalendarHandler');
var addStartHandler = require('./handlers/addStartHandler');
var addVoteHandler = require('./handlers/addVoteHandler');

function createBot(token, buttonNames) {
	var bot = new TelegramBot(token, { polling: true });

	bot.on("polling_error", (m) => console.log(m));

	var buttons = [
		botUtils.buildDefaultButton(buttonNames.calendar, 'calendar'),
		botUtils.buildShareButton(buttonNames.shareText, buttonNames.shareUrl),
		botUtils.buildUrlButton(buttonNames.linkText, buttonNames.linkUrl)
	];

	var messageOptions = botUtils.buildMessageOptions(buttons);

	addCalendarHandler(bot, messageOptions);
	addStartHandler(bot, messageOptions);
	addVoteHandler(bot, messageOptions);

	return bot;
}

module.exports = createBot
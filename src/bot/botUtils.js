
function getClientInfo(message) {
	return {
		firstName: message.from.first_name,
		lastName: message.from.last_name,
		telegramId: message.hasOwnProperty('chat') ? message.chat.id : message.from.id
	};
}

function getLastMessageText(message) {
	return message.message.text;
}

function buildDefaultButton(text, callback_data) {
	return [{
		text: text,
		callback_data: callback_data
	}]
}

function buildUrlButton(text, url) {
	return [{
		text: text,
		url: url
	}]
}

function buildShareButton(text, shareUrl) {
	return [{
		text: text,
		url: 'https://telegram.me/share/url?url=' + shareUrl
	}]
}

function buildMessageOptions(buttons) {
	return {
		parse_mode: "HTML",
		disable_web_page_preview: false,
		reply_markup: JSON.stringify({
			inline_keyboard: buttons
		})
	}
}

function buildMessageOptionsForVoting() {
	return {
		parse_mode: "HTML",
		disable_web_page_preview: false,
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{ text: 'Да', callback_data: 'yes' }, { text: 'Нет', callback_data: 'no' }]
			]
		})
	};
}

module.exports = {
	getClientInfo,
	getLastMessageText,
	buildDefaultButton,
	buildUrlButton,
	buildShareButton,
	buildMessageOptions,
	buildMessageOptionsForVoting
};
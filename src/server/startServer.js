var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var userService = require('../services/userService');
var voteService = require('../services/voteService');
var botUtils = require('../bot/botUtils');

var bot;

function votingController(request, response) {
	var message = request.body.message;

	userService.getAll((err, users) => {
		if (err) {
			console.log(err.message);
			return;
		}

		var messageOptionsForOptions = botUtils.buildMessageOptionsForVoting();

		users.forEach((user) => {
			bot.sendMessage(user.telegramId, message, messageOptionsForOptions);
		});
	});

	response.redirect('/');
}

function privateMessage(request, response) {
	var user = request.body.user;
	var message = request.body.message;

	bot.sendMessage(user, message, {});

	response.redirect('/');
}

function globalMessageController(request, response) {
	var message = request.body.message;

	userService.getAll((err, users) => {
		if (err) {
			console.log(err.message);
			return;
		}

		users.forEach((user) => {
			bot.sendMessage(user.telegramId, message, {});
		})
	});

	response.redirect('/');
}

function homeController(_, response) {
	userService.getAll((getUsersErr, users) => {
		if (getUsersErr) {
			console.log(getUsersErr.message);
			return;
		}

		voteService.getAll((getVotesErr, votes) => {
			if (getVotesErr) {
				console.log(getVotesErr.message);
				return;
			}

			response.render('main', { users: users, votes: votes });
		});
	});
}

function startServer(bot) {
	bot = bot;

	var app = express();
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.set('views', path.join(__dirname, './views'));
	app.set('view engine', 'ejs');

	app.get('/', homeController);
	app.post('/globalmessage', globalMessageController);
	app.post('/privatemessage', privateMessage);
	app.post('/voting', votingController);

	var port = process.env.PORT || 5000;
	app.listen(port, function () {
		console.log(`Server started at ${port}`);
	});
}

module.exports = startServer;
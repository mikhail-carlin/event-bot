var mongoose = require('mongoose');
var startServer = require('./server/startServer');
var createBot = require('./bot/createBot');
var fs = require('fs');

var configs = JSON.parse(fs.readFileSync('./src/config.json', 'utf8'));
var config = process.env.NODE_ENV === 'production'
	? configs.production
	: configs.development;

mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

var bot = createBot(config.telegramToken, config.buttonNames);

startServer(bot);
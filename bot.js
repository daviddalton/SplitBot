var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
		var steamID = args[1];
       
        args = args.splice(1);
        switch(cmd) {
            case 'doc':
                bot.sendMessage({
                    to: channelID,
                    message: 'Doc is throwing my game!'
                });
				break;
			case 'lifetime':
				const request = require('request');

				request('REVOKED FOR SECURITY', { json: true }, (err, res, body) => {
					if (err) { return console.log(err); }
					console.log(body);
				});
				break;
			case 'timeout':
				bot.sendMessage({
				to: channelID,
				message: 'https://gph.is/297VPgz'
				})
            break;
         }
     }
});


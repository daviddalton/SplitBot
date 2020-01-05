import { Client } from 'discord.io';
import logger from 'winston';
import config from '../config.json';
import axios from 'axios';

export class SplitBot {
  private client: Client;

  constructor() {
    this.client = new Client({
      token: config.discordAuthToken,
      autorun: true
    });

    logger.remove(logger.transports.Console);
    logger.add(new logger.transports.Console());
    logger.level = 'debug';
  }

  public start() {
    this.client.on('ready', (evt) => {
      logger.info('Connected');
      logger.info('Logged in as: ');
      logger.info(this.client.username + ' - (' + this.client.id + ')');
    });

    this.client.on('message', (user, userID, channelID, message, evt) => {
      // Our bot needs to know if it will execute a command
      // It will listen for messages that will start with `!`
      if (message.substring(0, 1) === '!') {
        let args = message.substring(1).split(' ');
        const cmd = args[0];
        const steamID = args[1];
        args = args.splice(1);
        switch (cmd) {
          case 'doc': // TODO: abstract these to dedicated functions to increase readability
            this.client.sendMessage({
              to: channelID,
              message: 'Doc is throwing my game!'
            });
            break;
          case 'lifetime':
            axios.get('/API_URL', {}).then((res) => {
              logger.log(res.data);
            })
            .catch((err) => {
              if (err) { return logger.log(err); }
            });
            break;
          case 'timeout':
            this.client.sendMessage({
              to: channelID,
              message: 'https://gph.is/297VPgz'
            });
            break;
        }
      }
    });
  }
}

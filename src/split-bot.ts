import { Client } from 'discord.io';
import logger from 'winston';
import config from '../config.json';
import axios, { AxiosResponse } from 'axios';
import { SplitGatePlayer } from './models/split-gate-player.model.js';

export class SplitBot {
  private client: Client;

  constructor() {
    this.client = new Client({
      token: config.discordAuthToken,
      autorun: true
    });

    logger.remove(logger.transports.Console);
    logger.add(new logger.transports.Console());
    logger.level = 'info';
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
            const url = `${config.splitGateTrackerBaseUrl}/profile/steam/${steamID}?TRN-Api-Key=${config.trackerNetworkApiKey}`;
            axios.get(url, {}).then((res: AxiosResponse<{ data: SplitGatePlayer }>) => {
              const player = res.data.data;
              logger.info(player);
            })
            .catch((err) => {
              logger.error(err);
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

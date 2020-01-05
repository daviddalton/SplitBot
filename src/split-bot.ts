import { Client } from 'discord.io';
import logger from 'winston';
import config from '../config.json';
import axios, { AxiosResponse } from 'axios';
import { SplitGatePlayer } from './models/split-gate-player.model.js';

export class SplitBot {
  private client: Client;
  private timeoutServerId: string = '';
  private commands = {
    'doc': (messageState, args) => {
      this.client.sendMessage({
        to: messageState.channelID,
        message: 'Doc is throwing my game!',
      });
    },
    'lifetime': (messageState, args) => {
      const steamID = args[0];
      const url = `${config.splitGateTrackerBaseUrl}/profile/steam/${steamID}?TRN-Api-Key=${config.trackerNetworkApiKey}`;
      axios.get(url, {}).then((res: AxiosResponse<{ data: SplitGatePlayer }>) => {
        const player = res.data.data;
        logger.info(player);
      })
      .catch((err) => {
        logger.error(err);
      });
    },
    'timeout': (messageState, args) => {
      if (!this.timeoutServerId) {
        this.client.sendMessage({
          to: messageState.channelID,
          message: 'Timeout Server ID is not setup yet. Use command: `setup-timeout <voice-channel-id>`',
        });
        return;
      }
      const cleanUserId = (args[0] as string).replace(/[^0-9]/g, '');
      this.client.moveUserTo({
        userID: cleanUserId,
        channelID: this.timeoutServerId,
        serverID: Object.keys(this.client.servers)[0],
      });
    },
    'timeout-setup': (messageState, args) => {
      this.timeoutServerId = args[0];
      this.client.sendMessage({
        to: messageState.channelID,
        message: `Set Timeout Server ID to ${this.timeoutServerId}`,
      });
    },
  };

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
        const messageState = {
          user,
          userID,
          channelID,
          message,
          evt,
        };

        let args = message.substring(1).split(' ');
        const cmd = args[0];
        args = args.splice(1);
        if (this.commands[cmd]) {
          this.commands[cmd](messageState, args);
        } else {
          logger.error(`Command not found: ${cmd}`);
        }
      }
    });
  }
}

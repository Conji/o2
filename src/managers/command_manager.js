const Command = require('./../command');
const fs = require('fs');
const utils = require('./../utils');
const logger = require('./../logger');

const HelpCmd = require('./../commands/help');
const PingCmd = require('./../commands/ping');
const StopCmd = require('./../commands/stop');
const SqlCmd = require('./../commands/sql');
const PlayersCmd = require('./../commands/players');

let instancedCommands = [];

class CommandManager {
    registerCommands() {
        instancedCommands = [
            new HelpCmd(),
            new PingCmd(),
            new StopCmd(),
            new SqlCmd(),
            new PlayersCmd()
        ];
    }

    registerCommand(cmd) {
        if (!cmd.$$o2Command) throw new Error('Invalid command registered');
        instancedCommands.push(cmd);
    }
}

module.exports = CommandManager;
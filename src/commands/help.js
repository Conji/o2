const Command = require('./../command');
const colors = require('colors');

class HelpCommand extends Command {
    constructor() {
        super('help', 'Shows all available commands', Command.CommandAllowance.NO_RESTRICTION, (sender, server, search) => {
            search = search || '';
            let result = [];
            for (let name in Command.registeredCommands) {
                let cmd = Command.registeredCommands[name];
                if (name.indexOf(search) > -1) result.push(`${colors.yellow(cmd.name)}: ${cmd.description}`);
            }
            return result.join('\r\n');
        })
    }
}

module.exports = HelpCommand;
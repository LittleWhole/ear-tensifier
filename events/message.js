const fs = require('fs');
const Discord = require("discord.js");
const settings = require('../settings.json');
const index = require('../index.js');

const client = new Discord.Client();

const prefix = settings.prefix;
const pref = prefix.toLowerCase();
const cooldowns = new Discord.Collection();

module.exports = (client, message) => {

	if (message.author.bot) return;
	if(message.content.toLowerCase().indexOf(pref) !== 0) return;

    const args = message.content.slice(pref.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) {
      if (fs.existsSync(`./commands/${commandName}.js`)) {
        try {
          const commandFile = require(`./commands/${commandName}.js`);
          if(commandFile.run)
            commandFile.run(client, message, args);
        } catch (error) {
          console.error(error);
          message.reply('There was an error trying to execute that command!');
        }
      }
      return;
    }
    if (command.guildOnly && message.channel.type !== 'text') {
      return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.args && !args.length) {
      const reply = `You didn't provide any arguments ${message.author}.`;
      let propper;

      if (command.usage) {
        propper = `The proper usage would be: \`${pref}${command.name} ${command.usage}\``;
      }

      return message.channel.send(`${reply}\n${propper}`);
    }

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if(message.author.id !== '275831434772742144') {
      if (!timestamps.has(message.author.id)) {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      }
      else {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      }

      const channel = `472075026451922966`;
      if (channel == message.channel.id){
          return message.channel.send(`You must use this commands in #bot-commands, or #spam.`);
      }
    }

    try {
      command.execute(client, message, args);
    }
    catch (error) {
      console.error(error);
      message.reply('There was an error trying to execute that command!');
    }

};
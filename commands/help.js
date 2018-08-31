const Discord = require ("discord.js");
const fs = require("fs");
const config = require("../settings.json")
const colors = require("../data/colors.json")

  module.exports = {
      name: 'help',
      description: 'Sends you a dm of detailed list of Eat Tensifier\'s commands and info.',
      aliases: ['commands'],
      execute(bot, message, args){
      
        const user = message.guild.members.get(args[0]) || message.member;      

        const { commands } = message.client;
		const data = [];

		if (!args.length) {
            let botEmbed = new Discord.RichEmbed()
            .setAuthor("Ear Tensifier", "https://cdn.discordapp.com/avatars/472714545723342848/8c4f6aee86d43d0047698f87de68f5d5.png?size=2048")
            .setColor(colors.discord)
            .setDescription("**Help Command:** [Website](https://eartensifier.com) - [Invite](https://eartensifier.com/invite) - [Server](https://discord.gg/xKgKMAP) - [Donate](https://eartensifier.com/donate)  ");

        
          
              user.send(`
**List of available commands**
    
Type \`-><command>\` to use a command. 
To get more info on a specific command do \`->help <command>\`
          
**About** - Info about the bot
**Bassboost** - Bassboosts the current playing song  
**Dev** - Developer of the bot
**Donate** - Link to donate to the bot
**Github** - Links you to the github of the bot
**Help** - Sends you a list of commands
**Invite** - Sends you the invite link for the bot
**Join** - Joins the voice channel you are in
**Leave** - Leaves the voice channel you are in
**Loop/Unloop** - Loops or unloops the current playing song
**Normal** - Resets the volume back to normal
**Pause** - Pauses the current playing song
**Ping** - Sends you the client\'s ping and API latency
**Play** - Plays the song you search for in the voice channel you are in
**Playing** - Shows the current playing song
**Queue** - Lists all the songs in the currents queue
**Resume** - Resumes the current playing song
**Skip** - Skips the currently playing song
**Stats** - Shows stats on the bot
**Stop** - Stops playing music
**Support** - Sends the support server for the bot
**Veryloud** - Makes the music very loud and bad quality
**Volume** - Shows/sets the volume of the song
**Website** - Link to the website of the bot
Need more help? Join the support server: https://discord.gg/xKgKMAP
              `);
    
              user.send(botEmbed);
          
              message.reply("Sent you a dm with my commands!")
		}
		else {
			if (!commands.has(args[0])) {
				return message.reply('That\'s not a valid command!');
			}

			const command = commands.get(args[0]);

			data.push(`**Name:** ${command.name}`);

			if (command.description) data.push(`**Description:** ${command.description}`);
			if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
			if (command.usage) data.push(`**Usage:** \`->${command.name} ${command.usage}\``);

			data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		    message.channel.send(data, { split: true });
		}
      },
  };
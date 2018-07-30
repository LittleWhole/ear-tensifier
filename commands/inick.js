const Discord = require("discord.js");

module.exports = {
    name: 'inick',
    usage: '<nickname>',
    aliases: ['botnick'],
    args: true,
	execute(client, message, args){
        if(message.author.id !== '275831434772742144') return;
        const nick = args.join(" ");
        client.user.setUsername(nick);
	},
};
const Discord = require(`discord.js`);
const colors = require("../data/colors.json")

module.exports = {
    name: 'veryloud',
	cooldown: 4,
	aliases: ['earrape', 'loud'],
	async execute(client, message, args){

		//if(!message.member.hasPermission("ADMINASTRATOR")) return message.channel.send(`Must be an Admin to use this command...`)

        const queue = client.queue.get(message.guild.id);

		if(!message.member.voiceChannel) return message.channel.send(`You must be in a voice channel to use this command.`);
		if(!queue) return message.channel.send(`You must play something to use this command.`)

		queue.volume = 50;
		queue.connection.dispatcher.setVolumeLogarithmic(50 / 5);
		message.channel.send(`Tensity set to **very loud**`)
        return;
        
	},
};
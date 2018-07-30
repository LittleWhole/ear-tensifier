const Discord = require(`discord.js`);
const colors = require("../data/colors.json")

module.exports = {
    name: 'normal',
	cooldown: 4,
	async execute(client, message, args){

        const queue = client.queue.get(message.guild.id);

		if(!message.member.voiceChannel) return message.channel.send(`You must be in a voice channel to use this command.`);
		if(!queue) return message.channel.send(`You must play something to use this command.`)

		queue.volume = 1;
		queue.connection.dispatcher.setVolumeLogarithmic(1);
		message.channel.send(`Tensity set to **normal**`)
        return;
        
	},
};
module.exports = {
    name: 'skip',
    description: 'Skips the currently playing song.',
    aliases: ['next', 's'],
    cooldown: 3,
	async execute(client, message, args){
        const voiceChannel = message.member.voiceChannel;
        const queue = client.queue.get(message.guild.id);
        
        if(!message.member.voiceChannel) return message.channel.send(`You must be in a voice channel to use this command.`);
        queue.loop = false;
		queue.connection.dispatcher.end(`Skip Command Used`);
        message.channel.send(`Skipped by **${message.author.username}**`);
	},
};
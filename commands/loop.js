module.exports = {
    name: 'loop',
	description: 'Loops or unloops the current playing song.',
	cooldown: '5',
    aliases: ['unloop'],
	async execute(client, message, args){
		const queue = client.queue.get(message.guild.id);
        const voiceChannel = message.member.voiceChannel;
		if (!message.member.voiceChannel) return message.channel.send('You must be in a voice channel to use this command.');
		if (!queue) return message.channel.send('There is nothing playing to stop.');
        if (queue.loop) {
            queue.loop = false;
          return message.channel.send(`Song has been unlooped by **${message.author.username}**`);
        } else {
            queue.loop = true;
        return message.channel.send(`Song has been looped by **${message.author.username}**`);
        }
	},
};
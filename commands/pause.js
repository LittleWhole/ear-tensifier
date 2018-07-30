module.exports = {
    name: 'pause',
    description: 'Pauses the current song.',
	async execute(client, message, args){

        const queue = client.queue.get(message.guild.id);
        const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.reply('You must be in a voice channel to use this command.');
        if (!queue.playing) return message.reply('There is no music playing right now.');
     
		if (queue) {
			queue.connection.dispatcher.pause();
            queue.playing = false;
			return message.channel.send(`Paused - **${queue.songs[0].title}**`);
		}
		return message.channel.send('There is nothing playing to pause.');
        
	},
};
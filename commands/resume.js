module.exports = {
    name: 'resume',
    description: 'Resumes the current song.',
	async execute(client, message, args){
        const queue = client.queue.get(message.guild.id);
		const voiceChannel = message.member.voiceChannel;
		
		if (!voiceChannel) return message.reply('You must be in a voice channel to use this command.');
        if (queue.playing) return message.reply('There is music already playing.');
     
		if (queue) {
            queue.playing = true;
			queue.connection.dispatcher.resume();
			return message.channel.send(`Resumed - **${queue.songs[0].title}**`);
		}
		return message.channel.send('There is nothing playing to resume.');
        
	},
};
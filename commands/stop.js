module.exports = {
    name: 'stop',
	description: 'Stops playing music.',
	cooldown: '30',

	async execute(client, message, args){
		
		const queue = client.queue.get(message.guild.id);
		
		if (!message.member.voiceChannel) return message.channel.send('You must be in a voice channel to use this command.');
		if (!queue) return message.channel.send('There is nothing playing to stop.');
		queue.songs = [];
        queue.connection.dispatcher.end('Stopped...');
        message.channel.send('Stopped...');
		return;
	},
};
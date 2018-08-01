module.exports = {
    name: 'playing',
    description: 'Shows the current playing song.',
    aliases: ['np', 'nowplaying'],
	async execute(client, message, args){

        const queue = client.queue.get(message.guild.id);
        const loading = await message.channel.send(`<a:loading:458366490702250000> Fetching...`);
        //const playingFor = new Date () - message.client.playlists.get(message.guild.id).connection.dispatcher.startTime;
        //if(!message.member.voiceChannel) return message.channel.send(`**You must be in a voice channel to use this command.**`);
		if(!queue) return message.channel.send(`There is nothing playing.`);
		return loading.edit(`🎶 Now playing - **${queue.songs[0].title}**`);
        
	},
};

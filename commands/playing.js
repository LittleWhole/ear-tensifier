module.exports = {
    name: 'playing',
    description: 'Shows the current playing song.',
    aliases: ['np', 'nowplaying'],
	async execute(client, message, args){

        const queue = client.queue.get(message.guild.id);
        const loading = await message.channel.send(`<a:loading:458366490702250000> Fetching...`);
        const playingFor = new Date () - message.client.playlists.get(message.guild.id).connection.dispatcher.startTime;
        //if(!message.member.voiceChannel) return message.channel.send(`**You must be in a voice channel to use this command.**`);
		if(!queue) return message.channel.send(`There is nothing playing.`);
		return loading.edit(`🎶 Now playing - **${queue.songs[0].title}** [${formattedUptime(playingFor)}]`);
        
	},
};

function formattedUptime(ms) {
    let m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s %= 60;
    const h = Math.floor(m / 60);
    m %= 60;
    const hours = `${h === 0 ? '' : h} ${h === 1 ? 'hour,' : h === 0 ? '' : 'hours,'}`;
    const minutes = `${m === 0 ? '' : m} ${m === 1 ? 'minute and' : m === 0 ? '' : 'minutes and'}`;
    const seconds = `${s} ${s === 1 ? 'second' : 'seconds'}`;
    return `${hours} ${minutes} ${seconds}`.trim();
  }
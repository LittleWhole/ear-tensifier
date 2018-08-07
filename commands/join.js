module.exports = {
    name: 'join',
	description: 'Joins the voice channel you are in.',
    cooldown: '5',
    aliases: [`summon`],
	async execute(client, message, args){
        const queue = client.queue.get(message.guild.id);
        const voiceChannel = message.member.voiceChannel;
		if (!message.member.voiceChannel) return message.channel.send('You must be in a voice channel to use this command.');
        voiceChannel.join();
        message.channel.send(`Joined **${message.member.voiceChannel}**`)
	},
};
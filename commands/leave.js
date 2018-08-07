module.exports = {
    name: 'leave',
	description: 'Leaves the voice channel you are in.',
    cooldown: '5',
    aliases: [`unsummon`],
	async execute(client, message, args){
        const queue = client.queue.get(message.guild.id);
        const voiceChannel = message.member.voiceChannel;
        if (!message.member.voiceChannel) return message.channel.send('You must be in a voice channel to use this command.');
        voiceChannel.leave();
        message.channel.send(`Left **${message.member.voiceChannel}**`)
	},
};
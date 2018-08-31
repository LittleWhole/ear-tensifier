module.exports = {
    name: 'website',
	description: 'Website of the bot.',
    cooldown: '3',
    aliases: [`site`],
	async execute(client, message, args){
        message.channel.send(`https://eartensifier.com/`)
	},
};
module.exports = {
    name: 'invite',
	description: 'Sends the invite link of the bot.',
    cooldown: '3',
    aliases: [`add`],
	async execute(client, message, args){
        message.channel.send(`Invite me to your server: https://discordapp.com/oauth2/authorize?client_id=472714545723342848&scope=bot&permissions=24509512`)
	},
};
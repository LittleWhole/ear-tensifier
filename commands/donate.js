module.exports = {
    name: 'donate',
	description: 'Link to donate',
    cooldown: '3',
	async execute(client, message, args){
        message.channel.send(`Donate: https://ear-tensifier.github.io/donate`)
	},
};
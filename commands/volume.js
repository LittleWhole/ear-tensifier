const Discord = require(`discord.js`);
const colors = require("../data/colors.json")

module.exports = {
    name: 'volume',
    description: 'Shows/sets the volume of the song.',
	usage: '<volume (optional)>',
	aliases: ['tensity', 'intensity', 'loudness'],
	cooldown: 10,
	async execute(client, message, args){

        const queue = client.queue.get(message.guild.id);

		if(!message.member.voiceChannel) return message.channel.send(`You must be in a voice channel to use this command.`);
		if(!queue) return message.channel.send(`You must play something to use this command.`)
		
		if(!args[0]) {
			let tensityEmbed = new Discord.RichEmbed()
			.setAuthor(`Tensifier - ${message.guild.name}`, message.guild.iconURL)
			.setColor(colors.discord)
			.setDescription(`The higher the tensifier is the louder, and worse the audio is.\n\n**Ear Tensifier Level 1** - Normal Volume\n**Ear Tensifier Level 15** - Loud Volume, Bad Quality, Bass Boosted\n**Ear Tensifier Level 50** - VERY LOUD Volume, VERY BASS BOOSTED, HORRIBLE Quality\n\nWant higher tensity? Ask \`Tetra#0002\``)
			.setFooter(`Current Tensifier - ${queue.volume}`);
			return message.channel.send(tensityEmbed);
		}

		if(isNaN(args[0])) return message.channel.send(`Not a valid number.`)
		if(args[0] > 50 || args[0] < 1){
			return message.channel.send(`Your value can only be between 0-50.`)
		}
		queue.volume = args[0];
		queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 2);
		message.channel.send(`Tensity set to: **${args[0]}**`)
        return;
        
	},
};
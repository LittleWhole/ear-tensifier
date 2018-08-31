const config = require("../settings.json")
const colors = require("../data/colors.json")
const Discord = require ("discord.js");

module.exports = {
    name: 'about',
	description: 'Info about the bot',
    cooldown: '3',
    aliases: [`info`],
	async execute(client, message, args){
        let botEmbed = new Discord.RichEmbed()
        .setAuthor("Ear Tensifier", "https://cdn.discordapp.com/avatars/472714545723342848/8c4f6aee86d43d0047698f87de68f5d5.png?size=2048")
        .setColor(colors.discord)
        .setThumbnail(`https://cdn.discordapp.com/attachments/476311887009808384/476378266404388872/ezgif.com-crop.gif`)
        .setDescription("**Developer**: Tetra#0002 | **Version:** " + config.version + " | **Library:** discord.js\nEar Tensifier is an easy to use, simple music bot that can bassboost, and loudify songs.")
        .addField("Website", "https://eartensifier.com", true)
        .addField("Invite", "https://eartensifier.com/invite", true)
        .addField("Server", "https://discord.gg/xKgKMAP", true)
        .addField("Donate", "https://eartensifier.com/donate", true);
    
        message.channel.send(botEmbed);
	},
};
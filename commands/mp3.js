const Discord = require("discord.js");
const colors = require("../data/colors.json")
const settings = require("../settings.json")

module.exports = {
    name: 'mp3',
    usage: '<id/song>>',
	execute(client, message, args){
        if(!args[0]){
            const mp3Embed = new Discord.RichEmbed()
            .setAuthor("Ear Tensifier", `https://cdn.discordapp.com/avatars/472714545723342848/8c4f6aee86d43d0047698f87de68f5d5.png?size=2048`)
            .setTitle(`MP3 Commands`)
            .setColor(colors.discord)
            .setDescription(`Ear Tensifier has an mp3 system where community members can submit mp3 files to add to Ear Tensifier. This system is led by the community, which is what makes it great. If you're intrested in submitting an mp3 file for Ear Tensifier join this discord: https://discord.gg/xKgKMAP`)
            .addField(`How to Use`, `To use the mp3 player you must find a song you would like to play, and copy the id of it.\nTo view a list of the songs that you can play do \`->mp3 list\`. Then use the built in mp3 command to play it \`->mp3 play <id of song>\`.`)
            .addField(`Need Help?`, `If you're confused on how to use this system, or have any questions you can join Ear Tensifier's discord`)
            .setFooter(message.author.username)
            .setTimestamp();
            message.channel.send(mp3Embed)
        }

        if(args[0] == `list`){
            const mp3List = new Discord.RichEmbed()
            .setAuthor("Ear Tensifier", `https://cdn.discordapp.com/avatars/472714545723342848/8c4f6aee86d43d0047698f87de68f5d5.png?size=2048`)
            .setTitle(`MP3 List`)
            .setColor(colors.discord)
            .setDescription(`
\`ID - Name of Song - (Submited by)\`
**1** - Wii Sports (Lightfiend#0375)
**2** - Smash Mouth Megalovania (???#2802)
**3** - Megalovania But In Different Soundfonts (???#2802)
**4** - Take Me Home Country Roads Fallout 76 (???#2802)
**5** - S.T.A.L.K.E.R. Clear Sky Bandit Radio (xCrab#6589)
`)
            .setFooter(message.author.username)
            .setTimestamp();
            message.channel.send(mp3List)           
        }

        




	},
};
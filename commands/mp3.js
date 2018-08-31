const Discord = require("discord.js");
const colors = require("../data/colors.json")
const settings = require("../settings.json")

module.exports = {
    name: 'mp3',
    usage: '<id/song>>',
	async execute(client, message, args){
        if(!args[0]){
            const mp3Embed = new Discord.RichEmbed()
            .setAuthor("Ear Tensifier", `https://cdn.discordapp.com/avatars/472714545723342848/8c4f6aee86d43d0047698f87de68f5d5.png?size=2048`)
            .setTitle(`MP3 Commands`)
            .setColor(colors.discord)
            .setDescription(`**Please keep in mind that this system is very new, and has a lot of bugs.** Ear Tensifier has an mp3 system where community members can submit mp3 files to add to Ear Tensifier. This system is led by the community, which is what makes it great. If you're intrested in submitting an mp3 file for Ear Tensifier join this discord: https://discord.gg/xKgKMAP`)
            .addField(`How to Use`, `To use the mp3 player you must find a song you would like to play, and copy the id of it.\nTo view a list of the songs that you can play do \`->mp3 list\`. Then use the built in mp3 command to play it \`->mp3 play <id of song>\`.\nIf you would like to stop a song do \`->mp3 stop\``)
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
\`ID - Name of Song - (Submitted by)\`
**1** - Wii Sports (Lightfiend#0375) <a:happy:485096833790771207>
**2** - Smash Mouth Megalovania (???#2802)
**3** - Megalovania But In Different Soundfonts (???#2802)
**4** - Take Me Home Country Roads Fallout 76 (???#2802) <a:happy:485096833790771207>
**5** - S.T.A.L.K.E.R. Clear Sky Bandit Radio (xCrab#6589)

<a:happy:485096833790771207> = Popular
`)
            .setFooter(message.author.username)
            .setTimestamp();
            message.channel.send(mp3List)        
        }

        if(args[0] == `play`){
            if(!args[1]) return message.channel.send(`You didn't provide any arguments.\nThe proper usage would be: \`->mp3 play <ID number>\``)
            if(isNaN(args[1])){
                return message.channel.send(`You must supply an ID number to play a song. \`->mp3 play <ID Number>\` or \`->mp3 play 4\``)
            } else {
                if(args[1] == `1`){
                    if (message.member.voiceChannel) {
                        const embed = new Discord.RichEmbed() // create a message embed with all of the information
                        .setTitle(`MP3 System`)
                        .setThumbnail(`https://cdn.discordapp.com/attachments/476311887009808384/476378266404388872/ezgif.com-crop.gif`)
                        .setDescription(`Wii Sports (Lightfiend#0375)`)
                        .addField('ID',`1`, true)
                        .addField('Requested by', message.author.username, true)
                        .setColor(colors.discord);
                        message.channel.send(embed)
                        const connection = await message.member.voiceChannel.join();
                        const voiceChannel = message.member.voiceChannel;
                        const dispatcher = connection.playStream(`https://cdn.discordapp.com/attachments/484517208156798977/484934464984711190/Wii_Sports.mp3`);
                        dispatcher.on('end', () => voiceChannel.leave());
                    } else {
                        message.reply('You must be in a voice channel to play music.');
                    }
                }
                if(args[1] == `2`){
                    if (message.member.voiceChannel) {
                        const embed = new Discord.RichEmbed() // create a message embed with all of the information
                        .setTitle(`MP3 System`)
                        .setThumbnail(`https://cdn.discordapp.com/attachments/476311887009808384/476378266404388872/ezgif.com-crop.gif`)
                        .setDescription(`Smash Mouth Megalovania (???#2802)`)
                        .addField('ID',`2`, true)
                        .addField('Requested by', message.author.username, true)
                        .setColor(colors.discord);
                        message.channel.send(embed)
                        const connection = await message.member.voiceChannel.join();
                        const voiceChannel = message.member.voiceChannel;
                        const dispatcher = connection.playStream(`https://cdn.discordapp.com/attachments/484517208156798977/484541369625346059/Smash_Mouth_-_Megalovania.mp3`);
                        dispatcher.on('end', () => voiceChannel.leave());
                    } else {
                        message.reply('You must be in a voice channel to play music.');
                    }
                }
                if(args[1] == `3`){
                    if (message.member.voiceChannel) {
                        const embed = new Discord.RichEmbed() // create a message embed with all of the information
                        .setTitle(`MP3 System`)
                        .setThumbnail(`https://cdn.discordapp.com/attachments/476311887009808384/476378266404388872/ezgif.com-crop.gif`)
                        .setDescription(`Megalovania But In Different Soundfonts (???#2802)`)
                        .addField('ID',`3`, true)
                        .addField('Requested by', message.author.username, true)
                        .setColor(colors.discord);
                        message.channel.send(embed)
                        const connection = await message.member.voiceChannel.join();
                        const voiceChannel = message.member.voiceChannel;
                        const dispatcher = connection.playStream(`https://cdn.discordapp.com/attachments/484517208156798977/484926562186297344/Megalovania_But_In_Different_Soundfonts.mp3`);
                        dispatcher.on('end', () => voiceChannel.leave());
                    } else {
                        message.reply('You must be in a voice channel to play music.');
                    }
                }
                if(args[1] == `4`){
                    if (message.member.voiceChannel) {
                        const embed = new Discord.RichEmbed() // create a message embed with all of the information
                        .setTitle(`MP3 System`)
                        .setThumbnail(`https://cdn.discordapp.com/attachments/476311887009808384/476378266404388872/ezgif.com-crop.gif`)
                        .setDescription(`Take Me Home Country Roads Fallout 76 (???#2802)`)
                        .addField('ID',`4`, true)
                        .addField('Requested by', message.author.username, true)
                        .setColor(colors.discord);
                        message.channel.send(embed)
                        const connection = await message.member.voiceChannel.join();
                        const voiceChannel = message.member.voiceChannel;
                        const dispatcher = connection.playStream(`https://cdn.discordapp.com/attachments/484517208156798977/484934687446269990/Take_Me_Home_Country_Roads___Fallout_76_Original_Trailer_Soundtrack__256kbps_cbr_.mp3`);
                        dispatcher.on('end', () => voiceChannel.leave());
                    } else {
                        message.reply('You must be in a voice channel to play music.');
                    }
                }
                if(args[1] == `5`){
                    if (message.member.voiceChannel) {
                        const embed = new Discord.RichEmbed() // create a message embed with all of the information
                        .setTitle(`MP3 System`)
                        .setThumbnail(`https://cdn.discordapp.com/attachments/476311887009808384/476378266404388872/ezgif.com-crop.gif`)
                        .setDescription(`S.T.A.L.K.E.R. Clear Sky Bandit Radio (xCrab#6589)`)
                        .addField('ID',`5`, true)
                        .addField('Requested by', message.author.username, true)
                        .setColor(colors.discord);
                        message.channel.send(embed)
                        const connection = await message.member.voiceChannel.join();
                        const voiceChannel = message.member.voiceChannel;
                        const dispatcher = connection.playStream(`https://cdn.discordapp.com/attachments/484517208156798977/484935159892934686/S.T.A.L.K.E.R._Clear_Sky_-_Bandit_Radio.mp3`);
                        dispatcher.on('end', () => voiceChannel.leave());
                    } else {
                        message.reply('You must be in a voice channel to play music.');
                    }
                }
            } 
        }

        




	},
};
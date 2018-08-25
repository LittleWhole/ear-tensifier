const Discord = require("discord.js");
const colors = require("../data/colors.json")
const settings = require("../settings.json")
const ms = require("ms");
const client = new Discord.Client({disableEveryone: true});

module.exports = {
    name: 'stats',
	description: 'Shows stats on the bot.',
	cooldown: '5',

	async execute(client, message, args, tools){

        const loading = await message.channel.send(`<a:loading:458366490702250000> Gathering stats...`);
		
        const os = require('os');
        const arch = os.arch()
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
    
        let totalSeconds = process.uptime();
        let realTotalSecs = Math.floor(totalSeconds % 60);
        let days = Math.floor((totalSeconds % 31536000) / 86400);
        let hours = Math.floor((totalSeconds / 3600) % 24);
        let mins = Math.floor((totalSeconds / 60) % 60);
        let users = 0;
    
        var ping = client.ping

        client.guilds.map(g => users += g.memberCount);

        const statsEmbed = new Discord.RichEmbed()
        .setAuthor("Ear Tensifier", `https://cdn.discordapp.com/avatars/472714545723342848/8c4f6aee86d43d0047698f87de68f5d5.png?size=2048`)
        .setColor(colors.discord)
        .setThumbnail(`https://cdn.discordapp.com/attachments/476311887009808384/476378266404388872/ezgif.com-crop.gif`)
        .addField("Born On", client.user.createdAt)
        .addField("Current Version", settings.version, true)
        .addField(`Servers`, `${client.guilds.size}`, true)
        .addField(`Users`, `${users}`, true)
        .addField(`Channels`, `${client.channels.size}`, true)
        .addField(`Memory Usage`, `${Math.round(used * 100) / 100}MB`, true)
        .addField(`Ping`, `Latency \`${loading.createdTimestamp - message.createdTimestamp}ms\`\nAPI Latency \`${Math.round(client.ping)}ms\``, true)
        .addField(`Software`, `Node: ${process.version} | Library: discord.js | ARCH: ${arch} | Plataform: ${os.platform}`)
        .addField(`Uptime`, `${days} days, ${hours} hours, ${mins} minutes, and ${realTotalSecs} seconds`);
        loading.edit(statsEmbed);
	},
};
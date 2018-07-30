const Discord = require("discord.js");
const ms = require("ms");
const settings = require("../settings.json")
const colors = require("../data/colors.json")
const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();

module.exports = {
    name: 'ping',
    description: 'Sends you the client\'s ping and API latency',
	async execute(client, message, args){
        const loading = await message.channel.send(`<a:loading:458366490702250000> Pinging...`);
        let pingEmbed = new Discord.RichEmbed()
        .setAuthor(`Ear Tensifier`, settings.icon)
        .setColor(colors.bot)
        .addField("🏓 Pong!", `Latency \`${loading.createdTimestamp - message.createdTimestamp}ms\`\nAPI Latency \`${Math.round(client.ping)}ms\``)
    
        loading.edit(pingEmbed);
	},
};
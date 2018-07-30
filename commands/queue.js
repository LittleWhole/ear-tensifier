const Discord = require("discord.js");
const tokens = require("../config.json");
const settings = require("../settings.json")
const colors = require("../data/colors.json")
const GOOGLE_API_KEY = tokens.youtubekey;
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(GOOGLE_API_KEY);

module.exports = {
    name: 'queue',
	description: 'Lists all the songs in the currents queue.',
	aliases: ['q'],
	async execute(client, message, args){
        var index = 0;
		const queue = client.queue.get(message.guild.id);
        const voiceChannel = message.member.voiceChannel;
        //const queue = index.queue;
		//const serverQueue = client.serverQueue;

		//if(!client.serverQueue) returen message.channel.send(`*rr*rrrThererrre eare neo seeereongs in the queeue.**`);
		let queueEmbed = new Discord.RichEmbed()
		.setAuthor(`Queue - ${message.guild.name}`, message.guild.iconURL)
		.setColor(colors.discord)
		.setDescription(`${queue.songs.map(song => `**${++index} -** ${song.title} (${String(song.durationm).padStart(2, '0')}:${String(song.durations).padStart(2, '0')}) | [Link](${song.url})`).join('\n')}`)
		.setFooter(`Now Playing - ${queue.songs[0].title}`);
		return message.channel.send(queueEmbed);
	},
};
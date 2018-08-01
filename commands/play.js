const tokens = require("../config.json");
const settings = require("../settings.json")
const colors = require("../data/colors.json")
const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const GOOGLE_API_KEY = tokens.youtubekey;
const youtube = new YouTube(GOOGLE_API_KEY);

module.exports = {
    name: 'play',
    description: 'Plays the song you search for in the voice channel you are in.',
    usage: '<song>',
    aliases: ['p'],
    args: true,
    cooldown: 3,
	async execute(client, message, args){
		const searchString = args.slice(0).join(' ');
        const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
        const serverQueue = client.queue.get(message.guild.id);
        const voiceChannel = message.member.voiceChannel;
		if(!voiceChannel) return message.channel.send(`You must be in a voice channel to play music.`);
		//if(!args[1]) return message.channel.send(`**Provide a song to play.**`);
		/**
		const permissions = voiceChannel.permissionsFor(client.user.message);
		if(!permissions.has(`CONNECT`)) {
			return message.channel.send('**I do not have permission to connect to your voice channel.** Make sure that I have the permission, `CONNECT`');
		}
		if(!permissions.has(`SPEAK`)) {
			return message.channel.send('**I do not have permission to speak in your voice channel.** Make sure that I have the permission, `SPEAK`');
		}
		*/

        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, message, voiceChannel, true);
			}
			return message.channel.send(`Playlist: **${playlist.title}** has been added to the queue!`);
        } else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
                    let searchResults = await message.channel.send('<a:loading:458366490702250000> Fetching Youtube....');
                    var videos = await youtube.searchVideos(searchString, 5);
                    let index = 0;
					let selectionEmbed = new Discord.RichEmbed()
					.setAuthor(`Song Selection - Type the value of a song to select a result.`, settings.icon)
					.setColor(colors.discord)
                    .setDescription(`${videos.map(video2 => `**${++index} -** ${`${video2.title} | [Link](${video2.url})`}`).join('\n')}`)
					.setFooter(`Command cancels in 30 seconds.`);
					searchResults.edit(selectionEmbed);
					try {
						var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
							maxMatches: 1,
							time: 30000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return message.channel.send(`Command canceled due to no value or invalid value provided.`).then(message => {message.delete(20000)});
					}
					const videoIndex = (response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return message.channel.send('I could not obtain any search results.').then(message => {message.delete(20000)});;
				}
			}

			return handleVideo(video, message, voiceChannel);
		}

		async function handleVideo(video, message, voiceChannel, playlist = false) {
            const serverQueue = client.queue.get(message.guild.id);
            console.log(video);
            const song = {
                id: video.id,
                title: Discord.escapeMarkdown(video.title),
                url: `https://www.youtube.com/watch?v=${video.id}`,
                channel: video.channel.title,
                channelurl: `https://www.youtube.com/channel/${video.channel.id}`,
                durationh: video.duration.hours,
                durationm: video.duration.minutes,
                durations: video.duration.seconds,
                thumbnail: video.thumbnails.default.url,
                author: message.author.username
            };
            if(!serverQueue) {
                const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true,
                    loop: false
                };
                client.queue.set(message.guild.id, queueConstruct);
        
                queueConstruct.songs.push(song);
        
                try {
                    const connection = await voiceChannel.join();
                    queueConstruct.connection = connection;
                    play(message.guild, queueConstruct.songs[0]);
                } catch (error) {
                    console.error(`Action unsuccessful - ${error}`);
                    client.queue.delete(message.guild.id);
                    return message.channel.send(`Action unsuccessful - ${error}`)
                }
            } else {

                const songdurh = String(song.durationh).padStart(2, '0'); //Hours
                const songdurm = String(song.durationm).padStart(2, '0'); //Minutes
                const songdurs = String(song.durations).padStart(2, '0'); //Seconds

                serverQueue.songs.push(song);
                console.log(serverQueue.songs)
                if(playlist) return;
                else{
                    const loading = await message.channel.send(`<a:loading:458366490702250000> Fetching...`);
                    return loading.edit(`**${song.title}** (${songdurm}:${songdurs}) has been added to the queue by **${song.author}**`)
                }
            }
            return;
        }

        async function play(guild, song) {
            const serverQueue = client.queue.get(guild.id);
            const channelQueue = client.queue.get(guild.id);
        
            if (!song) {
                serverQueue.voiceChannel.leave();
                client.queue.delete(guild.id);
                return;
            }

            //console.log(serverQueue.songs);
        
            const dispatcher = serverQueue.connection.playStream(ytdl(song.url))/** 
                .on('end', reason => {
                    if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
                    else console.log(reason);
                    serverQueue.songs.shift();
                    play(guild, serverQueue.songs[0]);
                })*/
                

                .on('end', () => { // when the song ends
                    if (!serverQueue.loop) { // if its not looped
                    serverQueue.songs.shift();
                      setTimeout(() => { // wait 250ms before playing a song due to songs skipping
                        play(guild, serverQueue.songs[0]);
                      }, 50); 
                    } else { // if it is looped it doens't remove the first item
                      setTimeout(() => {  // wait 250ms before playing a song due to songs skipping
                        play(guild, serverQueue.songs[0]); // play the song
                      }, 50);		   
                    }
                  })
                  .on('error', error => console.error(error));
                  
            dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

            const songdurh = String(song.durationh).padStart(2, '0'); //Hours
            const songdurm = String(song.durationm).padStart(2, '0'); //Minutes
            const songdurs = String(song.durations).padStart(2, '0'); //Seconds

            const embed = new Discord.RichEmbed() // create a message embed with all of the information
            .setTitle(song.channel)
            .setURL(song.channelurl)
            .setThumbnail(song.thumbnail)
            .setDescription(`[${song.title}](${song.url})`)
            .addField('Duration',`${songdurm}:${songdurs}`, true)
            .addField('Requested by', song.author, true)
            .setColor(colors.discord);
        
            //channelQueue.textChannel.send(`Now playing - **${song.title}** (${songdurh}:${songdurm}:${songdurs}) added by **${song.author}**`)
            if (!serverQueue.loop) return channelQueue.textChannel.send(embed)
        }

    },
    
    
};
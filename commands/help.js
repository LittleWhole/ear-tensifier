const Discord = require ("discord.js");
const fs = require("fs");

  module.exports = {
      name: 'help',
      description: 'Sends you a dm of detailed list of Eat Tensifier\'s commands and info.',
      execute(bot, message, args){
      
          const user = message.guild.members.get(args[0]) || message.member;      
      
          user.send(`
**List of available commands**

Type \`-><command>\` to use a command.
          
**Bassboost** - Bassboosts the current playing song  
**Help** - Sends you a list of commands
**Join** - Joins the voice channel you are in
**Leave** - Leaves the voice channel you are in
**Loop/Unloop** - Loops or unloops the current playing song
**Normal** - Resets the volume back to normal
**Pause** - Pauses the current playing song
**Ping** - Sends you the client\'s ping and API latency
**Play** - Plays the song you search for in the voice channel you are in
**Playing** - Shows the current playing song
**Queue** - Lists all the songs in the currents queue
**Resume** - Resumes the current playing song
**Skip** - Skips the currently playing song
**Stats** - Shows stats on the bot
**Stop** - Stops playing music
**Veryloud** - Makes the music very loud and bad quality
**Volume** - Shows/sets the volume of the song

Need more help? Join the support server: https://discord.gg/xKgKMAP
          `);
      
          message.reply("Sent you a dm with my commands!")
      },
  };
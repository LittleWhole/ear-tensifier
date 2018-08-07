const Discord = require("discord.js");

  module.exports = {
      name: 'support',
      description: 'Shows Ear Tensifier\'s support server.',
      aliases: ['discord', 'botserver'],
      execute(bot, message, args){
        message.channel.send("Ear Tensifier's Support Server: https://discord.gg/xKgKMAP");
      },
  };
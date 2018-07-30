const Discord = require("discord.js");
const fs = require("fs");

//Permissions
module.exports.noPerms = (message, perm) => {
    message.channel.send(`You do not have permission to use the \`${perm}\` command.`);
}

module.exports.noTetra = (message, dev) => {
    message.channel.send(`Only my developer can use the \`${dev}\` command.`);
}


//Error
module.exports.noVoiceChannel = (message, command) => {
    message.channel.send(`You must be in a voice channel to use \`${command}\`.`);
}

module.exports.emptyQueue = (message, command) => {
    message.channel.send(`There is nothing playing.`);
}

module.exports.no = (message) => {
    message.channel.send(`Volume must be a value between 0 and 10`);
}

module.exports.errorVolume = (message) => {
    message.channel.send(`Volume must be a value between 0 and 10`);
}






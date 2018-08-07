const Discord = require("discord.js");
const colors = require("../data/colors.json")

module.exports = {
    name: 'github',
    description: 'Provides a link to the github page of Ear Tensifier.',
	execute(client, message, args){    
        return message.channel.send(`Ear Tensifier's Github: https://github.com/ear-tensifier/ear-tensifier`);
	},
};
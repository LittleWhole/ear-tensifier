const Discord = require("discord.js");
const moment = require("moment");
const settings = require("../settings.json")
const colors = require("../data/colors.json")

module.exports = (client, guild) => { 
    try {
      let guildEmbed = new Discord.RichEmbed()
      .setAuthor(`Ear Tensifier | Guild ID - ${guild.id}`, settings.icon)
      .setColor(colors.lightgreen)
      .setThumbnail(guild.iconURL)
      .setDescription("Ear Tensifier has been **added** to a server.")
      .addField("Guild", `${guild.name}`, true)
      .addField("Users", `${guild.memberCount}`, true)
      .addField("Owner", `${guild.owner}`, true)
      .addField("Owner ID", `${guild.ownerID}`, true)
      .setFooter(`Created On - ${moment(guild.createdAt).format('LLLL')}`, guild.iconURL)
      .setTimestamp();
  
      guild.client.channels.get("434521909745549333").send(guildEmbed);
    } catch (error) {
      console.error(error);
    }
};
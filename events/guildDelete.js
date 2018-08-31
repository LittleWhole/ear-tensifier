const Discord = require("discord.js");
const moment = require("moment");
const settings = require("../settings.json")
const colors = require("../data/colors.json")
const config = require("../config.json")
const superagent = require('superagent')

module.exports = (client, guild) => { 
    try {
      let guildEmbed = new Discord.RichEmbed()
      .setAuthor(`Ear Tensifier | Guild ID - ${guild.id}`, settings.icon)
      .setColor(colors.lightcoral)
      .setThumbnail(guild.iconURL)
      .setDescription("Ear Tensifier has been **removed** from a server.")
      .addField("Guild", `${guild.name}`, true)
      .addField("Users", `${guild.memberCount}`, true)
      .addField("Owner", `${guild.owner}`, true)
      .addField("Owner ID", `${guild.ownerID}`, true)
      .setFooter(`Created On - ${moment(guild.createdAt).format('LLLL')}`, guild.iconURL)
      .setTimestamp();

      superagent.post(`https://discordbots.org/api/bots/stats`)
      .set('Authorization', config.dblToken)
      .send({ server_count: client.guilds && client.guilds.size ? client.guilds.size : (client.Guilds ? client.Guilds.size : Object.keys(client.Servers).length) })
      .then(() => console.log('Updated discordbots.org stats'))
      .catch(err => console.error(`Error updating discordbots.org stats: ${err.body || err}`));
  
      guild.client.channels.get("483039673057411072").send(guildEmbed);
    } catch (error) {
      console.error(error);
    }
};
//Check Node Version
if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const fs = require('fs');
const Discord = require('discord.js');
const { promisify } = require('util');
const readdir = promisify(require("fs").readdir);

const settings = require('./settings.json');
const config = require('./config.json');
const token = config.token;

const files = fs.readdirSync('./commands');
const events = fs.readdirSync('./events');
if (!files.length) throw Error('No command files found!');
if (!events.length) throw Error('No event files found!');

const client = new Discord.Client();
client.queue = new Map();
client.playlists = new Discord.Collection();
client.commands = new Discord.Collection();

const log = message => {
  console.log(`[${new Date().toLocaleString()}] > ${message}`);
};

//Load Commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//Event Handler
const init = async () => {
  const evtFiles = await readdir("./events/");
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
}
init();

client.on("message", message => {
  if (message.channel.type !== 'text') return;
	client.serverQueue = client.queue.get(message.guild.id);
});

log(`Loaded ${files.length} commands.`);
log(`Loaded ${events.length} events.`);


client.login(token);
//process.on('unhandledRejection', err => log(err));
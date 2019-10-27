// startup declaration
const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// load events from /events folder
fs.readdir('./events/', (err, files) => {
  if (err) { return console.error(err); }
  files.forEach(file => {
    if (!file.endsWith('.js')) { return; }
    const event = require(`./events/${file}`);
    let eventName = file.split('.')[0];

    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.login(process.env.BOT_TOKEN);


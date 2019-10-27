const util = require('../functions.js');

module.exports = async (client, msg) => {
    // only get messages from announcements
    if (msg.channel.name !== 'events') { return; }

    // ignore bot messages
    if (msg.author.bot) { return; }

    // util.parseEvent(msg.toString());
    let text;
    // Gets the string
    text = msg.content;
    msg.react(':calendar:');

};
const util = require('../functions.js');

module.exports = async (client, msg) => {
    // only get messages from announcements
    if (msg.channel.name !== 'events') { return; }

    // ignore bot messages
    if (msg.author.bot) { return; }

    let parsedEvent = util.parseEvent(msg.content);

    msg.channel.send(parsedEvent.toString());

    msg.react('📆')
        .catch(console.error);
};
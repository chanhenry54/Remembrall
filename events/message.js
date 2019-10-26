module.exports = async (client, msg) => {
    // only get messages from announcements
    if (msg.channel.name !== 'announcements') { return; }
    // ignore bot messages
    if (msg.author.bot) { return; }

    // test event
    if (msg.content.startsWith('ping')) {
        msg.channel.send('pong!');
    }
};
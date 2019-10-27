module.exports = async (client, msg) => {
    // only get messages from announcements
    if (msg.channel.name !== 'ur-mom') { return; }

    // ignore bot messages
    if (msg.author.bot) { return; }

    var text;
    // Gets the string
    text = msg.content;
    msg.react('📆');
    
};
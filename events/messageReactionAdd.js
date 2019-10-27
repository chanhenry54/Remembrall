module.exports = async (client, reaction, user) => {
    if (user.bot) { return; }
    if (reaction.message.channel.name !== 'events') { return; }
    if (reaction.emoji.toString() !== '📆') { return; }

    user.send('ur mom gay');
};
module.exports = async (client, reaction, user) => {
    if (reaction.message.channel.name !== 'events') { return; }
    if (reaction.emoji !== '📆') { return; }
    user.send('ur mom gay')
};
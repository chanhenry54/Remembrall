module.exports = async (client, msg) => {
    // only get messages from announcements
    if (msg.channel.name !== 'announcements') { return; }

    // ignore bot messages
    if (msg.author.bot) { return; }

    // get initial str array
    let eventStrArr = msg.toString().trim().split(' @ ');
    if (eventStrArr.length !== 2) { return; }

    // get event name
    let eventName = eventStrArr[0];

    // start parsing event place, date, time
    let eventData = eventStrArr[1].split(', ');
    if (eventData.length !== 3) { return; }
};
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    parseEvent(string) {
        // get initial str array
        let eventStrArr = string.toString().trim().split(' @ ');
        if (eventStrArr.length !== 2) { return; }

        // get event name
        let eventName = eventStrArr[0];

        // start parsing event place, date, time
        let eventData = eventStrArr[1].split(', ');
        if (eventData.length !== 3) { return; }
        let eventPlace = eventData[0];
        let eventStart = eventData[1];
        let eventEnd = eventData[2];
        return [eventName, eventPlace, eventStart, eventEnd];
    }
};
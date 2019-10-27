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
        let eventDate = eventData[1];
        let eventTime = eventData[2];
        return [eventName, eventPlace, eventDate, eventTime];
    },

    /**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
    authorize(credentials, callback) {
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return getAccessToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });
    },

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    getAccessToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) return console.error('Error retrieving access token', err);
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err) return console.error(err);
                    console.log('Token stored to', TOKEN_PATH);
                });
                callback(oAuth2Client);
            });
        });
    },

    /**
   * add the event to the users google calendar
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */

    // Wrapped in a POST request
    addEvent(auth) {
        const calendar = google.calendar({ version: 'v3', auth });
        calendar.events.list({
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        }),
            calendar.events.insert({
                auth: auth,
                calendarId: 'primary',
                resource: event, //req.body,
            }, function (err, event) {
                if (err) {
                    console.log('There was an error contacting the Calendar service: ' + err);
                    return;
                }
                console.log('Event created: %s', event.htmlLink);
            });
    }
};
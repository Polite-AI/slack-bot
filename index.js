const config = require('./config.js');

const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

const makeMessageResponder = require('personality-helper');

config.bots.forEach(async(botConfig) => {
    const messageResponder = makeMessageResponder(config.personalityServer, botConfig.language, botConfig.personality);

    const rtm = new RtmClient(botConfig.bot_token);

    // let channel;

    // // The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
    // rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
    //     for (const c of rtmStartData.channels) {
    //         if (c.is_member && c.name === 'general') {
    //             channel = c.id
    //         }
    //     }
    // });

    // // you need to wait for the client to fully connect before you can send messages
    // rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
    //     rtm.sendMessage("Hello!", channel);
    // });

    rtm.on(RTM_EVENTS.MESSAGE, async(message) => {
        if (message.type === 'message' && message.user !== rtm.activeUserId) {
            const response = await messageResponder(message.text, 'slack', message.team + '-' + message.channel, `slack-${message.team}-${message.ts}`, Number(message.ts.split('.')[0]));
            if (response && response.response) {
                rtm.sendMessage(`<@${message.user}> ${response.response}`, message.channel);
            } else if (response && response.error) {
                console.warn(`Got an error from server for message [${messageBody}]`, response.error);
            }
        }
    });

    rtm.start();
});
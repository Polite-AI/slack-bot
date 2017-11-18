const fs = require('fs');
let botCSV = '';
try {
    botCSV = fs.readFileSync('./bots.csv', 'utf8');
} catch (err) {
    console.error(`No ./bots.csv found, please look at ./bots.example.csv`);
}

const bots = botCSV.split('\n').map(bot => {
    const [language, personality, bot_key] = bot.split(',').map(a => a.trim());
    return {
        language,
        personality,
        bot_key
    };
});

const config = {
    "production": {
        "slack":{
            "client_secret":"xxxxxxxxxxxxxxxx",
            "client_id":"xxxxxx.xxxxxxx"
        },
        "personalityServer": {
            "host": "localhost",
            "port": "8000",
            "version": "v1"
        },
        "bots": bots
    },
    "development": {
        "slack":{
            "client_secret":"xxxxxxxxxxxxxxxx",
            "client_id":"xxxxxx.xxxxxxx"
        },
        "personalityServer": {
            "host": "localhost",
            "port": "8000",
            "version": "v1"
        },
        "bots": bots
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];
const config = {
    "production": {
        "personalityServer": {
            "host": "localhost",
            "port": "8000",
            "version": "v1"
        },
        "bots": [{
            "language": "english",
            "personality": "father-ted",
            "bot_token": "xoxb-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        }]
    },
    "development": {
        "personalityServer": {
            "host": "localhost",
            "port": "8000",
            "version": "v1"
        },
        "bots": [{
            "language": "english",
            "personality": "father-ted",
            "bot_token": "xoxb-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        }]
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];
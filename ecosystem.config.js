module.exports = {
    apps: [{
        name: "slack-bot",
        script: "./index.js",
        watch: false,
        instances: 1,
        env_production: {
            NODE_ENV: "production"
        }
    }]
};
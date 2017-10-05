const request = require('request-promise-native');
const express = require('express');
const app = express();

const config = require('./config.js');

app.get('/slack/oauth', function (req, res) {
    const {
        code
    } = req.query;

    if (!code) res.status(400).send();

    request.get(`https://slack.com/api/oauth.access?client_id=${config.slack.client_id}&client_secret=${config.slack.client_secret}&code=${code}`)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.error(`Failed to verify code [${code}]:`, err);
        });
});

app.listen(8082);
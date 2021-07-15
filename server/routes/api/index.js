let express = require('express');
let api = express.Router();

module.exports = api;


api.post(
    '/mailinglist/subscribe',
    express.text(),
    require('./sendgrid').subscribe
);

api.post(
    '/contact',
    require('body-parser').json(),
    require('./contact').contact
);


let microsoft = require('./oauth/microsoft');
api.get(
    '/oauth/microsoft/redirect',
    microsoft.redirect
);
api.get(
    '/oauth/microsoft',
    microsoft.start,
    microsoft.success
);


let discord = require('./oauth/discord');
api.get(
    '/oauth/discord/redirect',
    discord.redirect
);
api.get(
    '/oauth/discord',
    discord.start,
    discord.success
);

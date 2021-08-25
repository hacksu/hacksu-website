let express = require('express');
let app = express.Router();

module.exports = app;

app.get('/discord', (req, res) => {
    const redirectUrl = req.originalUrl; //(global.LOCALHOST ? req.originalUrl : 'https://hacksu.com/api/discord')
    if (!('discord' in req.session)) {
        return res.redirect('/api/oauth/discord?redirect=' + redirectUrl);
    }
    if (!('microsoft' in req.session)) {
        return res.redirect('/api/oauth/microsoft?redirect=' + redirectUrl);
    }
    res.json({
        email: req.session.microsoft.email,
        discord: {
            id: req.session.discord.id,
            user: req.session.discord.username + '#' + req.session.discord.discriminator,
        }
    })
})

app.get('/unsubscribe/:email', require('./api/sendgrid').unsubscribe)
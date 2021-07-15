let express = require('express');
let app = express.Router();

module.exports = app;

app.get('/discord', (req, res) => {
    if (!('discord' in req.session)) {
        return res.redirect('/api/oauth/discord?redirect=' + req.originalUrl);
    }
    if (!('microsoft' in req.session)) {
        return res.redirect('/api/oauth/microsoft?redirect=' + req.originalUrl);
    }
    res.json({
        email: req.session.microsoft.email,
        discord: {
            id: req.session.discord.id,
            user: req.session.discord.username + '#' + req.session.discord.discriminator,
        }
    })
})
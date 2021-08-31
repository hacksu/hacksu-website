let express = require('express');
let fetch = require('node-fetch');
let app = express.Router();
module.exports = app;

// Redirects
let redirects = false;
let lastFetchedRedirects = 0;
let redirectsCacheDuration = (10 * 60 * 1000);
let fetchRedirects = async function () {
    if (Date.now() - lastFetchedRedirects >= redirectsCacheDuration) {
        lastFetchedRedirects = Date.now();
        let body = await (await fetch('https://raw.githubusercontent.com/wiki/hacksu/hacksu-2021/Hacksu-Website-Redirects.md')).text();
        redirects = Object.fromEntries(body.split('\n').filter(o => o[0] == '/').map(o => o.trim().split(' ')));
    }
};

app.get('/refresh-redirects', (req, res) => {
    lastFetchedRedirects = 0;
    fetchRedirects();
    res.send(JSON.stringify(redirects));
});

app.use(async (req, res, next) => {
    await fetchRedirects();
    if (req.path in redirects) {
        res.redirect(redirects[req.path]);
    } else {
        next();
    }
});
fetchRedirects();
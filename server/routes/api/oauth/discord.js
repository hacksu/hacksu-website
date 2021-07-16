const clientId = config.oauth.discord.clientId;

const URL_Authorize = 'https://discord.com/api/oauth2/authorize';
const URL_UserInfo = 'https://discord.com/api/users/@me';

let fetch = require('node-fetch');

exports.start = async function (req, res, next) {
    if ('discord' in req.session) {
        return next();
    }
    let { query } = req;
    let params = new URLSearchParams();
    if ('redirect' in query) {
        params.set('state', query.redirect);
    }
    params.set('client_id', clientId);
    params.set('scope', 'identify');
    params.set('response_type', 'token');
    params.set('redirect_uri', (
        LOCALHOST === true ? 'http://' + req.get('host') : 'https://hacksu.com'
    ) + '/api/oauth/discord/redirect');
    res.redirect(URL_Authorize + '?' + params.toString());
};

exports.redirect = async function (req, res) {
    let { query } = req;
    if (!('redirected' in query)) {
        return res.send(`<script>
            location.href = location.href.split("redirect#").join("redirect?redirected=true&");
        </script>`);
    }
    let { access_token, token_type } = query;
    // console.log(query);
    let data = await (
        await fetch(URL_UserInfo, {
            headers: {
                'Authorization': token_type + ' ' + access_token,
            }
        })
    ).json();
    // console.log(data);
    req.session.discord = data;
    res.redirect('/api/oauth/discord' + ('state' in query ? '?redirect=' + query.state : ''));
};

exports.success = function(req, res) {
    if ('discord' in req.session) {
        let { query } = req;
        if ('redirect' in query) {
            res.redirect(query.redirect);
            return;
        }
        res.json(req.session.discord);
    } else {
        res.status(500).send('Not Authenticated');
    }
};



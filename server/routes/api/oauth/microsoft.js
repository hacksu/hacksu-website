const clientId = config.oauth.microsoft.clientId;

const URL_Authorize = 'https://login.microsoftonline.com/ksuprod.onmicrosoft.com/oauth2/v2.0/authorize';
const URL_UserInfo = 'https://graph.microsoft.com/oidc/userinfo';

let fetch = require('node-fetch');

exports.start = async function (req, res, next) {
    if ('microsoft' in req.session) {
        return next();
    }
    let { query } = req;
    let params = new URLSearchParams();
    if ('redirect' in query) {
        params.set('state', query.redirect);
    }
    params.set('client_id', clientId);
    params.set('scope', 'openid email');
    // params.set('state', '12345');
    params.set('nonce', '67890');
    params.set('response_type', 'token');
    params.set('redirect', (
        LOCALHOST ? 'http://' + req.get('host') : 'https://hacksu.com'
    ) + '/api/oauth/microsoft/redirect');
    res.redirect(URL_Authorize + '?' + params.toString());
};

exports.redirect = async function (req, res) {
    let { query } = req;
    if (!('redirected' in query)) {
        return res.send(`<script>
            location.href = location.href.split("redirect#").join("redirect?redirected=true&");
        </script>`);
    }
    let { access_token, state } = query;
    // console.log(query);
    let data = await (
        await fetch(URL_UserInfo, {
            headers: {
                'Authorization': 'Bearer ' + access_token,
            }
        })
    ).json();
    // console.log(data);
    let {
        email,
        given_name: firstName,
        family_name: lastName,
    } = data;
    req.session.microsoft = {
        email,
        firstName,
        lastName
    };
    res.redirect('/api/oauth/microsoft' + ('state' in query ? '?redirect=' + query.state : ''));
};

exports.success = function(req, res) {
    if ('microsoft' in req.session) {
        let { query } = req;
        if ('redirect' in query) {
            res.redirect(query.redirect);
            return;
        }
        res.json(req.session.microsoft);
    } else {
        res.status(500).send('Not Authenticated');
    }
};
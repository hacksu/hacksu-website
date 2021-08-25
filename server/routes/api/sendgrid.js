let fetch = require('node-fetch');

const sendgrid = 'https://api.sendgrid.com/v3'
const sendgridToken = config.sendgrid.token;


let defaultPayload = {
    from: {
        email: 'leaders@hacksu.com',
        name: 'HacKSU',
    },
    reply_to: {
        email: 'hacksu@cs.kent.edu',
        name: 'HacKSU',
    },
    personalizations: [

    ],
    content: [

    ],
    // tracking_settings: {
    //     subscription_tracking: {
    //         enable: true,
    //         substitution_tag: SUBSTITUTION_TAG('unsubscribe'),
    //     }
    // }
};
const DEFAULT_PAYLOAD = JSON.stringify(defaultPayload);

const SUBSCRIBE_EMAIL = require('fs').readFileSync(__dirname + '/subscribe-email.html').toString('utf8')

exports.sendSubscribeEmail = async function(email) {
    let res;
    try {
        let payload = Object.assign(JSON.parse(DEFAULT_PAYLOAD), {
            subject: "HacKSU Mailing List Subscription",
            personalizations: [
                {
                    to: [
                        {
                            email,
                        }
                    ],
                    substitutions: {
                        '%{UNSUBSCRIBE}%': `https://hacksu.com/unsubscribe/${Buffer.from(email, 'utf8').toString('hex')}`,
                    }
                }
            ],
            content: [
                {
                    type: 'text/html',
                    value: SUBSCRIBE_EMAIL
                }
            ]
        });
        console.log(payload);
        res = await fetch(`${sendgrid}/mail/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sendgridToken}`
            },
            body: JSON.stringify(payload),
        })
        // console.log('res =', res);
        // console.log(await res.text())
    } catch(e) {
        // console.log(e.text())
        // console.log(e);
    }
    return res;
}

// Subscribes an email to the mailing list
// POST hacksu.com/api/mailinglist/subscribe
// BODY: example@domain.com
// hacksu.com/api/mailinglist/subscribe
exports.subscribe = async function (req, res) {
    let data = await (
        await fetch(`${sendgrid}/contactdb/recipients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sendgridToken}`
            },
            body: JSON.stringify([{
                email: req.body,
            }])
        })
    ).json();
    let response = {
        success: false,
        error: 'Unknown',
    };
    // console.log(data);
    // console.log({ response })
    // const sentEmail = await exports.sendSubscribeEmail(req.body);
    // console.log({ sentEmail })
    // if (true) return;
    try {
        await fetch(`${sendgrid}/contactdb/lists/972378/recipients/${data.persisted_recipients[0]}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sendgridToken}`
            },
            body: JSON.stringify([])
        });
        const sentEmail = await exports.sendSubscribeEmail(req.body);
        console.log({ sentEmail })
        response.success = true;
        delete response.error;
    } catch (error) {
        response.error = error.message;
    } finally {
        if (response.success) {

        }
        res.status(response.success ? 200 : 500).json(response);
    }
};

exports.unsubscribe = async function (req, res) {
    try {
        const email = Buffer.from(req.params.email, 'hex').toString('utf8');
        let data = await (
            await fetch(`${sendgrid}/contactdb/recipients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sendgridToken}`
                },
                body: JSON.stringify([{
                    email,
                }])
            })
        ).json();
        // console.log(data);
        await fetch(`${sendgrid}/contactdb/lists/972378/recipients/${data.persisted_recipients[0]}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sendgridToken}`
            },
            body: JSON.stringify([])
        });
        res.send('Unsubscribed')
    } catch(e) {
        console.log(e);
        res.send('Unsubscribe Failed')
    }
}
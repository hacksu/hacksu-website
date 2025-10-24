import { RequestHandler } from "express";

const sendgrid = 'https://api.sendgrid.com/v3';
const sendgridToken = process.env.SENDGRID_TOKEN;


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

export const sendSubscribeEmail = async email => {
    const payload = Object.assign(JSON.parse(DEFAULT_PAYLOAD), {
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
    const res = await fetch(`${sendgrid}/mail/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sendgridToken}`
        },
        body: JSON.stringify(payload),
    }).catch(_ => null);
    return res;
}

// Subscribes an email to the mailing list
// POST hacksu.com/api/mailinglist/subscribe
// BODY: example@domain.com
// hacksu.com/api/mailinglist/subscribe
export const subscribe: RequestHandler = async (req, res) => {
    let data = await fetch(`${sendgrid}/contactdb/recipients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sendgridToken}`
        },
        body: JSON.stringify([{
            email: req.body,
        }])
    })
        .then(res => res.json());

    let response = { success: false, error: 'Unknown' };
    await fetch(`${sendgrid}/contactdb/lists/972378/recipients/${data.persisted_recipients[0]}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sendgridToken}`
        },
        body: JSON.stringify([])
    })
        .then(_ => response.success = true)
        .catch(error => response.error = error.message);

    const sentEmail = await sendSubscribeEmail(req.body)
        .then(_ => response.success = true)
        .catch(error => response.error = error.message);

    console.log({ sentEmail })
    res.status(response.success ? 200 : 500).json(response);
};

export const unsubscribe: RequestHandler = async (req, res) => {
    try {
        const email = Buffer.from(req.params.email, 'hex').toString('utf8');
        let data = await fetch(`${sendgrid}/contactdb/recipients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sendgridToken}`
                },
                body: JSON.stringify([{
                    email,
                }])
            }).then(res => res.json());
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
    } catch (e) {
        console.log(e);
        res.send('Unsubscribe Failed')
    }
}
let fetch = require('node-fetch');

const sendgrid = 'https://api.sendgrid.com/v3'
const sendgridToken = config.sendgrid.token;

// Subscribes an email to the mailing list
// POST hacksu.com/api/mailinglist/subscribe
// BODY: example@domain.com
// hacksu.com/api/mailinglist/subscribe
exports.subscribe = async function (req, res) {
    let { data } = await (
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
    try {
        await fetch(`${sendgrid}/contactdb/lists/972378/recipients/${data.persisted_recipients[0]}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sendgridToken}`
            },
            body: JSON.stringify([])
        });
        response.success = true;
        delete response.error;
    } catch (error) {
        response.error = error.message;
    } finally {
        res.status(response.success ? 200 : 500).json(response);
    }
};
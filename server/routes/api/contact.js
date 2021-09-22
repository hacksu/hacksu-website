const sendgrid = 'https://api.sendgrid.com/v3'
const sendgridToken = config.sendgrid.token;
const fetch = require('node-fetch');


function ContactEmail({
    email,
    name,
    subject,
    body,
    ip
}) {
    let payload = {
        personalizations: [
            {
                to: [
                    {
                        email: 'hacksu@cs.kent.edu',
                        name: 'Hacksu Leaders',
                    },
                ],
            }
        ],
        from: {
            email: 'contact-form@hacksu.com',
            name: 'Hacksu Contact Form',
        },
        reply_to: {
            email,
            name,
        },
        subject,
        content: [
            {
                type: 'text/plain',
                value: `HacKSU Contact-Us Website Form
    
            Name: ${name}
            Email: ${email}
            Subject: ${subject}
            IP Address: ${ip}
    
            -- MESSAGE BODY --
    
            ${body}`.split('\n').map(o => o.trim()).join('\n') + `
    
            -- END OF MESSAGE BODY --
    
            `,
            },
        ],
    };
    return payload;
}

let cooldown = [];
exports.contact = async function (req, res) {
    let { ip } = req;
    let payload = ContactEmail({
        ...req.body,
        ip,
    });
    try {
        await (
            await fetch('https://api.sendgrid.com/v3/mail/send', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + sendgridToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
        ).json();
        res.status(200).json({
            success: true,
        })
    } catch(error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}
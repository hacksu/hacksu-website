/*
backend API for Hacksu website

this ONLY exists because of mailing list subscriptions
and that requires a sendgrid API key...

...not a good idea to upload that to the frontend

*/

const config = require('./server.config.json');

let express = require('express');
let api = express();
let fetch = require('node-fetch');

const sendgrid = 'https://api.sendgrid.com/v3'
const sendgridToken = config.sendgrid.token;
// Subscribes an email to the mailing list
// POST hacksu.com/api/mailinglist/subscribe
// BODY: example@domain.com
api.post('/mailinglist/subscribe', express.text(), (req, res) => {
  fetch(`${sendgrid}/contactdb/recipients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sendgridToken}`
    },
    body: JSON.stringify([{
      email: req.body,
    }])
  }).then(res => res.json())
    .then(({ data }) => {
      fetch(`${sendgrid}/contactdb/lists/972378/recipients/${data.persisted_recipients[0]}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sendgridToken}`
        },
        body: JSON.stringify([])
      }).then(() => {
        res.status(200).json({
          success: true,
        })
      }).catch(error => {
        res.status(500).json({
          success: false,
          error: error.message,
        })
      })
    }).catch(error => {
      res.status(500).json({
        success: false,
        error: error.message,
      })
    })
})

// mount to /api on port 8000 for NGINX reverse proxy
express().use('/api', api).listen(process.env.PORT || 8000);

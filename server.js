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

let ipBlocklist = {

}
let fs = require('fs');
if (fs.existsSync(`${__dirname}/ip.blocklist.json`)) {
  ipBlocklist = require(`${__dirname}/ip.blocklist.json`);
}

const sendgrid = 'https://api.sendgrid.com/v3'
const sendgridToken = config.sendgrid.token;
// Subscribes an email to the mailing list
// POST hacksu.com/api/mailinglist/subscribe
// BODY: example@domain.com
api.post('/mailinglist/subscribe', express.text(), (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (ipBlocklist[ip]) {
    return res.end();
  }
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

api.post('/contact', require('body-parser').json(), (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (ipBlocklist[ip]) {
    return res.end();
  }
  let submission = req.body;
  /*
  this.submission = {
    subject: '',
    name: '',
    email: '',
    body: '',
  }
  */
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
      email: submission.email,
      name: submission.name,
    },
    subject: submission.subject,
    content: [
      {
        type: 'text/plain',
        value: `HacKSU Contact-Us Website Form

        Name: ${submission.name}
        Email: ${submission.email}
        Subject: ${submission.subject}
        IP Address: ${ip}

        -- MESSAGE BODY --

        ${submission.body}`.split('\n').map(o => o.trim()).join('\n') + `

        -- END OF MESSAGE BODY --

        Block ${ip} from sending more messages:
        https://hacksu.com/api/ip-block?add=${ip}

        `,
      },
    ],
  };
  fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + sendgridToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  }).then(res => res.json()).then(res => {
    console.log(res);
    res.json({ success: true, })
  }).catch(err => {
    console.log(err);
    res.status(500).json({ success: false, })
  })
})

api.get('/ip-block', (req, res) => {
  let { add, remove } = req.query;
  if (add) {
    if (add == '131.123.50.198') {
      res.send('CANNOT ADD KENT STATE IP TO BLOCKLIST, THAT WOULD BE NOT GOOD...');
      return;
    }
    ipBlocklist[add] = true;
    fs.writeFileSync(`${__dirname}/ip.blocklist.json`, JSON.stringify(ipBlocklist))
  } else if (remove) {
    delete ipBlocklist[remove];
    fs.writeFileSync(`${__dirname}/ip.blocklist.json`, JSON.stringify(ipBlocklist))
  }
  res.send(`<h1>Blocked IPs</h1><ul>` + Object.keys(ipBlocklist).map(o => {
    return `<li>${o} - <a href="/ip-block?remove=${o}">Unblock</a></li>`;
  }) + '</ul>')
})

// mount to /api on port 8000 for NGINX reverse proxy
let app = express();
app.use('/api', (req, res, next) => {
  a.headers['x-forwarded-for'] = req.headers['x-forwarded-for'] || req.headers['x-real-ip'];
  next();
}, api);


// Redirects
let redirects = false;
let lastFetchedRedirects = 0;
let redirectsCacheDuration = (10 * 60 * 1000);
let fetchRedirects = async function() {
  if (Date.now() - lastFetchedRedirects >= redirectsCacheDuration) {
    lastFetchedRedirects = Date.now();
    let body = await (await fetch('https://raw.githubusercontent.com/wiki/hacksu/hacksu-2021/Hacksu-Website-Redirects.md')).text();
    redirects = Object.fromEntries(body.split('\n').filter(o => o[0] == '/').map(o => o.trim().split(' ')));
  }
};
app.get('/refresh-redirects', (req, res) => {
  lastFetchedRedirects = 0;
  fetchRedirects();
  res.send('OK');
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


if (process.env.PORT) {
  let dist = `${__dirname}/dist`;
  let index = `${dist}/index.html`;
  let static = express.static(dist);
  app.use((req, res, next) => {
    static(req, res, function() {
      res.sendFile(index);
    });
  })
} else {
  app.use(require('express-http-proxy')(`http://localhost:8080`));
}

let port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log('Listening on port', port);
});

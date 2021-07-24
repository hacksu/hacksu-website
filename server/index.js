global.config = require(__dirname + '/../server.config.json');

let express = require('express');
let fetch = require('node-fetch');

global.LOCALHOST = require('os').hostname() == 'hacksu-com';

let app = express();
app.set('trust proxy', 1);

let session = require('express-session');
let store = new (require('connect-mongodb-session')(session))({
    uri: 'mongodb://localhost:27017/hacksu-website',
    collection: 'sessions',
});
app.use(session({
    secret: config.session.secret,
    saveUninitialized: false,
    resave: false,
    store,
}));


// mount to / on port 8000 for NGINX reverse proxy
app.use(require('./routes'));
app.use('/api', (req, res, next) => {
    req.headers['x-forwarded-for'] = (
        req.headers['x-forwarded-for'] || req.headers['x-real-ip']
    );
    req.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    next();
}, require('./routes/api'));

app.use(require('./redirects'));

// if (process.env.PORT) {
    let dist = `${__dirname}/../dist`;
    let index = `${dist}/index.html`;
    let serve = express.static(dist);
    app.use(serve, (req, res, next) => {
        res.sendFile(index);
    });
// } else {
//     app.use(require('express-http-proxy')(`http://localhost:8080`));
// }

let port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log('Listening on port', port);
})

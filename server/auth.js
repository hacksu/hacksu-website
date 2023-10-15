import passport from "passport";
import DiscordStrategy from "passport-discord";
import session from "express-session";
import config from "../server.config.json" assert { type: "json" };

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new DiscordStrategy({
    ...config.discord,
    scope: ["identify", "guilds", "guilds.members.read"],
    prompt: "consent",
    callbackURL: "/discord-callback"
}, function(accessToken, refreshToken, profile, done) {
    const hacksuMembershipURL = `https://discord.com/api/v10/users/@me/guilds/632634799303032852/member`;
    fetch(
        hacksuMembershipURL,
        { headers: {"Authorization": "Bearer " + accessToken } }
    ).then(async res => {
        const membership = await res.json();
        if (membership && membership.roles) {
            if (membership.roles.includes("632637403454111769")){
                return done(null, {...profile, isLeader: true});
            }
        }
        done(null, null);
    });
}));

export default function setUpAuth(app){
    app.use(session({
        secret: config.session.secret,
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.get('/discord-login', passport.authenticate('discord'));
    app.get('/discord-callback',
        passport.authenticate('discord', { failureRedirect: '/' }),
        function(req, res) { res.redirect('/admin') } // auth success
    );
    app.get('/logout', function(req, res) {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    });
    app.get('/info', function(req, res) {
        if (req.isAuthenticated()) res.json(req.user);
        else res.send('not logged in :(');
    });
    // pre-emptive redirecting of unauthenticated users away from admin-only
    // routes. these routes should track those in src/router/index.js. this is
    // not super important, since the allowApi* checks in entities.js should
    // prevent unauthorized db access anyway, but it looks more secure.
    for (const route of ["/admin", "/redirects", "/edit-staff"]){
        app.get(route, (req, res, next) => {
            if (req.isAuthenticated() && req.user?.isLeader){
                return next();
            } else {
                return res.redirect("/discord-login");
            }
        });
    }
}

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
}

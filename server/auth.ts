import type { Application } from "express";
import session from "express-session";
import passport from "passport";
import DiscordStrategy from "passport-discord";

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj: any, done) => done(null, obj));

const ROLES = process.env.DISCORD_ROLES!.split(" ");
passport.use(
    new DiscordStrategy({
        clientID: process.env.DISCORD_CLIENT_ID!,
        clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        scope: ["identify", "guilds", "guilds.members.read"],
        callbackURL: "/discord-callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        const hacksuMembershipURL = `https://discord.com/api/v10/users/@me/guilds/632634799303032852/member`;
        const data = await fetch(hacksuMembershipURL, { headers: {"Authorization": "Bearer " + accessToken } })
            .then(res => res.json())
            .catch(_ => null);
        
        const roles: string[] = data?.roles ?? [];
        if (roles.some(role => ROLES?.includes(role))) {
            return done(null, {...profile, isLeader: true});
        }
        return done(null, false);
    })
);

export const setUpAuth = (app: Application) =>{
    app.use(session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/discord-login', passport.authenticate('discord'));
    app.get('/discord-callback',
        passport.authenticate('discord', 
            { failureRedirect: '/' }), 
            (req, res) => { res.redirect('/admin') } // auth success
    );

    app.get('/logout', (req, res, next) => {
        req.logout((err) => {
            if (err) return next(err);
            return res.redirect('/');
        });
    });

    app.get('/info', (req, res) => {
        if (req.isAuthenticated()) return res.json(req.user);
        return res.send('not logged in :(');
    });

    // pre-emptive redirecting of unauthenticated users away from admin-only
    // routes. these routes should track those in src/router/index.js. this is
    // not super important, since the allowApi* checks in entities.js should
    // prevent unauthorized db access anyway, but it looks more secure this way
    for (const route of ["/login", "/admin/*", "/audit-log"]){
        app.get(route, (req, res, next) => {
            if (req.isAuthenticated() && req.user?.isLeader){
                return next();
            }
            return res.redirect("/discord-login");
        });
    }
}

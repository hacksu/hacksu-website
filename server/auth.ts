import dotenv from "dotenv";
import type { Application } from "express";
import session from "express-session";
import passport from "passport";
import DiscordStrategy from "passport-discord";

dotenv.config();

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj: any, done) => done(null, obj));

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
        
        const roles = data?.roles;
        if (roles) {
            if (roles.includes("632637403454111769") ||  // "Leader" role
                roles.includes("634455003834089513") ||  // "New Leader" role
                roles.includes("1239730741882130542"))   // "Core Leade" role
            {
                return done(null, {...profile, isLeader: true});
            }
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

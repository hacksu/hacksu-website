const { Client, Intents } = require('discord.js');
const intents = [
    'GUILDS',
    'GUILD_MEMBERS',
    'GUILD_BANS',
    'GUILD_MESSAGES',
    'GUILD_INTEGRATIONS',
    // 'GUILD_PRESENCES',
    'GUILD_VOICE_STATES',
].map(o => Intents.FLAGS[o]);

const { guildId, token } = require(__dirname + '/../../server.config.json').discord;

const client = new Client({
    intents,
})

const defaultInvite = 'https://discord.gg/rJDdvnt';
async function getInvite() {
    const Guild = await client.guilds.fetch(guildId);
    const invites = (await Guild.invites.fetch({
        channelId: '744989171201867858'
    })).filter(o => o.maxAge != 0);
    const events = await Guild.scheduledEvents.fetch();
    const matches = invites.map(invit => {
        const event = events.find(evt => Math.abs(evt.scheduledStartTimestamp - invit._expiresTimestamp) <= (60 * 60 * 1000));
        return {
            invite: invit,
            event,
        }
    }).filter(o => o.invite && o.event);
    if (matches.length > 0) {
        const match = matches[0];
        const url = 'https://discord.gg/' + match.invite.code + '?event=' + match.event.id;
        return url;
    }
    return defaultInvite;
}


setInterval(function() {
    getInvite().then(inv => {
        invite = inv;
    })
}, 10 * 60 * 1000)

let invite;
exports.discordInvite = function() {
    console.log({ invite })
    return invite || defaultInvite;
}
//https://discord.gg/QhDaYmdQ?event=935693439595585576
client.on('ready', async () => {
    invite = await getInvite();
    // console.log({ matches })
    // const events = await Guild.scheduledEvents.fetch();
    // for (const [id, event] of events) {
    //     // console.log({ event })
    //     const maxAge = (((event.scheduledStartTimestamp - Date.now()) / 1000) + (0 * 60 * 60))
    //     const url = await event.createInviteURL({
    //         maxAge,
    //     });
    //     console.log({ url })
    //     break;
    // }
    // console.log(await Promise.all(events.map(o => o.createInviteURL({ maxAge: 0 }))))
    // console.log({ events })
})

client.login(token)
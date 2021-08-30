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

const { guildId, token } = require(__dirname + '/../server.config.json').discord;

const client = new Client({
    intents,
})

let Guild;
let MemberRole;
client.on('ready', async () => {
    console.log('discord ready')
    Guild = client.guilds.resolve(guildId)
    // console.log(Guild.roles.cache)
    MemberRole = await Guild.roles.fetch('735280966783991808')
})

client.on("guildMemberUpdate", (oldMember, newMember) => {
    if (oldMember.guild.id == guildId) {
        if (oldMember.pending && !newMember.pending) {
            try {
                newMember.roles.add(MemberRole).then(() => {
                    console.log('added member role to', newMember.displayName)
                }).catch(err => {
                    console.log('failed to add member role to', newMember.displayName)
                    console.log(e);
                })
            } catch(e) {
                console.log(e);
            }
            
        }
    }
})

client.login(token)
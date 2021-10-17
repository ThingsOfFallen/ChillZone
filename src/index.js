const config = require('./config.json');
const { Client, Collection, Intents } = require('discord.js');
const Enmap = require("enmap");
const fs = require("fs");

const client = new Client({
    messageSweepInterval: 260,
    messageCacheLifetime: 260,
    messageEditHistoryMaxSize: 260,
    messageCacheMaxSize: 180,
    fetchAllMembers: true,
    disableMentions: 'none',
    ws: { intents: Intents.ALL }
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	client.commands.set(command.name, command);
}
const prefix = '/'
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    
	if (command === 'ping') {
		client.commands.get('ping').execute(client, message, args)
	} else if (command === 'say') {
		client.commands.get('say').execute(client, message, args)
	} else if (command === 'clear') {
        client.commands.get('clear').execute(client, message, args)
    } else if (command === 'apply') {
        client.commands.get('apply').execute(client, message, args)
    } else if (command === 'ban') {
        client.commands.get('ban').execute(client, message, args)
    } else if (command === 'update') {
        client.commands.get('update').execute(client, message, args);
    } else if (command === 'status') {
        client.commands.get('status').execute(client, message, args);
    }
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(channel => channel.id === '782853972025278485')
    channel.send(`Welcome ${member} to ChillZone!`);
    member.roles.add('782831559698808884')
});

client.once('ready', () => {
    console.log('ready');
    client.user.setPresence({
        activity: {
            name: "over ChillZone Community",
            type: 'WATCHING'
        },
        status: 'online'
    })
    setInterval(() => {
        const guild = client.guilds.cache.get('782547106812002326');
        const vchannel = client.channels.cache.find(channel => channel.id === '783482295779983381');
        vchannel.setName(`🌎・Members: ${guild.memberCount}`);
    }, 60000);
})

client.login(config.client.token);
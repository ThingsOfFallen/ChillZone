module.exports = {
    name: 'ping',
    async execute(client, message, args) {
        message.channel.send(`${client.ws.ping}`);
    }
}
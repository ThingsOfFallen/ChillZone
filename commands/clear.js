module.exports = {
    name: 'clear',
    async execute(client, message, args) {
        if (!args[0]) return message.reply('No number of messages!');
        if (args[0] > 100) return message.reply('To many messages!');
        message.channel.bulkDelete(args[0])
        message.channel.send(`Deleted ${args[0]} messages!`).then(msg => {
            setTimeout(() => {
                msg.delete();
            }, 2500);
    })
    }
}
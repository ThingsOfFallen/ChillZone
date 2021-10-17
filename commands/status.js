module.exports = {
    name: 'status',
    execute(client, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('No LOL');
        if (!args[0]) return message.reply('Invalid!');
        if (!args[1]) return message.reply('Invalid!');
        if (!args[2]) return message.reply('Invalid!');
        client.user.setPresence({
            activity: {
                name: `${message.content.split(" ").slice(3).join(' ')}`,
                type: `${args[1]}`.toUpperCase()
            },
            status: `${args[0]}`.toLowerCase()
        })
    }
}
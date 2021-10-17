module.exports = {
    name: 'say',
    async execute(client, message, args) {
        if (!args[0]) return message.reply('No message!');
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('No perms.')
        message.delete()
        message.channel.send(message.content.split(" ").slice(1).join(' '));
    }
}

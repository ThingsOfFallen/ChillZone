module.exports = {
    name: 'ban',
    async execute(client, message, args) {
        const user = message.mentions.users.first()
    if (!user) return message.reply('No user specified!');
    const member = message.guild.member(user);
    if (!member) return message.reply('Error parsing user object to guildMemberManager!');
    member.ban({reason: message.content.split(" ").slice(2).join(' ')});
    message.channel.send(`Banned: ${user.tag}!`);
    }
}
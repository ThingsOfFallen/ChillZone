module.exports = {
    name: 'update',
    execute(client, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('NO, Lol');
        const vchannel = message.member.guild.channels.cache.find(channel => channel.id === '783482295779983381');
        vchannel.setName(`🌎・Members: ${message.member.guild.memberCount}`);
        message.channel.send('Update ping has been sent to the Websocket API');
    }
}
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'apply',
    async execute(client, message, args) {
        return message.reply('Staff Applications are Closed!');
        let startembed = new MessageEmbed()
            .setTitle('ChillZone')
            .setColor('#FB00FF')
            .setDescription('Welcome to your staff application!')
            .setFooter('ChillZone - Application', client.user.avatarURL())
        const questions = ["1. What is your timezone?", "2. How old are you?", "3. Why do you want to become staff?", "4. What can you offer to the staff team and the server?", "5. Do you have any previous staff experience?", "6. What will you do if you become staff?", "Do you understand that if you have lied you will be instantly denied?"];
        const dmChannel = await message.author.send(startembed);
        const collector = dmChannel.channel.createMessageCollector((msg) => msg.author.id == message.author.id);
        let i = 0;
        const res = [];
        dmChannel.channel.send(questions[0]);
        collector.on('collect', async (msg) => {
            if (message.author.bot) return
            if (questions.length == i) return collector.stop('MAX');
            const answer = msg.content;
            res.push({ question: questions[i], answer });
            i++;
            if (questions.length == i) return collector.stop('MAX');
            else dmChannel.channel.send(questions[i]);
        });
        collector.on('end', async (collected, reason) => {
            if (reason == 'MAX') {
                const admin = message.author.id
                const admintrue = message.author
                let confirmembed = new MessageEmbed()
                    .setTitle('Are you sure you want to submit your application?')
                    .setFooter('ChillZone - Application', client.user.avatarURL())
                    .setColor('#00F3FF')
                    message.author.send(confirmembed).then(async (msg) => {
                        msg.react('✅')
                        msg.react('❌')
                        msg.awaitReactions(async (reaction, user) => user.id == admin && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
                        {max: 1, time: 45000 }).then(async (collected) => {
                            if (collected.first().emoji.name == '✅') {
                                msg.delete();
                                const data = message.guild.channels.cache.find(channel => channel.id === '783173783724228648');
                                let applicationembed = new MessageEmbed()
                                    .setTitle('New Staff Application')
                                    .setColor('YELLOW')
                                    .setDescription(`**Submitted By: ${message.member.tag || message.author.tag} (${message.member.id || message.author.id})**\n${res.map(d => `**${d.question}**\n${d.answer}`).join('\n')}`)
                                    .setFooter('ChillZone - Application', client.user.avatarURL())
                                    .setTimestamp();
                                await data.send(applicationembed).then(m => {
                                    admintrue.send('Application submitted! It will be reviewed shortly.');
                                });
                            } else admin.send('Application Cancelled!');
                    }).catch((error) => {
                        console.error(error)
                        admin.send('No reaction after 45 seconds, application canceled!');
                    });
            }
        )}})
    }
}

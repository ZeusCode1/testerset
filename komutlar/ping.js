const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    
    const start = Date.now();
message.channel.send('Pong!').then(m => {
    const embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(client.user.username + " - Pong!")
        .setThumbnail(client.user.displayAvatarURL())
        .addField(`Mesaj Pingi`, `\`${Date.now() - start}ms\` 🛰️`)
        .addField(`Mesaj Yanıt Süresi`, `\`${m.createdTimestamp - start}ms\` 🛰️`)
        .addField(`Api Pingi`, `\`${Math.round(client.ws.ping)}ms\` 🛰️`)
        .setTimestamp()
        .setFooter({ text: '❤️', iconURL: message.author.avatarURL({ dynamic: true }) });
    m.edit({ embeds: [embed] }).catch(e => {})
}).catch(e => {})
}
exports.conf = {
    aliases: []
}

exports.help = {
    name: 'ping',
    description: 'Pingimi Gösterir.',
    usage: 'ping',
    category: 'bot'
}
    
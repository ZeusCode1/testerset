const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {

    const embed = new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setColor("BLUE")
        .addField("My Owner", "**<@!900016659086082079> | \`(MuteX*#6187]\`**")
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: '❤️', iconURL: message.author.avatarURL({ dynamic: true }) });
        message.channel.send({ embeds: [embed] }).catch(e => {})


}

exports.conf = {
    aliases: []
}

exports.help = {
    name: 'sahip',
    description: 'Bot Sahibini Gösterir!',
    usage: 'sahip',
    category: 'bot'

}
    
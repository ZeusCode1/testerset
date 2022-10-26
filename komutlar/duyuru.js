const Discord = require('discord.js')
exports.run = async (client, message, args) => {

const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;

if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`).catch(e => {})
 
let voteChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
if(!voteChannel) return message.channel.send(`❌ | Bir Kanal Etiketlemen Gerekli!\nDoğru Kullanım: \`${prefix}duyuru #kanal <duyuru-metni>\``).catch(e => {})

let voteContent = args.slice(1).join(' ');
if(!voteContent) return message.channel.send(`:x: | Bir Oylama Metni Belirt!\nDoğru Kullanım: \`${prefix}duyuru #kanal <duyuru-metni>\``).catch(e => {})

message.reply(`Duyuruda Everyone ve Here Etiketleri Olacak Onaylıyor İsen :white_check_mark: Bas! \`(60 Saniyen Var)\``).then(async m => {
    await m.react('✅').catch(e => {})
    await m.react('❌').catch(e => {})

    const filter = (reaction, user) => {
        return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
    }

    const collector = m.createReactionCollector(filter, { time: 60000 });

collector.on('collect', async (reaction, reactionCollector) => {

if(reaction.emoji.name === '✅') {
m.channel.send("Duyuru Başarıyla Oluşturuldu!").catch(e => {})
m.delete().catch(e => {})
const embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('Bir Duyuru Var!')
.setDescription(voteContent)
.setFooter({ text: `${message.author.tag} - Duyurdu`, iconURL: message.guild.iconURL({ dynmaic: true }) })
return voteChannel.send({content: "@everyone - @here", embeds: [embed]}).catch(e => {})

} else if(reaction.emoji.name === '❌') {
            await m.delete().catch(e => {})
            message.reply("Duyuru İptal Edildi!").catch(e => {})
        }

    })
}).catch(e => {})

}
exports.conf = {
aliases: ['duyur']
}

exports.help = {
name: 'duyuru',
description: 'Sunucuya Duyuru Yapar.',
usage: 'duyuru <#kanal> <duyuru-metni>',
category: 'moderasyon'
}
   
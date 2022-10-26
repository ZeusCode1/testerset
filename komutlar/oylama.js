const Discord = require('discord.js')
exports.run = async (client, message, args) => {

const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;

if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`Bu Komutu Kullanabilmek İçin **Sunucuyu Yönet** İznine Sahip Olmalısın!`).catch(e => {})
 
let voteChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
if(!voteChannel) return message.channel.send(`❌ | Bir Kanal Etiketlemen Gerekli!\nDoğru Kullanım: \`${prefix}oylama #kanal <oylama-metni>\``).catch(e => {})

let voteContent = args.slice(1).join(' ');
if(!voteContent) return message.channel.send(`:x: | Bir Oylama Metni Belirt!\nDoğru Kullanım: \`${prefix}oylama #kanal <oylama-metni>\``).catch(e => {})

const embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('Oylama Zamanı!')
.setDescription(voteContent)
.setFooter({ text: `Oylama Başladı!`, iconURL: message.guild.iconURL({ dynmaic: true }) })
voteChannel.send({embeds: [embed]}).then(async cs => {
  await cs.react('✅').catch(e => {})
  await cs.react('❌').catch(e => {})
  await cs.react('🤷').catch(e => {})
}).catch(e => {})

}

exports.conf = {
aliases: ['oyla']
}

exports.help = {
name: 'oylama',
description: 'Oylama Yapar.',
usage: 'oylama <#kanal> <oylama-metni>',
category: 'moderasyon'
}
   
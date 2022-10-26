const Discord = require('discord.js')
const {JsonDatabase} = require("wio.db");
const db = new JsonDatabase({databasePath:"./croxydb/wiodb.json"});
const ms = require("ms")
exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply("Bu Komutu Kullanmak İçin `Üyeleri Yasakla` Yetkisine Sahip Olmalısın!").catch(e => {})

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!member) return message.channel.send(`:x: | Bir Üye Etiketlemen Gerekli!\nDoğru Kullanım: \`${prefix}süreli-ban @kullanıcı 1m\``).catch(e => {})

let time = args[1]
if(!time) return message.channel.send(`:x: | Bir Süre Belirtmen Gerekli!\nDoğru Kullanım: \`${prefix}süreli-ban @kullanıcı 1m\``).catch(e => {})

const reason = args.slice(2).join(" ") 

time = ms(time) / 1000
const slowmodeError3 = new Discord.MessageEmbed()
.setDescription(`Lütfen Geçerli Bir Zaman Yaz!\n\nZaman Kavramları - h(saat), m(dakika), s(saniye)\n(Örnek -  ${prefix}süreli-ban @kullanıcı 1m)`)
.setColor('RED')
if (isNaN(time)) {
return message.channel.send({embeds: [slowmodeError3]}).catch(e => {})
}

if (member.id === message.author.id) 
return message.reply(`❌ | Kendi Kendini Banlayamazsın!`).catch(e => {})

if(message.member.roles.highest.position < member.roles.highest.position && !message.author.id === message.guild.ownerID)
return message.reply(`❌ | Bu Kullanıcıyı Banlayabilmek İçin Onun Üstünde Olmalısın!`).catch(e => {})

if(!member.bannable) 
return message.reply(`❌ | Bu Kullanıcıyı Banlayabilmem İçin Ondan Üstün Olmam Gerekli!`).catch(e => {})


await member.send(`:x: | Size **${message.guild.name}** Adlı Sunucuda **${time} Saniye** Boyunca,  **${reason || "Belirtilmemiş"}** Nedeniyle Süreli Ban Atıldı!`).catch(e => {})

await db.set(`banned.${message.guild.id}${member.id}`, {
date: Date.now(),
time: time*1000,
user: member.id,
guild: message.guild.id
})

await member.ban({ reason: `Sebep: ${reason || "Yok"} (Banned by. ${message.author.tag})`}).catch(e => {})
const embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('Ban Atıldı!')
.setDescription(`**${member.user.tag}** Adlı Üyeye **${time} Saniye** Boyunca, **${reason}** Nedeniyle Mute Atıldı!`)
.setFooter({ text: `${message.author.tag} Tarafından İşlem Yapıldı!` })
.setTimestamp()
message.channel.send({embeds: [embed]}).catch(e => {})


}
exports.conf = {
    aliases: []
}
exports.help = {
    name: 'süreli-ban',
    description: 'İstediğiniz Kişiyi Süreli Banlar.',
    usage: 'süreli-ban @kullanıcı <süre> <sebep>',
    category: 'moderasyon'
}
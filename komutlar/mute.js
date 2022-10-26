const Discord = require('discord.js')
const {JsonDatabase} = require("wio.db");
const db = new JsonDatabase({databasePath:"./croxydb/wiodb.json"});
const ms = require("ms")
exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply("Bu Komutu Kullanmak İçin `Üyeleri Yasakla` Yetkisine Sahip Olmalısın!").catch(e => {})

if(args[0] === "log"){
let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
if(!channel) return message.channel.send(`:x: | Bir Kanal Etiketlemen Gerekli!\nDoğru Kullanım: \`${prefix}mute log #kanal\``).catch(e => {})

await db.set('mutelog_'+message.guild.id, channel.id) 
message.channel.send(`:white_check_mark: | ** Ban Log Sistemi Bu Sunucuda Açıldı!**`).catch(e => {})

} else {

if(args[0] === "rol"){
const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
if(!role) return message.channel.send(`:x: | Bir Rol Etiketlemen Gerekli!\nDoğru Kullanım: \`${prefix}mute rol @rol\``).catch(e => {})

await db.set('muterol_'+message.guild.id, role.id)
message.channel.send(`:white_check_mark: | ** Mute Cezalı Rolü Bu Sunucuda Ayarlandı!**`).catch(e => {})

} else {

const log = db.get('mutelog_'+message.guild.id)
if(!log && !message.guild.channels.cache.get(log)) return message.channel.send(`:x: | Mute Atmak İçin Önce Log Kanalı Ayarla!\nKullanım: \`${prefix}mute log #kanal\``).catch(e => {})
const rol = db.get('muterol_'+message.guild.id)
if(!rol && !message.guild.roles.cache.get(rol)) return message.channel.send(`:x: | Mute Atmak İçin Önce Cezalı Rolü Ayarla!\nKullanım: \`${prefix}mute rol @rol\``).catch(e => {})

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!member) return message.channel.send(`:x: | Bir Üye Etiketlemen Gerekli!\nDoğru Kullanım: \`${prefix}mute @kullanıcı 1m\``).catch(e => {})

let time = args[1]
if(!time) return message.channel.send(`:x: | Bir Süre Belirtmen Gerekli!\nDoğru Kullanım: \`${prefix}mute @kullanıcı 1m\``).catch(e => {})

const reason = args.slice(2).join(" ") || "Belirtilmemiş"

time = ms(time) / 1000
const slowmodeError3 = new Discord.MessageEmbed()
.setDescription(`Lütfen Geçerli Bir Zaman Yaz!\n\nZaman Kavramları - h(saat), m(dakika), s(saniye)\n(Örnek -  ${prefix}mute @kullanıcı 1m)`)
.setColor('RED')
if (isNaN(time)) {
return message.channel.send({embeds: [slowmodeError3]}).catch(e => {})
}

await member.roles.add(rol).catch(e => {
return message.reply(`:x: | Bu Üyeye Cezalı Rolü Verilemedi! (Yetkim Yok!)`).catch(e => {})
})
await member.send(`:x: | Size **${message.guild.name}** Adlı Sunucuda **${time} Saniye** Boyunca,  **${reason}** Nedeniyle Mute Atıldı!`).catch(e => {})
await db.set(`muted_${message.guild.id}${member.id}`, {
date: Date.now(),
time: time*1000,
author: message.author.id,
role: rol,
log: log
})

const embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('Mute Atıldı!')
.setDescription(`**${member.user.tag}** Adlı Üyeye **${time} Saniye** Boyunca, **${reason}** Nedeniyle Mute Atıldı!`)
.setFooter({ text: `${message.author.tag} Tarafından İşlem Yapıldı!` })
.setTimestamp()
message.guild.channels.cache.get(log).send({embeds: [embed]}).catch(e => {})

}
}
}
exports.conf = {
    aliases: []
}
exports.help = {
    name: 'mute',
    description: 'İstediğiniz Kişiyi Mute Atar.',
    usage: 'mute @kullanıcı <süre> <sebep>',
    category: "moderasyon"
}
const Discord = require('discord.js')
const db = require("orio.db")

exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`).catch(e => {})

  if(args[0] === "ayarla-kanal"){
await db.set('reklamkanal_'+message.guild.id+message.channel.id, "Online") 
message.channel.send(`:white_check_mark: | ** Reklam Engelleme Sistemi Bu Kanalda (<#${message.channel.id}>) Açıldı! **`).catch(e => {})
 
} else {
    if(args[0] === "ayarla-sunucu"){
        await db.set('reklam_'+message.guild.id, "Online") 
        message.channel.send(`:white_check_mark: | ** Reklam Engelleme Sistemi Sunucudaki Tüm Kanallarda Açıldı! **`).catch(e => {})
    } else {
if(args[0] === "sıfırla-kanal"){
message.channel.send(`:white_check_mark: | ** Reklam Engelleme Sistemi Bu Kanalda (<#${message.channel.id}>) Kapatıldı! **`).catch(e => {})
await db.delete('reklamkanal_'+message.guild.id+message.channel.id) 
  
} else {
    if(args[0] === "sıfırla-sunucu"){
        message.channel.send(`:white_check_mark: | ** Reklam Engelleme Sistemi Sunucudaki Tüm Kanallarda Kapatıldı! **`).catch(e => {})
        await db.delete('reklam_'+message.guild.id) 
          
} else {
   return message.reply("`"+prefix+"reklam-engel ayarla-kanal & "+prefix+"reklam-engel ayarla-sunucu` veya `"+prefix+"reklam-engel sıfırla-kanal & "+prefix+"reklam-engel sıfırla-sunucu` Yazmalısın!").catch(e => {})
}}}}
}    

exports.conf = {
    aliases: []
}

exports.help = {
    name: 'reklam-engel',
    description: 'Sunucuya Reklam Atınca Uyarma Sistemini Ayarlar.',
    usage: 'reklam-engel ayarla-kanal & reklam-engel ayarla-sunucu & reklam-engel sıfırla-kanal & reklam-engel sıfırla-sunucu',
    category: 'moderasyon'
}
    
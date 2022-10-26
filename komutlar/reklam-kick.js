const Discord = require('discord.js')
const db = require("orio.db")

exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`).catch(e => {})

  if(args[0] === "ayarla-kanal"){
await db.set('reklamkickkanal_'+message.guild.id+message.channel.id, "Online") 
message.channel.send(`:white_check_mark: | ** Reklam Yapanı 3 Uyarıdan Sonra Kickleme Sistemi Bu Kanalda (<#${message.channel.id}>) Açıldı! **`).catch(e => {})
 
} else {
    if(args[0] === "ayarla-sunucu"){
        await db.set('reklamkick_'+message.guild.id, "Online") 
        message.channel.send(`:white_check_mark: | ** Reklam Yapanı 3 Uyarıdan Sonra Kickleme Sistemi Sunucudaki Tüm Kanallarda Açıldı! **`).catch(e => {})
    } else {
if(args[0] === "sıfırla-kanal"){
message.channel.send(`:white_check_mark: | ** Reklam Yapanı 3 Uyarıdan Sonra Kickleme Sistemi Bu Kanalda (<#${message.channel.id}>) Kapatıldı! **`).catch(e => {})
await db.delete('reklamkickkanal_'+message.guild.id+message.channel.id) 
  
} else {
    if(args[0] === "sıfırla-sunucu"){
        message.channel.send(`:white_check_mark: | ** Reklam Yapanı 3 Uyarıdan Sonra Kickleme Sistemi Sunucudaki Tüm Kanallarda Kapatıldı! **`).catch(e => {})
        await db.delete('reklamkick_'+message.guild.id) 
          
} else {
   return message.reply("`"+prefix+"reklam-kick ayarla-kanal & "+prefix+"reklam-kick ayarla-sunucu` veya `"+prefix+"reklam-kick sıfırla-kanal & "+prefix+"reklam-kick sıfırla-sunucu` Yazmalısın!").catch(e => {})
}}}}
}    

exports.conf = {
    aliases: []
}

exports.help = {
    name: 'reklam-kick',
    description: 'Reklam Kickleme Sistemini Açar/Kapatır.',
    usage: 'reklam-kick ayarla-kanal & reklam-kick ayarla-sunucu & reklam-kick sıfırla-kanal & reklam-kick sıfırla-sunucu',
    category: 'moderasyon'
}
    
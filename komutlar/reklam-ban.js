const Discord = require('discord.js')
const db = require("orio.db")

exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`).catch(e => {})

  if(args[0] === "ayarla-kanal"){
await db.set('reklambankanal_'+message.guild.id+message.channel.id, "Online") 
message.channel.send(`:white_check_mark: | ** Reklam Yapanı 3 Uyarıdan Sonra Yasaklama Sistemi Bu Kanalda (<#${message.channel.id}>) Açıldı! **`).catch(e => {})
 
} else {
    if(args[0] === "ayarla-sunucu"){
        await db.set('reklamban_'+message.guild.id, "Online") 
        message.channel.send(`:white_check_mark: | ** Reklam Yapanı 3 Uyarıdan Sonra Yasaklama Sistemi Sunucudaki Tüm Kanallarda Açıldı! **`).catch(e => {})
    } else {
if(args[0] === "sıfırla-kanal"){
message.channel.send(`:white_check_mark: | ** Reklam Yapanı 3 Uyarıdan Sonra Yasaklama Sistemi Bu Kanalda (<#${message.channel.id}>) Kapatıldı! **`).catch(e => {})
await db.delete('reklambankanal_'+message.guild.id+message.channel.id) 
  
} else {
    if(args[0] === "sıfırla-sunucu"){
        message.channel.send(`:white_check_mark: | ** Reklam Yapanı 3 Uyarıdan Sonra Yasaklama Sistemi Sunucudaki Tüm Kanallarda Kapatıldı! **`).catch(e => {})
        await db.delete('reklamban_'+message.guild.id) 
          
} else {
   return message.reply("`"+prefix+"reklam-ban ayarla-kanal & "+prefix+"reklam-ban ayarla-sunucu` veya `"+prefix+"reklam-ban sıfırla-kanal & "+prefix+"reklam-ban sıfırla-sunucu` Yazmalısın!").catch(e => {})
}}}}
}    

exports.conf = {
    aliases: []
}

exports.help = {
    name: 'reklam-ban',
    description: 'Reklam Ban Sistemi',
    usage: 'reklam-ban ayarla-kanal & reklam-ban ayarla-sunucu',
    category: 'moderasyon'
}
    
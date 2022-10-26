const Discord = require('discord.js')
const db = require("orio.db")

exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`).catch(e => {})

  if(args[0] === "ayarla-kanal"){
await db.set('linkkanal_'+message.guild.id+message.channel.id, "Online") 
message.channel.send(`:white_check_mark: | ** Link Engelleme Sistemi Bu Kanalda (<#${message.channel.id}>) Açıldı! **`).catch(e => {})
 
} else {
    if(args[0] === "ayarla-sunucu"){
        await db.set('link_'+message.guild.id, "Online") 
        message.channel.send(`:white_check_mark: | ** Link Engelleme Sistemi Sunucudaki Tüm Kanallarda Açıldı! **`).catch(e => {})
    } else {
if(args[0] === "sıfırla-kanal"){
message.channel.send(`:white_check_mark: | ** Link Engelleme Sistemi Bu Kanalda (<#${message.channel.id}>) Kapatıldı! **`).catch(e => {})
await db.delete('linkkanal_'+message.guild.id+message.channel.id) 
  
} else {
    if(args[0] === "sıfırla-sunucu"){
        message.channel.send(`:white_check_mark: | ** Link Engelleme Sistemi Sunucudaki Tüm Kanallarda Kapatıldı! **`).catch(e => {})
        await db.delete('link_'+message.guild.id) 
          
} else {
   return message.reply("`"+prefix+"link-engel ayarla-kanal & "+prefix+"link-engel ayarla-sunucu` veya `"+prefix+"link-engel sıfırla-kanal & "+prefix+"link-engel sıfırla-sunucu` Yazmalısın!").catch(e => {})
}}}}
}    

exports.conf = {
    aliases: []
}

exports.help = {
    name: 'link-engel',
    description: 'Sunucuya Link Atınca Uyarma Sistemini Ayarlar.',
    usage: 'link-engel ayarla-kanal & link-engel ayarla-sunucu',
    category: 'moderasyon'
}
    
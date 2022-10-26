const Discord = require('discord.js')
const db = require("croxydb")

exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`).catch(e => {})

  if(args[0] === "ayarla"){
    const data = db.get(`newaccount_${message.guild.id}`)
    if(data){
    return message.channel.send(`:x: | Hesabı 15 Günden Yeni Üyelere Rol Verme Sistemi Zaten Ayarlı!`).catch(e => {})
    }
    
  let channel = message.mentions.channels.first()
    if (!channel) {
        message.channel.send(':x: | Bir Log Kanalı Belirt!\nKullanım: `'+prefix+'yeni-hesap-engel ayarla #kanal @rol`').catch(e => {})
    }
    
let role = message.mentions.roles.first()
    if (!role) {
        message.channel.send(':x: | Bir Rol Belirt!\nKullanım: `'+prefix+'yeni-hesap-engel ayarla #kanal @rol`').catch(e => {})
    }

await db.set('newaccount_'+message.guild.id, {
    log: channel.id,
    role: role.id
}) 
message.channel.send(`:white_check_mark: | ** Hesabı 15 Günden Yeni Üyelere Rol Verme Log Kanalı ${channel} Olarak Ayarlandı, Verilecek Rol ${role} Olarak Ayarlandı!**`).catch(e => {})
 
} else {
  
if(args[0] === "sıfırla"){
    const data = db.get(`newaccount_${message.guild.id}`)
if(!data){
return message.channel.send(`:x: | Hesabı 15 Günden Yeni Üyelere Rol Verme Sistemi Zaten Ayarlı Değil!`).catch(e => {})
}

message.channel.send('Hesabı 15 Günden Yeni Üyelere Rol Verme Sistemi Sıfırlandı!').catch(e => {})
await db.delete('newaccount_'+message.guild.id)
  
} else {
   return message.reply("`"+prefix+"yeni-hesap-engel ayarla #kanal @rol` veya `"+prefix+"yeni-hesap-engel sıfırla` Yazmalısın!").catch(e => {})
}}}    

exports.conf = {
    aliases: []
}

exports.help = {
    name: 'yeni-hesap-engel',
    description: 'Yeni Hesap Engelleme Sistemini Ayarlar.',
    usage: 'yeni-hesap-engel ayarla #kanal @rol',
    category: "moderasyon"
}
    
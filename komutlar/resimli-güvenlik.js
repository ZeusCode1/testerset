const Discord = require('discord.js')
const db = require("croxydb")

exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`).catch(e => {})

  if(args[0] === "ayarla"){
    const data = db.get(`rggiris_${message.guild.id}`)
    if(data){
    return message.channel.send(`:x: | Resimli Güvenlik Sistemi Zaten Ayarlı!`).catch(e => {})
    }
    
  let channel = message.mentions.channels.first()
    if (!channel) {
        message.channel.send(':x: | Kullanım: `'+prefix+'resimli-güvenlik ayarla #kanal`').catch(e => {})
    } else {
    
await db.set('rggiris_'+message.guild.id, channel.id) 
message.channel.send(`:white_check_mark: | ** Resimli Güvenlik Kanalı ${channel} Olarak Ayarlandı!**`).catch(e => {})
    }
} else {
  
if(args[0] === "sıfırla"){
    const data = db.get(`rggiris_${message.guild.id}`)
if(!data){
return message.channel.send(`:x: | Resimli Güvenlik Sistemi Zaten Ayarlı Değil!`).catch(e => {})
}

message.channel.send('RESİMLİ GÜVENLİK GIRIS KANALI SIFIRLANDI!').catch(e => {})
await db.delete('rggiris_'+message.guild.id)
  
} else {
   return message.reply("`"+prefix+"resimli-güvenlik ayarla #kanal` veya `"+prefix+"resimli-güvenlik sıfırla` Yazmalısın!").catch(e => {})
}}}    

exports.conf = {
    aliases: []
}

exports.help = {
    name: 'resimli-güvenlik',
    description: 'Sunucuya Girenleri Güvenli Olup Olmadığını Kontrol Eder.',
    usage: 'resimli-güvenlik ayarla',  
    category: 'moderasyon'
}
    
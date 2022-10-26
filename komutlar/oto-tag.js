const Discord = require('discord.js')
const db = require("croxydb")

exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`).catch(e => {})

  if(args[0] === "ayarla"){
    const data = db.get(`ototag_${message.guild.id}`)
    if(data){
    return message.channel.send(`:x: | Otomatik İsme Tag Ekleme Sistemi Zaten Ayarlı!`).catch(e => {})
    }
    
  let channel = message.mentions.channels.first()
    if (!channel) {
        return message.channel.send(':x: | Log Kanalı Belirt!\nKullanım: `'+prefix+'oto-tag ayarla #kanal *(tagınız)`').catch(e => {})
    }
    let tag = args[2]
    if(!tag) return message.channel.send(':x: | Tag Belirt!\nKullanım: `'+prefix+'oto-tag ayarla #kanal *(tagınız)`').catch(e => {})

await db.set('ototag_'+message.guild.id, { 
    log: channel.id,
    tag: tag
    }) 
message.channel.send(`:white_check_mark: | Otomatik İsme Tag Ekleme Log Kanalı ${channel} Olarak Ayarlandı ve Oto Tag \`${tag}\` Olarak Seçildi!`).catch(e => {})
 
} else {
  
if(args[0] === "sıfırla"){
    const data = db.get(`ototag_${message.guild.id}`)
if(!data){
return message.channel.send(`:x: | Otomatik İsme Tag Ekleme Sistemi Zaten Ayarlı Değil!`).catch(e => {})
}

message.channel.send('Otomatik İsme Tag Ekleme Sıfırlandı!').catch(e => {})
await db.delete('ototag_'+message.guild.id)
  
} else {
   return message.reply("`"+prefix+"oto-tag ayarla #kanal *(tagınız)` veya `"+prefix+"oto-tag sıfırla` Yazmalısın!").catch(e => {})
}}}    

exports.conf = {
    aliases: []
}

exports.help = {
    name: 'oto-tag',
    description: 'Sunucuya Otomatik İsme Tag Ekleme Sistemini Ayarlar.',
    usage: 'oto-tag ayarla #kanal *(tagınız)',
    category: 'moderasyon'
}
    
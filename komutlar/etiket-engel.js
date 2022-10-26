const Discord = require('discord.js')
const db = require("croxydb")

exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`).catch(e => {})

  if(args[0] === "ayarla"){
    const data = db.get(`etiketengel_${message.guild.id}`)
    if(data){
    return message.channel.send(`:x: | Yetkililere Etiket Atınca Uyarma Sistemi Zaten Ayarlı!`).catch(e => {})
    }

    
await db.set('etiketengel_'+message.guild.id, "Online") 
message.channel.send(`:white_check_mark: | ** Yetkililere Etiket Atınca Uyarma Sistemi Bu Sunucuda Açıldı!**`).catch(e => {})
 
} else {
  
if(args[0] === "sıfırla"){
const data = db.get(`etiketengel_${message.guild.id}`)
if(!data){
return message.channel.send(`:x: | Yetkililere Etiket Atınca Uyarma Sistemi Zaten Ayarlı Değil!`).catch(e => {})
}

message.channel.send('Yetkililere Etiket Atınca Uyarma Sistemi Sıfırlandı!').catch(e => {})
await db.delete('etiketengel_'+message.guild.id)
  
} else {
   return message.reply("`"+prefix+"etiket-engel ayarla` veya `"+prefix+"etiket-engel sıfırla` Yazmalısın!").catch(e => {})
}}}    

exports.conf = {
    aliases: []
}

exports.help = {
    name: 'etiket-engel',
    description: 'Sunucuya Etiket Atınca Uyarma Sistemini Ayarlar.',
    usage: 'etiket-engel ayarla',
    category: 'moderasyon'
}
    
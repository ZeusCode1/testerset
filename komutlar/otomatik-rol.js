const Discord = require('discord.js')
const db = require("croxydb")

exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`).catch(e => {})

  if(args[0] === "ayarla"){
    const data = db.get(`autorole_${message.guild.id}`)
    if(data){
    return message.channel.send(`:x: | Otomatik Yeni Katılan Üyelere Rol Verme Sistemi Zaten Ayarlı!`).catch(e => {})
    }
    
  let channel = message.mentions.channels.first()
    if (!channel) {
        message.channel.send(':x: | Bir Log Kanalı Belirt!\nKullanım: `'+prefix+'oto-rol ayarla #kanal @rol`').catch(e => {})
    }
    
let role = message.mentions.roles.first()
    if (!role) {
        message.channel.send(':x: | Bir Rol Belirt!\nKullanım: `'+prefix+'oto-rol ayarla #kanal @rol`').catch(e => {})
    }

await db.set('autorole_'+message.guild.id, {
    log: channel.id,
    role: role.id
}) 
message.channel.send(`:white_check_mark: | ** Otomatik Yeni Katılan Üyelere Rol Verme Log Kanalı ${channel} Olarak Ayarlandı, Verilecek Rol ${role} Olarak Ayarlandı!**`).catch(e => {})
 
} else {
  
if(args[0] === "sıfırla"){
    const data = db.get(`autorole_${message.guild.id}`)
if(!data){
return message.channel.send(`:x: | Otomatik Yeni Katılan Üyelere Rol Verme Sistemi Zaten Ayarlı Değil!`).catch(e => {})
}

message.channel.send('Otomatik Yeni Katılan Üyelere Rol Verme Sistemi Sıfırlandı!').catch(e => {})
await db.delete('autorole_'+message.guild.id)
  
} else {
   return message.reply("`"+prefix+"oto-rol ayarla #kanal @rol` veya `"+prefix+"oto-rol sıfırla` Yazmalısın!").catch(e => {})
}}}    

exports.conf = {
    aliases: []
}

exports.help = {
    name: 'oto-rol',
    description: 'Sunucuya Otomatik Yeni Katılan Üyelere Rol Verme Sistemini Ayarlar.',
    usage: 'oto-rol ayarla #kanal @rol',
    category: "moderasyon"
}
    
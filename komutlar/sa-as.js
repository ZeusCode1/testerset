const Discord = require('discord.js')
const db = require("croxydb")

exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`).catch(e => {})

  if(args[0] === "ayarla"){
    const data = db.get(`saas_${message.guild.id}`)
    if(data){
    return message.channel.send(`:x: | Selam Alma ve Verme Sistemi Zaten Ayarlı!`).catch(e => {})
    }
    
await db.set('saas_'+message.guild.id, "Online")
message.channel.send(`:white_check_mark: | ** Selam Alma ve Verme Ayarlandı!**`).catch(e => {})
 
} else {
  
if(args[0] === "sıfırla"){
const data = db.get(`saas_${message.guild.id}`)
if(!data){
return message.channel.send(`:x: | Selam Alma ve Verme Sistemi Zaten Ayarlı Değil!`).catch(e => {})
}

message.channel.send('Selam Alma ve Verme Sistemi Sıfırlandı!').catch(e => {})
await db.delete('saas_'+message.guild.id)
  
} else {
   return message.reply("`"+prefix+"sa-as ayarla` veya `"+prefix+"sa-as sıfırla` Yazmalısın!").catch(e => {})
}}}    

exports.conf = {
    aliases: ["saas"]
}

exports.help = {
    name: 'sa-as',
    description: 'Sunucuya Otomatik Selam Alma ve Verme Sistemini Ayarlar.',
    usage: 'sa-as ayarla #kanal',
    category: 'moderasyon'

}
    
const Discord = require("discord.js");
const db = require("orio.db")
exports.run = async (client, message, args) => {
if(!message.member.permissions.has("MANAGE_GUİLD" && "MANAGE_ROLES")) return message.reply("> **❌ Bu Komutu Kullana Bilmek İçin \`Sunucuyu Yönet\` ve \`Rolleri Yönet\` Yetkilerine Sahip Olman Gerekli!**").catch(e => {})

const channel = db.get("channels-"+message.guild.id)
if(channel){
if(message.guild.channels.cache.get(channel)){
const msg = db.get("messages-"+message.guild.id)
if(msg){
message.guild.channels.cache.get(channel).messages.fetch(msg).then(async msj => {
const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
if(role){
  
let emoji = args[1]
let emojiID 
if (!emoji) return message.reply("> **❌ Hangi Emojiye Basınca Rol Verileceğini Yazmalısın!**\n> **Örnek: \`"+client.prefix+"emoji-rol-ayarla @rol :heart:\`**").catch(e => {})
  
try {
await msj.react(emoji).then(mr => {
  if(mr.emoji.id){
    emojiID = mr.emoji.id
  }
  emoji = mr.emoji.name
})
} catch(err){
return message.reply("> **❌ Belirtilen Mesaja Reaksiyon Ekleyemedim `"+emoji+"` Emoji Bu Sunucuya Ait Değil!**").catch(e => {})
}

if(db.get("reactions."+message.guild.id)){
let data = Object.entries(db.get("reactions."+message.guild.id)).filter(mr => mr[1].channel == channel).map(me => me[1].channel)
if(!data.length == 0){
let data2 = Object.entries(db.get("reactions."+message.guild.id)).filter(mr => mr[1].message == msj.id).map(me => me[1].message)
if(!data2.length == 0){
let data3 = Object.entries(db.get("reactions."+message.guild.id)).filter(mr => mr[1].role == role.id).map(me => me[1]).filter(ms => ms.emoji == emoji)
if(!data3.length == 0){
  return message.reply("> **Zaten Belirtilen Mesaja Aynı Emojide Aynı Rol Atanmış!**").catch(e => {})
}}}}
  
await db.push("reactions."+message.guild.id,{
  message: msg,
  channel: channel,
  guild: message.guild.id,
  role: role.id,
  emoji: emoji,
  emojiID: emojiID,
  author: message.author.id,
  time: Date.now()
})
  
  const cse = new Discord.MessageEmbed()
 .setTitle(message.guild.name+" Emoji Rol Sistemi")
 .setColor("BLUE")
 .setThumbnail(client.user.displayAvatarURL())
 .setDescription("> **✅ Başarılı, Rol: \`"+role.name+"\`, Emoji: "+emoji+" Olarak Ayarlandı! ([Mesaja Git]("+msj.url+"))**")
 .setTimestamp()
 .setFooter({text: "JR" })
  return message.channel.send({embeds : [cse]}).catch(e => {})


} else {
return message.reply("> **❌ Verilecek Rolü Etiketlemelisin veya ID'sini Yazmalısın**\n> **Örnek: \`"+client.prefix+"emoji-rol-ayarla @rol :heart:\`**").catch(e => {})
}
}).catch(e => {
return message.reply("> **❌ İlk Önce Emoji Eklenecek Mesajın ID'sini Ayarlamanız Gerekir!**\n> **Örnek: \`"+client.prefix+"emoji-rol-mesaj <mesaj-id>\`**").catch(e => {})
})

} else {
return message.reply("> **❌ İlk Önce Emoji Eklenecek Mesajın ID'sini Ayarlamanız Gerekir!**\n> **Örnek: \`"+client.prefix+"emoji-rol-mesaj <mesaj-id>\`**").catch(e => {})
}} else {
return message.reply("> **❌ İlk Önce Emoji Eklenecek Mesajın Bulunduğu Kanalı Ayarlamanız Gerekir!**\n> **Örnek: \`"+client.prefix+"emoji-rol-kanal <#kanal>\`**").catch(e => {})
}} else {
return message.reply("> **❌ İlk Önce Emoji Eklenecek Mesajın Bulunduğu Kanalı Ayarlamanız Gerekir!**\n> **Örnek: \`"+client.prefix+"emoji-rol-kanal <#kanal>\`**").catch(e => {})
}
}

exports.conf = {
  aliases: []
}

exports.help = {
  name: "emoji-rol-ayarla",
  description: "Emojiye Rol Ekler.",
  usage: "emoji-rol-ayarla @rol :heart:",
  category: "emojirol"
}
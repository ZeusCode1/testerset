const Discord = require("discord.js")
const db = require("orio.db")
exports.run= async(client, msg, args) => {
    const prefix = client.db.get(`prefix_${msg.guild.id}`) || client.ayarlar.prefix;
if(!msg.member.permissions.has("ADMINISTRATOR")) return msg.reply("**Yetersiz Yetki => `Yönetici` İzni Gerekli!**")

  if(db.get(msg.guild.id+"ödüller")){
if(args[0] === "sil"){
const csr = msg.mentions.roles.first()
if(!csr){
  msg.reply("**Ödül Listesinden Silmek İstediğin Rolü Etiketle!**")
} else {
  
const data = db.get(msg.guild.id+"ödüller")
if(!data.map(cs => cs.roleID).includes(csr.id)){
  msg.reply("**Ödül Listesinde Belirttiğin Rol Yok!**")
} else {
  
db.unpush(msg.guild.id+"ödüller", {roleID: csr.id})
return msg.reply("**Başarıyla Belirtilen Rol Ödül Listesinden Silindi!**")
}
}
} else {
  
const csr = msg.mentions.roles.first()
if(!csr){
  msg.reply("**Ödül Listesine Eklemek İstediğin Rolü Etiketle!\nÖrnek: `"+prefix+"seviye-ödül @CODESHARE 2` veya `"+prefix+"seviye-ödül sil @CODESHARE`**")
} else {
  
const data = db.get(msg.guild.id+"ödüller")
if(data.map(cs => cs.roleID).includes(csr.id)){

  msg.reply("**Ödül Listesinde Belirttiğin Rol Zaten Var!**")

} else {
  
if(!args[1]){
  msg.reply("**Belirtilen Rolü Kazanmak İçin Hangi Seviyeye Ulaşılması Gerektiğini Yazmalısın!\nÖrnek: `"+prefix+"seviye-ödül @CODESHARE 2`**")
} else {
  
if(isNaN(args[1])){
 msg.reply("**Bir Seviye Belirtmen Gerek, Lütfen Sayısal Bir Değer Yaz!\nÖrnek: `"+prefix+"seviye-ödül @CODESHARE 2`**")
} else {

await db.push(msg.guild.id+"ödüller",{
  roleID: csr.id,
  lv: args[1],
  author: msg.author.id
})
  
const cse = new Discord.MessageEmbed()
.setTitle("Başarıyla Yeni Ödül Eklendi!")
.setColor("BLUE")
.setDescription("**Eklenen Ödül Rolü: <@&"+csr.id+">\nÖdül Seviyesi: `"+args[1]+"`**")
.setTimestamp()
msg.channel.send({embeds: [cse]})
}}}}}
  } else {
    if(args[0] === "sil"){
      msg.reply("**Sistemde Silinecek Bir Ödül Rolü Yok!**")
    } else {
      const csr = msg.mentions.roles.first()
if(!csr){
    msg.reply("**Ödül Listesine Eklemek İstediğin Rolü Etiketle!\nÖrnek: `"+prefix+"seviye-ödül @CODESHARE 2` veya `"+prefix+"seviye-ödül sil @CODESHARE`**")
} else {
  if(!args[1]){
  msg.reply("**Belirtilen Rolü Kazanmak İçin Hangi Seviyeye Ulaşılması Gerektiğini Yazmalısın!\nÖrnek: `"+prefix+"seviye-ödül @CODESHARE 2`**")
} else {
  if(isNaN(args[1])){
 msg.reply("**Bir Seviye Belirtmen Gerek, Lütfen Sayısal Bir Değer Yaz!\nÖrnek: `"+prefix+"seviye-ödül @CODESHARE 2`**")
} else {
await db.push(msg.guild.id+"ödüller",{
  roleID: csr.id,
  lv: args[1],
  author: msg.author.id
})
  
const cse = new Discord.MessageEmbed()
.setTitle("Başarıyla Yeni Ödül Eklendi!")
.setColor("BLUE")
.setDescription("**Eklenen Ödül Rolü: <@&"+csr.id+">\nÖdül Seviyesi: `"+args[1]+"`**")
.setTimestamp()
msg.channel.send({embeds: [cse]})
}
}
}
    }
  }
}

exports.conf = {
aliases: []
}

exports.help = {
name: "seviye-ödül",
description: "Seviye Sistemi İçin Ödül Sistemi",
usage: "seviye-ödül @rol seviye",
category: "seviye"
}
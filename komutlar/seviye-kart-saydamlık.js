const Discord = require("discord.js")
const db = require("orio.db")
exports.run= async(client, msg, args) => {
    const prefix = client.db.get(`prefix_${msg.guild.id}`) || client.ayarlar.prefix;
if(!msg.member.permissions.has("ADMINISTRATOR")) return msg.reply("**Yetersiz Yetki => `Yönetici` İzni Gerekli!**")
  
    if (args[0] === "sıfırla") {
      if (!db.get(`${msg.guild.id}saydam`)) {
        msg.channel.send("**Rank Kartı Saydamlık Ayarı Zaten Stabil Derecede!**")
      } else {
      db.delete(`${msg.guild.id}saydam`);
      msg.channel.send("**Rank Kartı Saydamlık Ayarı Başarı ile Stabil Dereceye Sıfırlandı!**")
      }
    } else {
    if (!args[0]) {
      msg.channel.send("**Bir Saydamlık Derecesi Girmen Gerekli!\nÖrnek: `"+prefix+"seviye-kart-saydamlık 1` - Dereceler: `1, 2, 3, 4, 5`\nSıfırlamak İçin: `"+prefix+"seviye-kart-saydamlık sıfırla`**")
    } else {
  
    if (isNaN(args[0])) {
      msg.channel.send("**Bir Saydamlık Derecesi Girmen Gerekli!\nÖrnek: `"+prefix+"seviye-kart-saydamlık 1` - Dereceler: `1, 2, 3, 4, 5`\nSıfırlamak İçin: `"+prefix+"seviye-kart-saydamlık sıfırla`**")
    } else {

    if (args[0] > 5 || args[0] < 1) {
      msg.channel.send("**Lütfen Saydamlık Derecesini `1 - 5` Arası Bir Sayı Olarak Yazınız!**")
    } else {
      
    let saydamlık
    if(args[0] == "1") saydamlık = 40
    if(args[0] == "2") saydamlık = 30
    if(args[0] == "3") saydamlık = 20
    if(args[0] == "4") saydamlık = 10
    if(args[0] == "5") saydamlık = 0
      
    db.set(`${msg.guild.id}saydam`, saydamlık)
    msg.channel.send("**Saydamlık Derecesi Başarıyla `"+args[0]+"` Olarak Ayarlandı!\nSıfırlamak İçin: `"+prefix+"seviye-kart-saydamlık sıfırla`**");

    }}}}
}

exports.conf = {
aliases: []
}

exports.help = {
name: "seviye-kart-saydamlık",
description: "Seviye Kartı Saydamlık Ayarını Ayarlar.",
usage: "seviye-kart-saydamlık [1-5]",
category: "seviye"
}
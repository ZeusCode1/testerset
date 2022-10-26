const Discord = require("discord.js")
const db = require("orio.db")
exports.run= async(client, msg, args) => {
    const prefix = client.db.get(`prefix_${msg.guild.id}`) || client.ayarlar.prefix;
if(!msg.member.permissions.has("ADMINISTRATOR")) return msg.reply("**Yetersiz Yetki => `Yönetici` İzni Gerekli!**")
  
    if (args[0] === "sıfırla") {
      if (!db.get(`${msg.guild.id}resim`)) {
        msg.channel.send("**Rank Kartının Arka Plan Resmi Zaten Ayarlı Değil!**")
        
      } else {
        
      db.delete(`${msg.guild.id}resim`);
      msg.channel.send("**Rank Kartı Arka Plan Resmi Başarı ile Sıfırlandı!**")
      }
    } else {
  
    if (!args[0]) {
      msg.channel.send("**Arka Plana Ayarlamak İstediğiniz Resim Linkini Yazın ÖRNEK: `"+prefix+"seviye-kart-resim https://jr.com`\nSıfırlamak İçin: `"+prefix+"seviye-kart-resmi sıfırla`**")
    } else {
  
    if (!args[0].startsWith("http" || "https")) {
      msg.channel.send("**Arka Plan Resminin Linki `http` veya `https``Uzantısı ile Başlamalı!**")
    } else {

    db.set(`${msg.guild.id}resim`, args[0]);    
  const embed = new Discord.MessageEmbed()
    .setTitle("Resim Kartı Arka Plan Resmi Değişti!")
    .setThumbnail(args[0])
    .setTimestamp()
    msg.channel.send({embeds: [embed]});
  
    }}}
}

exports.conf = {
aliases: []
}

exports.help = {
name: "seviye-kart-resmi",
description: "Seviye Kartı Arka Plan Resmini Ayarlar.",
usage: "seviye-kart-resmi <link>",
category: "seviye"
}
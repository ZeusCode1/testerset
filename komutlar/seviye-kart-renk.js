const Discord = require("discord.js")
const db = require("orio.db")
exports.run= async(client, msg, args) => {
    const prefix = client.db.get(`prefix_${msg.guild.id}`) || client.ayarlar.prefix;
if(!msg.member.permissions.has("ADMINISTRATOR")) return msg.reply("**Yetersiz Yetki => `Yönetici` İzni Gerekli!**")
  
    if (args[0] === "sıfırla") {
      if (!db.get(`${msg.guild.id}renk`)) {
        msg.channel.send("**Zaten Rank Kartının Arka Plan Rengi Değişmemiş!**");
      } else {
      db.delete(`${msg.guild.id}renk`);
      msg.channel.send("**Rank Kartı Arka Plan Rengi Sıfırlandı!**");
      }
    } else {
  
    if (!args[0]) {
      msg.channel.send("**Lütfen Birşeyler Yaz!\nÖrnek: `"+prefix+"seviye-kart-renk ff00ff` veya `"+prefix+"seviye-kart-renk sıfırla`**");
    } else {
  
    if (args[0].length !== 6) {
      msg.channel.send("**Renk Kodları 6 Haneli Olur!\nÖrnek: `"+prefix+"seviye-kart-renk ff00ff`**");
    } else {
  
    db.set(`${msg.guild.id}renk`, args[0]);

    var Canvas = require("canvas");
    var canvas = Canvas.createCanvas(250, 250);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#"+args[0]
    ctx.fill();
    ctx.fillRect(0, 0, 250, 250);
    const embed = new Discord.MessageEmbed()
    .setTitle("Rank Kartı Rengi Başarıyla Değiştirildi!")
    .setDescription("**Ayarlanan Renk Kodu: `"+args[0]+"`\nSıfırlamak İçin: `"+prefix+"seviye-kart-renk sıfırla`**")
    .setThumbnail('attachment://renk.png')
    .setColor(args[0])
    .setTimestamp()
    msg.channel.send({embeds: [embed], files:[{ attachment:canvas.toBuffer(), name:"renk.png" }]});
    }}} 
}

exports.conf = {
aliases: []
}

exports.help = {
name: "seviye-kart-renk"
} 
const Discord = require("discord.js")
const db = require("orio.db")
exports.run= async(client, msg, args) => {
  
const data = db.get(msg.guild.id+"ödüller")
if(data){
let sayı = 1
const cse = new Discord.MessageEmbed()
.setTitle("ÖDÜL LİSTESİ")
.setColor("BLUE")
.setDescription(data.map(cs => `**${sayı++} | <@&${cs.roleID}> - \`${cs.lv}.\` Seviye Gerekir**`).slice(0, 10).join("\n"))
.setTimestamp()
msg.channel.send({embeds: [cse]})
  
} else {
  msg.reply("**Ödül Olarak Hiç Rol Ayarlanmamış!**")
}}

exports.conf = {
aliases: []
}

exports.help = {
name: "seviye-ödüller",
description: "Ödül Listesini Gösterir.",
usage: "seviye-ödüller",
category: "seviye"

} 
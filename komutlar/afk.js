const { MessageEmbed } = require("discord.js");
const {JsonDatabase} = require("wio.db");
const db = new JsonDatabase({databasePath:"./croxydb/wiodb.json"});

module.exports.run = async (client, message, args) => {
  var sebep = args.slice(0).join("  ");
  
    if (!sebep) return message.channel.send({ content: `**AFK Moduna Geçmek İçin Bir Sebep Belirtmelisin!**`}).catch(e => {})



    await message.react("✅")
  
    db.set(`afk_${message.author.id}${message.guild.id}`, {
      sebep: sebep,
      oldName: message.member.displayName,
      time: Date.now(),
      server: message.guild.id
      })

         message.member.setNickname(`[AFK] ${message.member.displayName}`).catch(e => {})

         let dcs16 = new MessageEmbed()
        .setTitle(`✅ İşlem Başarılı!`)
        .setThumbnail(message.guild.iconURL())
        .setDescription(`**AFK Moduna Girdiniz!**`)
        .setColor("GREEN")
        .setTimestamp()
        .setFooter({ text: message.guild.name });
       message.channel.send({ embeds: [dcs16] }).catch(e => {})
    

};
module.exports.conf = {
  aliases: []
};

module.exports.help = {
  name: "afk",
  description: "AFK Moduna Geçersiniz.",
  usage: "afk <sebep>",
  category: "kullanıcı"
};
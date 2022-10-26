const Discord = require("discord.js");
const db = require('orio.db');
exports.run = async (client, message, args) => {

  if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply({ content: "Bu komutu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!"}).catch(e => {})

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!user) return message.reply({ content: "Kimi uyarmak istiyor isen onu etiketlemelisin veya kullanıcı hesap id yazmalısın!"}).catch(e => {})
  let reason = args.slice(1).join(' ');
  if(!reason) return message.reply({ content: "Uyarılacak kişinin uyarılma sebebini yazmalısın!"}).catch(e => {})

let warnid = db.get(message.guild.id+user.id+".warns")
if(warnid && !warnid == 0){
  warnid = warnid.length+1
} else {
  warnid = 1
}

await db.push(`${message.guild.id}${user.id}.warns`, {
  id: "#"+warnid,
  user: user.id,
  reason: reason,
  time: Date.now(),
  moderator: message.author.id
})



    const embed = new Discord.MessageEmbed()
    .setTitle("Uyarı Bildirimi")
    .setDescription(`${user} adlı kullanıcıya **${reason}** sebebi ile uyarı verildi. Toplam uyarı sayısı **${db.get(message.guild.id+user.id+".warns").length || 1}** oldu.`)
    .setColor("BLUE")
    .setTimestamp()
    return message.channel.send({embeds : [embed]}).catch(e => {})

};
exports.conf = {
  aliases: ["warn"]
};

exports.help = {
  name: "uyar",
  description: "Kullanıcıyı uyarır.",
  usage: "uyar <@kullanıcı> <sebep>",
  category: "moderasyon"
};

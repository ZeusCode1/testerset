const Discord = require("discord.js")

exports.run = (client, message, args) => {

  if (!message.member.permissions.has("MANAGE_ROLES")) return message.reply("❌ Bu Komutu Kullana Bilmek için `Rolleri Yönet` Yetkisine Sahip Olmalısın!").catch(e => {});

  
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!user) return message.reply("**⚠ Rol Almak İstediğin Kişiyi Yazmalısın!**").catch(e => {});
  
  let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
  if (!rol) return message.reply("**⚠ Bir Rol Yazmalısın!**").catch(e => {});

  if(message.member.roles.highest.position < rol.rawPosition) return message.reply("**⚠ Bu Rolü Almak İçin Üstünde Olmalısın!**").catch(e => {});

  user.roles.remove(rol).catch(e => {
    return message.reply("**⚠ Bu Kişiden Rol Alınamadı! (Yetkim Yetmiyor)**").catch(e => {});
  });

  const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTimestamp()
    .setDescription(`✅  Başarıyla ${user} İsimli Kullanıcıdan ${rol} İsimli Rol Alındı!`)
  message.channel.send({embeds: [embed]}).catch(e => {})
}

exports.conf = {
  aliases: ["rolal", "ra"]
}

exports.help = {
  name: "rol-al",
  description: "İstediğiniz Kişiden rol alır",
  usage: "rol-al <kullanıcı> [rol]",
  category: "moderasyon"
};

const Discord = require("discord.js")

exports.run = (client, message, args) => {

  if (!message.member.permissions.has("MANAGE_ROLES")) return message.reply("❌ Bu Komutu Kullana Bilmek için `Rolleri Yönet` Yetkisine Sahip Olmalısın!").catch(e => {});

  
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!user) return message.reply("**⚠ Rol Vermek İstediğin Kişiyi Yazmalısın!**").catch(e => {});
  
  let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
  if (!rol) return message.reply("**⚠ Bir Rol Yazmalısın!**").catch(e => {});

  if(message.member.roles.highest.position < rol.rawPosition) return message.reply("**⚠ Bu Rolü Vermek İçin Üstünde Olmalısın!**").catch(e => {});

  user.roles.add(rol).catch(e => {
    return message.reply("**⚠ Bu Kişiye Rol Verilemedi! (Yetkim Yetmiyor)**").catch(e => {});
  });

  const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTimestamp()
    .setDescription(`✅  Başarıyla ${user} İsimli Kullanıcıya ${rol} İsimli Rol Verildi!`)
  message.channel.send({embeds: [embed]}).catch(e => {})
}

exports.conf = {
  aliases: ["rolver", "rv"]
}

exports.help = {
  name: "rol-ver",
  description: "İstediğiniz Kişiye rol verir.",
  usage: "rol-ver <kullanıcı> [rol]",
  category: "moderasyon"
};

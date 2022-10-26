const Discord = require("discord.js");
exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
try {
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
const permission = message.member.permissions.has("KICK_MEMBERS");
if(!permission) return message.reply("❌ | Bu Komutu Kullanmak İçin `Üyeleri At` Yetkisine Sahip Olmalısın!").catch(e => {})
if(!args[0]) return message.reply(`❌ | Bir Üye Etiketlemen Gerekli!\nDoğru Kullanım: ${prefix}kick @Kullanıcı`).catch(e => {})
if(!member) return message.reply(`💤 | Bu Kullanıcı Bulunamadı`).catch(e => {})

    if (member.id === message.author.id) 
    return message.reply(`❌ | Kendi Kendini Atamazsın!`).catch(e => {})

    if(message.member.roles.highest.position < member.roles.highest.position && !message.author.id === message.guild.ownerID)
    return message.reply(`❌ | Bu Kullanıcıyı Kickleye Bilmek İçin Onun Üstünde Olmalısın!`).catch(e => {})
    
    if(!member.bannable) 
    return message.reply(`❌ | Bu Kullanıcıyı Kickleye Bilmek İçin Ondan Üstün Olmam Gerekli!`).catch(e => {})

    return (
      (await member.kick([`Sebep: ${args.slice(1).join(" ") || "Yok"} (Kicked by. ${message.author.tag})`])) +
      message.reply({ content: `:anger: | \`${member.user.username}\` Kullanıcısı Başarıyla Kicklendi!` }).catch(e => {})
    )
      } catch(err) {
        message.reply(`Bir Hata Var: ${err}`).catch(e => {})
      }

};
exports.conf = {
  aliases: ["Kick"]
};

exports.help = {
  name: "kick",
  description: "İstediğiniz Kişiyi Sunucudan Atar.",
  usage: "kick <kullanıcı> [sebep]",
  category: "moderasyon"
};

const Discord = require("discord.js");
exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
try {
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
const permission = message.member.permissions.has("BAN_MEMBERS");
if(!permission) return message.reply("❌ | Bu Komutu Kullanmak İçin `Üyeleri Yasakla` Yetkisine Sahip Olmalısın!").catch(e => {})
if(!args[0]) return message.reply(`❌ | Bir Üye Etiketlemen Gerekli!\nDoğru Kullanım: ${prefix}ban @Kullanıcı`).catch(e => {})
if(!member) return message.reply(`💤 | Bu Kullanıcı Bulunamadı!`).catch(e => {})

    if (member.id === message.author.id) 
    return message.reply(`❌ | Kendi Kendini Banlayamazsın!`).catch(e => {})

    if(message.member.roles.highest.position < member.roles.highest.position && !message.author.id === message.guild.ownerID)
    return message.reply(`❌ | Bu Kullanıcıyı Banlayabilmek İçin Onun Üstünde Olmalısın!`).catch(e => {})
    
    if(!member.bannable) 
    return message.reply(`❌ | Bu Kullanıcıyı Banlayabilmem İçin Ondan Üstün Olmam Gerekli!`).catch(e => {})

    return (
      (await member.ban({ reason: `Sebep: ${args.slice(1).join(" ") || "Yok"} (Banned by. ${message.author.tag})`})) +
      message.reply({ content: `:anger: | \`${member.user.username}\` Kullanıcısı Başarıyla Banlandı!` }).catch(e => {})
    );
      } catch(err) {
        message.reply(`Bir Hata Var: ${err}`).catch(e => {})
      }

};
exports.conf = {
  aliases: ["Ban"]
};

exports.help = {
  name: "ban",
  description: "İstediğiniz Kişiyi Sunucudan Banlar.",
  usage: "ban <kullanıcı> [sebep]",
  category: "moderasyon"
};

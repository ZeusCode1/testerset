const Discord = require("discord.js");
const request = require("request");
exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
try {
let member = args[0]
const permission = message.member.permissions.has("BAN_MEMBERS");
if(!permission) return message.reply("❌ | Bu Komutu Kullanmak İçin `Üyeleri Yasakla` Yetkisine Sahip Olmalısın!").catch(e => {})
if(!args[0]) return message.reply(`❌ | Bir Üye ID'si Yazman Gerekli!\nDoğru Kullanım: ${prefix}unban Kullanıcı-id`).catch(e => {})

request(
  {
    url: `https://discordapp.com/api/v8/users/${member}`,
    headers: {
      Authorization: `Bot ${client.ayarlar.token}`
    }
  },
  function(error, response, body) {
    if (error) return 
    else if (!error) {
      member = JSON.parse(body);

      if (!member.id) {
        return message.reply("💤 | Belirtilen ID'ye Sahip Bir Discord Kullanıcısı Yok!").catch(e => {})
      }

    if (member.id === message.author.id) 
    return message.reply(`❌ | Kendi Kendine Unban Atamazsın!`).catch(e => {})

    message.guild.members.unban(member.id).then(cs => {
    return message.reply({ content: `:anger: | \`${member.username}\` İsimli Kullanıcının Yasağı Başarıyla Kaldırıldı!` }).catch(e => {})
    }).catch(e => { message.reply(":x: | Bu Kullanıcı Zaten Sunucudan Yasaklı Değil veya Bu İşlemi Yapmaya Yetkim Yok!").catch(e => {})})
  
  }})
} catch(err) {
        message.reply(`Bir Hata Var: ${err}`).catch(e => {})
      }
    
};
exports.conf = {
  aliases: ["un-ban"]
};

exports.help = {
  name: "unban",
  description: "İstediğiniz Kişiyi Sunucudan Unbanlar.",
  usage: "unban <kullanıcı>",
  category: "moderasyon"
};

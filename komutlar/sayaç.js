const Discord = require("discord.js");
const {JsonDatabase} = require("wio.db");
const db = new JsonDatabase({databasePath:"./croxydb/wiodb.json"});
exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply({ content: "Bu komutu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!"}).catch(e => {})

    if(args[0] === "sıfırla") {
const data = await db.get(`sayaç_${message.guild.id}`)
if(!data) return message.reply({ content: `Sayaç kanalı zaten ayarlanmamış!` }).catch(e => {})

await db.delete(`sayaç_${message.guild.id}`)
const embed = new Discord.MessageEmbed()
.setTitle("Sayaç Kanalı Sıfırlandı")
.setDescription(`Sayaç kanalı sıfırlandı!`)
.setColor("BLUE")
.setTimestamp()
return message.channel.send({embeds : [embed]}).catch(e => {})


    } else {
let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
if(!channel) return message.reply({ content: `Sayaç log kanalı belirtmen gerekli!\nÖrnek: \`${prefix}sayaç #kanal 1000\`` }).catch(e => {})

  let sayı = args[1]
  if(!sayı) return message.reply({ content: "Sayaç sayısı belirtmen gerekli!" }).catch(e => {})
  if(isNaN(sayı)) return message.reply({ content: "Sayaç için bir sayı yazmalısın!" }).catch(e => {})

if(sayı < message.guild.memberCount) return message.reply({ content: `Sayaç sayısı sunucudaki toplam üye sayısından az olamaz!` }).catch(e => {})
if(sayı == message.guild.memberCount) return message.reply({ content: `Sayaç sayısı sunucudaki toplam üye sayısından az olamaz!` }).catch(e => {})

await db.set(`sayaç_${message.guild.id}`, {
    log: channel.id,
    sayı: sayı,
    author: message.author.id
})
    const embed = new Discord.MessageEmbed()
    .setTitle("Sayaç Ayarlandı")
    .setDescription(`Sayaç ayarlandı!\nSayaç log kanalı: ${channel}\nSayaç sayısı: \`${sayı}\``)
    .setColor("BLUE")
    .setTimestamp()
    return message.channel.send({embeds : [embed]}).catch(e => {})
    }
};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "sayaç",
  description: "Sayaç ayarlamanızı sağlar.",
  usage: "sayaç <#kanal> <sayı>",
  category: "moderasyon"
};

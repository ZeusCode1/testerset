const Discord = require('discord.js')
const {JsonDatabase} = require("wio.db");
const db = new JsonDatabase({databasePath:"./croxydb/wiodb.json"});

exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply("Bu Komutu Kullanmak İçin `Üyeleri Yasakla` Yetkisine Sahip Olmalısın!").catch(e => {})

const log = db.get('mutelog_'+message.guild.id)
if(!log && !message.guild.channels.cache.get(log)) return message.channel.send(`:x: | Mute Atmak İçin Önce Log Kanalı Ayarla!\nKullanım: \`${prefix}mute log #kanal\``).catch(e => {})
let rol = db.get('muterol_'+message.guild.id)
if(!rol && !message.guild.roles.cache.get(rol)) return message.channel.send(`:x: | Mute Atmak İçin Önce Cezalı Rolü Ayarla!\nKullanım: \`${prefix}mute rol @rol\``).catch(e => {})


const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!member) return message.channel.send(`:x: | Bir Üye Etiketlemen Gerekli!\nDoğru Kullanım: \`${prefix}un-mute @kullanıcı\``).catch(e => {})

const reason = args.slice(2).join(" ") || "Sebep Belirtilmedi!"
rol = message.guild.roles.cache.get(rol)

const data = db.get(`muted_${message.guild.id}${member.id}`)
if(!data && !member.roles.cache.has(rol.id)) return message.channel.send(`:x: | Bu Üyenin Mute Durumu Yok!`).catch(e => {})

await member.roles.remove(rol.id).catch(e => {
return message.reply(`:x: | Bu Üyeden Cezalı Rolü Alınamadı! (Yetkim Yok!)`).catch(e => {})
})

await member.send(`:white_check_mark: | Size **${message.guild.name}** Adlı Sunucuda Verilen Ceza \`${message.author.tag}\` Tarafından Kaldırıldı!`).catch(e => {})
await db.delete(`muted_${message.guild.id}${member.id}`)

const embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('Mute Kaldırıldı!')
.setDescription(`**${member.user.tag}** Adlı Üyeye Verilen Ceza <@${message.author.id}> Tarafından Kaldırıldı!`)
.setFooter({ text: `${message.author.tag} Tarafından İşlem Yapıldı!` })
.setTimestamp()
message.guild.channels.cache.get(log).send({embeds: [embed]}).catch(e => {})


}
exports.conf = {
    aliases: []
}
exports.help = {
    name: 'un-mute',
    description: 'Mute Kaldırır.',
    usage: 'un-mute', 
    category: 'moderasyon'
}
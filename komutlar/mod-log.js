const Discord = require('discord.js');
const {JsonDatabase} = require("wio.db");
const db = new JsonDatabase({databasePath:"./croxydb/wiodb.json"});
exports.run = async (client, message, args) => {
let prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply({ content: "Bu komutu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!"}).catch(e => {})

if(args[0] === "ayarla") {
const data = await db.get(`modlog_${message.guild.id}`)
if(data && message.guild.channels.cache.get(data)){
return message.reply({ content: `Mod-log kanalı zaten ayarlanmış!` }).catch(e => {})
} 
let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
if(!channel) return message.reply({ content: `Mod-log kanalı belirtmen gerekli!\nÖrnek: \`${prefix}mod-log ayarla #kanal\`` }).catch(e => {})

    await db.set(`modlog_${message.guild.id}`, channel.id)
    const embed = new Discord.MessageEmbed()
    .setTitle("Mod-log Ayarlandı")
    .setDescription(`Mod-log kanalı ayarlandı!\nMod-log kanalı: ${channel}`)
    .setColor("BLUE")
    .setTimestamp()
    return message.channel.send({embeds : [embed]}).catch(e => {})

} else {

if(args[0] === "sıfırla"){
const data = await db.get(`modlog_${message.guild.id}`)
if(!data) return message.reply({ content: `Mod-log kanalı zaten ayarlanmamış!` }).catch(e => {})

    await db.delete(`modlog_${message.guild.id}`)
    const embed = new Discord.MessageEmbed()
    .setTitle("Mod-log Kanalı Sıfırlandı")
    .setDescription(`Mod-log kanalı sıfırlandı!`)
    .setColor("BLUE")
    .setTimestamp()
    return message.channel.send({embeds : [embed]}).catch(e => {})

} else {
    return message.reply({ content: `Mod-log kanalı ayarlamak için \`${prefix}mod-log ayarla #kanal\` veya \`${prefix}mod-log sıfırla\`` }).catch(e => {})
}}

}
exports.conf = {
    aliases: []
}
exports.help = {
    name: "mod-log",
    description: "Mod-log kanalını ayarlar.",
    usage: "mod-log <#kanal>",
    category: "moderasyon"
}
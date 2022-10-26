const Discord = require('discord.js')
const {JsonDatabase} = require("wio.db");
const db = new JsonDatabase({databasePath:"./croxydb/wiodb.json"});
const ms = require("ms")
exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;

const data = await db.get(`notlar.${message.author.id}`)
if(data){
    let datey = data.date+data.time
    return message.channel.send({ content: `${message.author} <t:${Math.floor(data.date/1000)}:F> Tarihinde **${data.note}** sebebiyle zaten bir not almışsın! Sana hatırlatılacağı tarih: <t:${Math.floor(datey/1000)}:F>`}).catch(e => {})
}
let member = message.member 
let time = args[0]
if(!time) return message.channel.send(`:x: | Bir Süre Belirtmen Gerekli!\nDoğru Kullanım: \`${prefix}hatırlat 1m doğum günüm :)\``).catch(e => {})


time = ms(time) / 1000
const slowmodeError3 = new Discord.MessageEmbed()
.setDescription(`Lütfen Geçerli Bir Zaman Yaz!\n\nZaman Kavramları - h(saat), m(dakika), s(saniye)\n(Örnek -  ${prefix}hatırlat 1m doğum günüm :)`)
.setColor('RED')
if (isNaN(time)) {
return message.channel.send({embeds: [slowmodeError3]}).catch(e => {})
}

const reason = args.slice(1).join(" ") 
if(!reason) return message.channel.send(`:x: | Bir Not Belirtmen Gerekli!\nDoğru Kullanım: \`${prefix}hatırlat 1m doğum günüm :)\``).catch(e => {})

await db.set(`notlar.${member.id}`, {
date: Date.now(),
time: time*1000,
user: member.id,
guild: message.guild.id,
channel: message.channel.id,
note: reason
})

const embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('Not Kayıt Edildi!')
.setDescription(`**${time} Saniye** Sonra **${reason}** Notu Sana DM Yolu ile Hatırlatılacak! Eğer DM Kutun Kapalı Olur İse Not Sana Hatırlatılamaz!`)
.setFooter({ text: `${message.author.tag} Tarafından İşlem Yapıldı!` })
.setTimestamp()
message.channel.send({embeds: [embed]}).catch(e => {})


}
exports.conf = {
    aliases: []
}
exports.help = {
    name: 'hatırlat',
    description: 'Bir Hatrılatma Notu Oluşturur.',
    usage: 'hatırlat <süre> <not>',
    category: 'kullanıcı'
}
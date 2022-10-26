const Discord = require("discord.js");
const db = require("orio.db")
exports.run = async (client, message, args) => {
if(!message.member.permissions.has("MANAGE_GUİLD" && "MANAGE_ROLES")) return message.reply("> **❌ Bu Komutu Kullana Bilmek İçin \`Sunucuyu Yönet\` ve \`Rolleri Yönet\` Yetkilerine Sahip Olman Gerekli!**").catch(e => {})
if(db.get("reactions")){
if(args[0]){
let data = Object.entries(db.get("reactions."+message.guild.id)).filter(mr => mr[1].message == args[0]).map(me => me[1].message)
if(data){
await db.unpush("reactions."+message.guild.id,{message: args[0]})
if(db.get("reactions")){
if(Object.keys(db.get("reactions")).length == 0){
  await db.delete("reactions")
}}
return message.reply("> **✅ Belirtilen Mesajdaki Emojilere Tıklayınca Artık Kimseye Rol Verilmeyecek veya Alınmayacak!**").catch(e => {})
} else {
return message.reply("> **❌ Belirtilen Mesaj ID'si Zaten Sistemde Yok!**").catch(e => {})
}} else {
return message.reply("> **❌ Bir Mesaj ID'si Yazman Gerekli!**\n> **Örnek: `"+client.prefix+"emoji-rol-sil <mesaj-id>`**").catch(e => {})
}} else {
return message.reply("> **❌ Zaten Hiç Emoji Rol Verisi Ayarlanmamış!**").catch(e => {})
}
};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "emoji-rol-sil",
  description: "Emoji Rol Verilerini Siler",
  usage: "emoji-rol-sil <mesaj-id>",
  category: "emojirol"
};

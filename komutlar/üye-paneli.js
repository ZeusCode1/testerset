const { Permissions } = require('discord.js')
const db = require("croxydb")

exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`).catch(e => {})

if(args[0] === "ayarla"){
const data = db.get(`üyepanel_${message.guild.id}`)
if(data){
return message.channel.send(`:x: | Üye Paneli Zaten Ayarlanmış!`).catch(e => {})
}
let GUILD_MEMBERS = await message.guild.members.fetch({ withPresences: true })
var o = {
  online: await GUILD_MEMBERS.filter((online) => online.presence?.status === "online").size,
  idle: await GUILD_MEMBERS.filter((online) => online.presence?.status === "idle").size,
  dnd: await GUILD_MEMBERS.filter((online) => online.presence?.status === "dnd").size
}
let onlinecs = o.online + o.idle + o.dnd
message.guild.channels.create("SERVER PANEL", { type: "GUILD_CATEGORY" }).then(async cs => {
await message.guild.channels.create("Toplam Üye • "+message.guild.members.cache.size, {
        type: 'GUILD_VOICE',
        parent: cs,
        permissionOverwrites: [{
        id: message.guild.id,
        deny: [Permissions.FLAGS.CONNECT]
        }]
    }).catch(e => {})
await message.guild.channels.create("Aktif Üye • "+ onlinecs, {
        type: 'GUILD_VOICE',
        parent: cs,
        permissionOverwrites: [{
        id: message.guild.id,
        deny: [Permissions.FLAGS.CONNECT]
        }]
    }).catch(e => {})
await message.guild.channels.create("Rekor Aktiflik • "+onlinecs, {
        type: 'GUILD_VOICE',
        parent: cs,
        permissionOverwrites: [{
        id: message.guild.id,
        deny: [Permissions.FLAGS.CONNECT]
        }]
    }).catch(e => {})
}).catch(e => {})
await db.set('üyepanel_'+message.guild.id, "Online") 
message.channel.send(`:white_check_mark: | ** Üye Paneli Sunucunuza Ayarlandı!\nLütfen Asla Sesli Kanal İsimleriye Oynamayın!\nVeriler Sunucunuza Birisi Katılınca veya Ayrılınca Otomatik Güncellenir.**`).catch(e => {})
 
} else {
  
if(args[0] === "sıfırla"){
const data = db.get(`üyepanel_${message.guild.id}`)
if(!data){
return message.channel.send(`:x: | Üye Paneli Zaten Ayarlı Değil!`).catch(e => {})
}

await message.guild.channels.cache.find(x =>(x.name).startsWith("Toplam Üye •")).delete().catch(e => {})
await message.guild.channels.cache.find(x =>(x.name).startsWith("Aktif Üye •")).delete().catch(e => {})
await message.guild.channels.cache.find(x =>(x.name).startsWith("Rekor Aktiflik •")).delete().catch(e => {})
await message.guild.channels.cache.find(x =>(x.name).startsWith("SERVER PANEL")).delete().catch(e => {})
await db.delete('üyepanel_'+message.guild.id)
message.channel.send(`:white_check_mark: | ** Üye Paneli Sıfırlandı! **`).catch(e => {})
  
} else {
   return message.reply("`"+prefix+"üye-panel ayarla` veya `"+prefix+"üye-panel sıfırla` Yazmalısın!").catch(e => {})
}}}    

exports.conf = {
    aliases: []
}

exports.help = {
    name: 'üye-panel',
    description: 'Sunucuya Üye Paneli Ekler.',
    usage: 'üye-panel ayarla',
    category: "moderasyon"
}
    
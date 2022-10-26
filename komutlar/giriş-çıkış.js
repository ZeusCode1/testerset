const Discord = require('discord.js')
const db = require("croxydb")

exports.run = async (client, message, args) => {
const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`).catch(e => {})

if(args[0] === "giriş-metni") {   
    let metin = args.slice(1).join(" ")
    if(!metin) return message.reply(`Bir metin girmelisin!\nÖrnek: \`${prefix}giriş-çıkış giriş-metni Sunucumuza {kullanıcı} hoşgeldin, burası {sunucu} sunucusu, şaunda sunucumuz {kişisayısı} kişi.\``).catch(e => {})

    db.set(`rgirismetin_${message.guild.id}`, metin)
return message.reply(`Giriş Metni Başarıyla Değiştirildi!`).catch(e => {})
} else {
    if(args[0] === "çıkış-metni") {   
        let metin = args.slice(1).join(" ")
        if(!metin) return message.reply(`Bir metin girmelisin!\nÖrnek: \`${prefix}giriş-çıkış çıkış-metni Sunucumuzdan {kullanıcı} ayrıldı, burası {sunucu} sunucusu, şaunda sunucumuz {kişisayısı} kişi.\``).catch(e => {})
    
        db.set(`rcikismetin_${message.guild.id}`, metin)
    return message.reply(`Çıkış Metni Başarıyla Değiştirildi!`).catch(e => {})
    } else {

  if(args[0] === "ayarla"){
    const data = db.get(`rgiris_${message.guild.id}`)
    if(data){
    return message.channel.send(`:x: | Resimli Giriş Çıkış Sistemi Zaten Ayarlı!`).catch(e => {})
    }
    
  let channel = message.mentions.channels.first()
    if (!channel) {
        message.channel.send(':x: | Kullanım: `'+prefix+'resimli-giriş ayarla #kanal`').catch(e => {})
    }
    
await db.set('rgiris_'+message.guild.id, channel.id) 
message.channel.send(`:white_check_mark: | ** Resimli Giriş-Çıkış Kanalı ${channel} Olarak Ayarlandı!**`).catch(e => {})
 
} else {
  
if(args[0] === "sıfırla"){
    const data = db.get(`rgiris_${message.guild.id}`)
if(!data){
return message.channel.send(`:x: | Resimli Giriş Çıkış Sistemi Zaten Ayarlı Değil!`).catch(e => {})
}

message.channel.send('RESİMLİ GIRIS-ÇIKIŞ KANALI SIFIRLANDI!').catch(e => {})
await db.delete('rgiris_'+message.guild.id)
  
} else {
   return message.reply("`"+prefix+"giriş-çıkış ayarla #kanal` veya `"+prefix+"giriş-çıkış sıfırla` veya `"+prefix+"giriş-çıkış giriş-metni` veya `"+prefix+"giriş-çıkış çıkış-metni` Yazmalısın!").catch(e => {})
}}}}}

exports.conf = {
    aliases: []
}

exports.help = {
    name: 'giriş-çıkış',
    description: 'Giriş Çıkış Sistemi Ayarlarınızı Yapar.',
    usage: 'giriş-çıkış ayarla #kanal',
    category: "moderasyon"
}
    
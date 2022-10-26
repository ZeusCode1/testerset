const { MessageButton, MessageEmbed, MessageActionRow } = require('discord.js');
const db = require("orio.db");

exports.run = async (client, message, args) => {
    const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`).catch(e => {})

if(args[0] === "kaldır") {
let message1 = args.slice(1).join(" ")
if(!message1) return message.reply(`Silinecek Oto Cevapı Belirt. Oto Cevaplara Bakmak İçin \`${prefix}oto-cevap liste\` Yazınız!`)
let autoreply = db.get(`otocevap.${message.guild.id}`)
if(!autoreply) return message.reply(`Sistemde Hiç Oto Cevap Bulunamadı!`)
if(autoreply.filter(cs => cs.message.includes(message1)).length === 0) return message.reply(`Sistemde **${message1}** İle Başlayan Oto Cevap Bulunamadı!`)
await db.unpush(`otocevap.${message.guild.id}`, { message: message1 })
message.reply(`**${message1}** İle Başlayan Oto Cevap Sistemden Başarıyla Kaldırıldı!`)
} else {

  if(args[0] === "kaldır-tümü") {
    let autoreply = db.get(`otocevap.${message.guild.id}`)
    if(!autoreply) return message.reply(`Sistemde Hiç Oto Cevap Bulunamadı!`)
    await db.delete(`otocevap.${message.guild.id}`)
    message.reply(`Tüm Oto Cevaplar Sistemden Başarıyla Kaldırıldı!`)
    } else {


if(args[0] === "liste") {
let autoreply = await db.get(`otocevap.${message.guild.id}`)
if(!autoreply) return message.reply(`Sistemde Hiç Oto Cevap Bulunamadı!`)

const backId = "emojiBack"
const forwardId = "emojiForward"
const backButton = new MessageButton({
style: "SECONDARY",
emoji: "⬅️",
customId: backId
});

const forwardButton = new MessageButton({
style: "SECONDARY",
emoji: "➡️",
customId: forwardId
});

const emoji = [...autoreply.values()]
let kaçtane = 6
let page = 1
let a = emoji.length / kaçtane
let b = `${a +1}`
let toplam = b.charAt(0)

const generateEmbed = async (start) => {
    
let sayı = page === 1 ? 1: page * kaçtane - kaçtane + 1
const current = await emoji.slice(start, start + kaçtane)
 return new MessageEmbed()
.setFooter({text: `Sayfa ${page} / ${toplam}` })
.setDescription(`Otomatik bir cevabı silmek için \`${prefix}oto-cevap kaldır <oto-cevap>\` yazabilirsiniz.`) 
.setThumbnail(client.user.displayAvatarURL({dynmaic: true}))
.addFields(await Promise.all(current.map(async (data) => ({
name: `\`${sayı++}\` ↷`,
value: `**Mesaj: \`${data.message}\`\nYanıt: \`${data.reply}\`\nEkleyen: <@${data.author}>\nEklenme Tarihi: <t:` + Math.floor(data.time / 1000) + `:F>**`,
inline: true
}))))
.setColor("BLUE")
}

    const canFitOnOnePage = emoji.length <= kaçtane
    const embedMessage = await message.channel.send({
      embeds: [await generateEmbed(0)],
      components: canFitOnOnePage
        ? []
        : [new MessageActionRow({ components: [forwardButton] })],
    }).catch(e => { });

    if (canFitOnOnePage) return

    const collector = embedMessage.createMessageComponentCollector({
      filter: ({ user }) => user.id === message.author.id,
    });

 
    let currentIndex = 0
    collector.on("collect", async (interaction) => {
      if(interaction.customId === backId) {
          page--
      }
      if(interaction.customId === forwardId) {
          page++
      }

      interaction.customId === backId
        ? (currentIndex -= kaçtane)
        : (currentIndex += kaçtane)

      await interaction.update({
        embeds: [await generateEmbed(currentIndex)],
        components: [
          new MessageActionRow({
            components: [
              ...(currentIndex ? [backButton] : []),
              ...(currentIndex + kaçtane < emoji.length ? [forwardButton] : []),
            ],
          }),
        ],
      }).catch(e => { })
    })

} else {

let cevaplar = []
let num = 0;
let sorular = [
    "1. Soru",
    "2. Soru"
    ]
await message.reply(`Hangi Mesaj Yazılınca Bot Kullanıcıya Cevap Verecek Lütfen Yaz, 30 Saniyen Var!`).catch(e => {})


const filter = m => {
return message.content.includes(message.content) && m.author.id === message.author.id;
} 
const collector = message.channel.createMessageCollector({ filter, time: 60000});
  
collector.on('collect', async (msg) => {
if(sorular[num]){
let autoreply = db.get(`otocevap.${message.guild.id}`)
if(autoreply){
if(autoreply.filter(cs => cs.message.includes(msg.content))){
  collector.stop("success")
  return message.reply(`Sistemde **${msg.content}** İle Başlayan Bir Oto Cevap Zaten Var!`)
}
}
cevaplar.push(msg.content)
let sorular2 = [
    "Kullanıcılar Ne Yazdığında Bot Otomatik Cevap Verecek?",
    `\`${cevaplar[0]}\` Yazıldığında Bot Ne Cevap Verecek?`
    ]
num = num+1
await message.channel.send(sorular2[num] ? "<@"+message.author.id+">, "+sorular2[num] : `**<@${message.author.id}> Oto Cevap Sisteme Kaydedildi!\nYazılacak: \`${cevaplar[0]}\` | Yanıt: \`${cevaplar[1]}\`**`).catch(e => {})
if(sorular.length === num){
collector.stop("success")
await db.push(`otocevap.${message.guild.id}`, {
    message: cevaplar[0],
    reply: cevaplar[1],
    author: message.author.id,
    time: Date.now()
})
}}})

collector.on('end', async (collected, reason) => {
if(reason === "time"){
await message.channel.send(`<@${message.author.id}> **Oto Cevap Komutu Yanıt Vermediğiniz İçin İptal Edildi. Yeni Bir Otomatik Cevap Eklemek İçin Komutu Tekrar Kullanın!**`).catch(e => {})
}
})

    
}}}
}
exports.conf = {
    aliases: []
}

exports.help = {
    name: 'oto-cevap',
    description: 'Otomatik Cevap Sistemi',
    usage: 'oto-cevap',
    category: "moderasyon"
}
    
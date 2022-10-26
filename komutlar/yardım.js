const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports.run = async (client, message, args) => {
  const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;

let buton = new MessageButton()
.setStyle("PRIMARY")
.setLabel("Moderasyon")
.setEmoji("🛠️")
.setCustomId("moderasyon")

let buton1 = new MessageButton()
.setStyle("SUCCESS")
.setLabel("Kullanıcı")
.setEmoji("💎")
.setCustomId("kullanıcı")

let buton2 = new MessageButton()
.setStyle("SECONDARY")
.setLabel("Bot")
.setEmoji("⚙️")
.setCustomId("bot")

let buton4 = new MessageButton()
.setStyle("SUCCESS")
.setLabel("Koruma")
.setEmoji("⚔️")
.setCustomId("koruma")

let buton5 = new MessageButton()
.setStyle("DANGER")
.setLabel("Özel")
.setEmoji("🤩")
.setCustomId("özel")


let embed = new MessageEmbed()
.setAuthor({ name: `${client.user.username} Yardım Menüsü`, iconURL: client.user.displayAvatarURL() })
.setDescription(`> Botun komutları hakkında bilgi almak için istediğiniz seçeneğin butonuna tıklayın!`)
.setColor("BLUE")

message.channel.send({embeds: [embed], components: [new MessageActionRow({ components: [buton, buton1, buton2, buton4, buton5, ]})]}).then(async msg => {

const filter = x => x.user.id === message.author.id
let collector = msg.createMessageComponentCollector({ filter, time: 300000 })

collector.on("collect", async button => {
if(button.customId === "moderasyon") {

let moderasyon = new MessageEmbed()
.setAuthor({ name: `${client.user.username} Moderasyon Komutları`, iconURL: client.user.displayAvatarURL() })
.setTitle(`> Botun moderasyon komutları hakkında bilgi alırsınız!`)
.setDescription(`Komutlar ↷\n${client.commands.filter(mr => mr.help.category === "moderasyon").map(cmd => `> **\`${prefix}${cmd.help.name}\`: \`${cmd.help.description}\`**`).join("\n")}`)
.setColor("BLUE")
msg.edit({content: "🛠️ Moderasyon Komutları", embeds: [moderasyon], components: [new MessageActionRow({ components: [buton1, buton2, buton4, buton5, ]})]}).catch(e => {})

}

if(button.customId === "kullanıcı") {

let kullanıcı = new MessageEmbed()
.setAuthor({ name: `${client.user.username} Kullanıcı Komutlar`, iconURL: client.user.displayAvatarURL() })
.setTitle(`> Botun kullanıcı komutları hakkında bilgi alırsınız!`)
.setDescription(`Komutlar ↷\n${client.commands.filter(mr => mr.help.category === "kullanıcı").map(cmd => `> **\`${prefix}${cmd.help.name}\`: \`${cmd.help.description}\`**`).join("\n")}`)
.setColor("BLUE")

msg.edit({content: "💎 Kullanıcı Komutları", embeds: [kullanıcı], components: [new MessageActionRow({ components: [buton, buton2, buton4, buton5, ]})]}).catch(e => {})

}

if(button.customId === "bot") {

let bot = new MessageEmbed()
.setAuthor({ name: `${client.user.username} Bot Komutları`, iconURL: client.user.displayAvatarURL() })
.setTitle(`> Botun kendi özel komutları hakkında bilgi alırsınız!`)
.setDescription(`Komutlar ↷\n${client.commands.filter(mr => mr.help.category === "bot").map(cmd => `> **\`${prefix}${cmd.help.name}\`: \`${cmd.help.description}\`**`).join("\n")}`)
.setColor("BLUE")

msg.edit({content: "⚙️ Bot Komutları", embeds: [bot], components: [new MessageActionRow({ components: [buton, buton1, buton4, buton5, ]})]}).catch(e => {})

}

if(button.customId === "koruma") {

  let bot = new MessageEmbed()
  .setAuthor({ name: `${client.user.username} Sunucu Koruma Komutları`, iconURL: client.user.displayAvatarURL() })
  .setTitle(`> Botun sunucu koruma komutları hakkında bilgi alırsınız!`)
  .setDescription(`Komutlar ↷\n${client.commands.filter(mr => mr.help.category === "koruma").map(cmd => `> **\`${prefix}${cmd.help.name}\`: \`${cmd.help.description}\`**`).join("\n")}`)
  .setColor("BLUE")
  
  msg.edit({content: "⚔️ Koruma Komutları", embeds: [bot], components: [new MessageActionRow({ components: [buton, buton1, buton2, buton5, ]})]}).catch(e => {})
  
  }

  if(button.customId === "özel") {

    let bot = new MessageEmbed()
    .setAuthor({ name: `${client.user.username} Emoji Rol, Çekiliş ve Seviye Komutları`, iconURL: client.user.displayAvatarURL() })
    .setTitle(`> Botun Seviye, Çekiliş ve Emoji Rol komutları hakkında bilgi alırsınız!`)
    .addField("Seviye Komutları ↷",`${client.commands.filter(mr => mr.help.category === "seviye").map(cmd => `> **\`${prefix}${cmd.help.name}\`: \`${cmd.help.description}\`**`).join("\n")}`)
    .addField("İnvite Komutları ↷",`${client.commands.filter(mr => mr.help.category === "invite").map(cmd => `> **\`${prefix}${cmd.help.name}\`: \`${cmd.help.description}\`**`).join("\n")}`)
    .setDescription(`**Emoji Rol Komutları** ↷\n${client.commands.filter(mr => mr.help.category === "emojirol").map(cmd => `> **\`${prefix}${cmd.help.name}\`: \`${cmd.help.description}\`**`).join("\n")}`)
 .addField("Çekiliş Komutları ↷ (Slash Komutları)",`${client.commandss.map(cmd => `> **\`/${cmd.name}\`: \`${cmd.description}\`**`).join("\n")}`)
 .setColor("BLUE")
    
    msg.edit({content: "🤩 Emojirol, Çekiliş ve Seviye Komutları", embeds: [bot], components: [new MessageActionRow({ components: [buton, buton1, buton2, buton4, ]})]}).catch(e => {})
    
    }

button.deferUpdate();
})

collector.on("end", async button => {
if(msg){
  if(msg.channel){
msg.channel.send("Yardım komutu için süren doldu.").catch(e => {})
  }
msg.delete().catch(e => {})
}
        })
    }).catch(e => {})
};
module.exports.conf = {
  aliases: []
};
module.exports.help = {
  name: "yardım"
};
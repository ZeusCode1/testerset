const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const {JsonDatabase} = require("wio.db");
const db = new JsonDatabase({databasePath:"./croxydb/wiodb.json"});

exports.run = async (client, message, args) => {
    const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;

  if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`**Buna Yetkin Yok!**`);

  if (!["kapat", "aç"].includes(args[0])) {
    return message.channel.send({ embeds: [
      new MessageEmbed()
        .setColor("RED")
        .setTitle(`${client.user.username} Destek Sistemi`)
        .setDescription(
          `**\`${prefix}destek aç @YETKİLİ_ROL #KANAL\` veya \`${prefix}destek kapat\`**`
        )
        .setFooter({ text: 
          `Komutu Kullanan: ${message.author.tag}`,
          iconURL: message.author.avatarURL()
        })
    ]}).catch(() => {})
  }

  if (args[0] == "kapat") {
    if (!db.get("csticket." + message.guild.id))
      return message.reply(
        "**Destek Sistemi Bu Sunucuda Zaten Kurulu Değil!**"
      ).catch(() => {})
    const data = db.get("csticket." + message.guild.id);
    db.delete(`csticket.${message.guild.id}`);
    const sunucu = client.guilds.cache.get(data.sunucuID);
    if (!sunucu) {
      db.delete("csticket." + data.sunucuID);
    } else {
      const kanal = sunucu.channels.cache.get(data.kanal);
      if (!kanal) {
        db.delete("csticket." + data.sunucuID);
      } else {
        const data2 = kanal.messages.fetch(data.mesajID);
        if (!data2) {
          db.delete("csticket." + data.sunucuID);
        } else {
          db.delete("csticket." + data.sunucuID);
          data2.then((mr) => mr.delete({ timeout: 200 }).catch(() => {})).catch((e) => {});
          let a = message.guild.channels.cache.find((xxx) => xxx.name === "DESTEK")
          if (a) {
            message.guild.channels.cache.filter(cs => cs.parentID === a.id).map(cs => cs.delete().catch(() => {}))
            setTimeout(() => {
            a.delete().catch(() => {})
            }, 10000)
          }
          message.channel.send(`**Destek Sistemi Başarıyla Kapatılıyor, Destek Kanalları Var İse 10 Saniye İçinde Silinecektir!**`);
        }
      }
    }
  }

  if (args[0] == "aç") {
    const data = db.get("csticket." + message.guild.id);
    if (data)
      return message.reply(
        "Zaten Destek Sistemi Bu Sunucuda Açık!\nKapatmak İçin `" +
          prefix +
          "destek kapat`"
      ).catch(() => {})

    let role = message.mentions.roles.first();
    if (!role)
      return message.reply("**Bir Destek Ekibi Rolü Etiketlemen Gerek!**").catch(() => {})

    let akanal = message.mentions.channels.first();
    if (!akanal) return message.reply("**Bir Kanal Etiketlemen Gerek!**").catch(() => {})

    message.react("✅");



      const row = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId('dcsticket')
            .setLabel('Talep Aç')
            .setEmoji("📨")
            .setStyle('PRIMARY'));

 const embed = new MessageEmbed()
          .setTitle(client.user.username + " Ticket Bot")
          .setColor("BLUE")
          .setDescription("Destek Talebi Oluşturmak İçin 📨 Emojisine Tıkla!")
          .setTimestamp()
          await akanal.send({ embeds: [embed], components: [row] }).then(async (cs) => {
        db.set("csticket." + message.guild.id, {
          kanal: akanal.id,
          mesajID: cs.id,
          sunucuID: message.guild.id,
          rolID: role.id,
        });
      }).catch(() => {})
  }
};
exports.conf = {
  aliases: ["ticket", "ticket-sistemi"],
};

exports.help = {
  name: "destek",
  description: "Destek Sistemi",
  usage: "destek aç @ROL #KANAL",
  category: "moderasyon"
};

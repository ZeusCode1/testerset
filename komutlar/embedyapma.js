const {
    MessageButton,
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow,
    Permissions,
  } = require("discord.js");
  
  module.exports.run = async (bot, message, args) => {
    let mesaj = args.slice(0).join(" ");
  
    if (!mesaj)
      return message
        .reply({
          content: `> :x: **Başarısız!** Lütfen birm mesaj belirtin.`,
          allowedMentions: { repliedUser: false },
        })
        .catch((e) => {});
    
    if (mesaj.length >= 2000)
      return message
        .reply({
          content: `> :x: **Başarısız!** Mesajınız **2000 karakter**den büyük olamaz.`,
          allowedMentions: { repliedUser: false },
        })
        .catch((e) => {});
    
    let embed = new MessageEmbed()
      .setDescription(mesaj)
      .setColor("RANDOM")
    
    message.channel.send({ embeds: [embed] })
  };
  exports.conf = {
    aliases: ['embed', 'embedyaz']
  };

  exports.help = {
    name: "embed",
      description: "Belirttiğiniz mesajı embed olarak atar.",
      usage: "embed",
      category: "kullanıcı"
  }
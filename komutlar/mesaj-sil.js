const Discord = require('discord.js');

exports.run = async(client, message, args) => {
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply({content: "Yetersiz yetki! gereken => **MESAJLARI YÖNET**" }).catch(e => {})

  const sayi = args[0]

  if (!sayi) {
    return message.reply({content: "En Az `1 - 100` Arasında Bir Tam Sayı Değeri Girmelisiniz." }).catch(e => {})
  }

  if(isNaN(sayi)) return message.reply({content: "Bir Sayı Değeri Girmelisiniz." }).catch(e => {})
  if (sayi > 101) return message.reply({content: "En Az `1 - 100` Arasında Bir Tam Sayı Değeri Girmelisiniz." }).catch(e => {})


  await message.channel.messages.fetch({limit: sayi}).then(messages => {
    message.channel.bulkDelete(messages).catch(e => {})
});
  
setTimeout(() => {
    message.channel.send({content: `<@${message.author.id}> ${sayi} Adet Mesaj Başarı İle Uzaya Fırlatıldı. :rocket:`}).then(cs => {
      setTimeout(() => {
      cs.delete().catch(e => {})
      }, 5000)
    }).catch(e => {})
  }, 2000)
};

exports.conf = {
  aliases: ["sil","temizle"]
};

exports.help = {
  name: 'mesaj-sil',
  description: 'Belirlenen Mesaj Sayısını Siler.',
  usage: 'mesaj-sil <sayı>',
  category: "moderasyon"
};
const Discord = require("discord.js");
exports.run = async function(client, message, args) {
    if(!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("Bu komutu kullanabilmek için `Mesajları Yönet` yetkisine sahip olmalısın!").catch(e => {});
    

    let messagecount = parseInt(args.join(" "));
    if (!messagecount)
      return message.reply("Kaç mesaj silmek istiyorsun?").catch(e => {});
    message.channel.messages
      .fetch({
        limit: messagecount+1
      })
      .then(messages => message.channel.bulkDelete(messages))
      .catch(err => {
        return message.reply("Bu mesajlar 14 günden önce gönderilmiş olabilir. Silemiyorum...").catch(e => {});
      });

    const sohbetsilindi = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setTimestamp()
      .addField("Eylem:", "Sohbet Silme")
      .addField("Yapan:", "`" + message.author.tag + "`")
      .addField("Sonuç:", `Başarılı`);
    return message.reply({embeds: [sohbetsilindi]}).catch(e => {});
  
};
exports.conf = {
  aliases: []
};
exports.help = {
  name: "sil",
  description: "Belirlenen miktar mesajı siler.",
  usage: "sil <miktar>",
  category: "moderasyon"
};
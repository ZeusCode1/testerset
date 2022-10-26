const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_CHANNELS")){
    const ban = new Discord.MessageEmbed()
    .setTitle("Hata!")
    .setColor("RED")
    .setDescription(`Bu komudu kullanabilmek için **KANALLARI YÖNET** yetkisine sahip olmalısın!`)
    .setFooter("Klares")
    .setTimestamp()
    
    
    return message.reply({embeds:[ban]})
  }



  let every = message.guild.roles.cache.find(r => r.name === "@everyone");
  message.channel.permissionOverwrites.create(every, {
    SEND_MESSAGES: null
  });

  const yazı = new Discord.MessageEmbed()
   .setTitle("Başarılı!")
   .setColor('RED')
   .setTimestamp()
   .setDescription('**Sohbet kanalına artık üyeler yazamaz!**')
   .setFooter({ text: client.user.username, iconURL: client.user.avatarURL()})
   .setTimestamp()

   message.channel.send({embeds:[yazı]});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["s-kapat"],
  permLevel: 0
};

exports.help = {
  name: 'sohbet-kapat',
  description: 'Herkese açık kanalı sadece yetkiliye özel yapar.',
  usage: '.sohbet-kapat',
  category: 'moderasyon'
};

const Discord = require('discord.js')
exports.run = async (client, message, args, bot) => {
let user = message.mentions.users.first()
if (!user) return message.reply("Sarılıcağın Kişiyi Belirtmelisin!")
if (user.bot) return message.reply("Bota Sarılamazsın :confounded:")
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`**<@${message.author.id}> Adlı Kişi <@${user.id}> Adlı Kişye Sarıldı** :heart:`)
.setImage("https://media.discordapp.net/attachments/736197586565857733/737570157588774964/sarl.gif")
message.channel.send({embeds: [embed]}).catch(e => {})
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sar'],
    permLevel: 0
  };

  exports.help = {
    name: 'sarıl',
    description: 'Belirttiğiniz kişiye sarılırsınız.',
  usage: 'sarıl',
  category: 'kullanıcı'
  };
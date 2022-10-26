const Discord = require("discord.js");
const ms = require(`ms`)
exports.run = async (client, message, args) => {

if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: "Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!"}).catch(e => {})


const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!member) return message.reply({ content: "Kimi susturmak istiyor isen onu etiketlemelisin veya kullanıcı hesap id yazmalısın!"}).catch(e => {})

let time = args[1]
if(!time) return message.reply({ content: "Susturulacak kişinin susturulma süresini yazmalısın!"}).catch(e => {})
time = ms(time)

const reason = args.slice(2).join(' ');
if(!reason) return message.reply({ content: "Susturulacak kişinin susturulma sebebi yazmalısın!"}).catch(e => {})

await member.timeout(time, reason).then(async mss => {
    return message.reply({content: `${member} isimli kullanıcı **${ms(time, {long: true})}** süresi boyunca susturuldu.`}).catch(e => {})
}).catch(async e => { 
    if(e.code === 50007) return message.reply({ content: "Bu kişi zaten susturulmuş!"}).catch(e => {})
    if(e.code === 50013) return message.reply({ content: "Bu kişiyi susturmaya yetkim yetmiyor."}).catch(e => {})
})


}

exports.conf = {
    aliases: []
  };
  
  exports.help = {
    name: "sustur",
    description: "Kullanıcıyı susturur.",
    usage: "sustur <@kullanıcı> <süre> <sebep>",
    category: "moderasyon"
  };
  
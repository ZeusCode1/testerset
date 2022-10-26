const Discord = require('discord.js');
const weather = require('weather-js');

exports.run = (client, message, args) => {
  
  weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
      if (result === undefined || result.length === 0) {
          message.channel.send({content: 'Belirttiğin şehiri bulamadım..'})
          return
      }
    
      var current = result[0].current
      var location = result[0].location
      
      const embed = new Discord.MessageEmbed()
          .setTitle(`${current.observationpoint} Hava Durumu`)
          .setDescription(`**${current.skytext}**`)
          .setThumbnail(current.imageUrl)
          .setColor("RED")
          .addField('⏳ Zaman Dilimi: ',`UTC${location.timezone}`, true)
          .addField('🎰 Derece Tipi: ',location.degreetype, true)
          .addField('🌞 Sıcaklık: ',`${current.temperature} Derece`, true)
          .addField('🌅 Hissedilen Sıcaklık: ', `${current.feelslike} Derece`, true)
          .addField('🌈 Rüzgar Oranı: ',current.winddisplay, true)
          .addField('🌁 Nem Oranı: ', `${current.humidity}%`, true)
          .setFooter({ text: '❤️', iconURL: message.author.avatarURL({ dynamic: true }) });
          message.channel.send({embeds: [embed]})
  })
}

exports.conf = {
 aliases: ["storm","hava","walse"]
}

exports.help = {
  name:"havadurumu",
  description: "Belirttiğiniz şehrin hava durumunu atar.",
  usage: "havadurumu",
  category: "kullanıcı",
}
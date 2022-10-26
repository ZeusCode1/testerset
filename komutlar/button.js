const categorylist = require("fs").readdirSync("./komutlar/").filter(s => s !== "private");
  for (const category of categorylist) {
const Discord = require('discord.js');
const {MessageButton} = require("discord.js")

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

exports.run = async (client, message, args) => {

  const buttonDelete = new MessageButton().setStyle('red').setLabel('Clear').setCustomId('buttonDelete')

  // // // // //

  let embed = new Discord.MessageEmbed()
  .setColor('#000001')
  .setTitle('Sayfa 1')
  .addField(`Komutlar`, `Botun Test Komutu`)
  .setDescription(`Sayfa 1`)
  message.channel.send({embeds: [embed]}, {buttons: [new MessageButton().setStyle('green').setLabel('1').setCustomId('1'), new MessageButton().setStyle('blurple').setLabel('2').setCustomId('2'), new MessageButton().setStyle('blurple').setLabel('3').setCustomId('3'), buttonDelete]}).then(async function(helpMessage) {

    helpMessage.createMessageComponentCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {

      if (button.customId == 'buttonDelete') {

        message.delete().then(helpMessage.delete())

        button.reply.defer()

      } else if (button.customId == '1') {

        embed.setTitle('Sayfa 1')
        embed.setDescription(`Sayfa 1`)
        helpMessage.edit({embeds: [embed]}, {buttons: [new MessageButton().setStyle('green').setLabel('1').setCustomId('1'), new MessageButton().setStyle('blurple').setLabel('2').setCustomId('2'), new MessageButton().setStyle('blurple').setLabel('3').setCustomId('3'), buttonDelete]})

        button.reply.defer()

      } else if (button.customId == '2') {

        embed.setTitle('Sayfa 2')
        embed.setDescription(`Sayfa 2`)
        helpMessage.edit({embeds: [embed]}, {buttons: [new MessageButton().setStyle('blurple').setLabel('1').setCustomId('1'), new MessageButton().setStyle('green').setLabel('2').setCustomId('2'), new MessageButton().setStyle('blurple').setLabel('3').setCustomId('3'), buttonDelete]})

        button.reply.defer()

      } else if (button.customId == '3') {

        embed.setTitle('Sayfa 3')
        embed.setDescription(`Sayfa 3`)
        helpMessage.edit({embeds: [embed]}, {buttons: [new MessageButton().setStyle('blurple').setLabel('1').setCustomId('1'), new MessageButton().setStyle('blurple').setLabel('2').setCustomId('2'), new MessageButton().setStyle('green').setLabel('3').setCustomId('3'), buttonDelete]})

        button.reply.defer()
      };
    });
  });
};
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
exports.conf = {"aliases": []}
exports.help = {"name":"button"}
const { MessageEmbed } = require("discord.js");
const Database = require("croxydb");

exports.run = async (client, message, args) => {
    const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
    const embed = new MessageEmbed()
        .setAuthor({ name: `${client.user.username} | Ban Limit Sistemi`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setColor("BLUE")
        .setFooter({ text: '❤️', iconURL: message.author.avatarURL({ dynamic: true }) })
        .setTimestamp()

    if (message.author.id !== message.guild.ownerId) return message.reply({ embeds: [embed.setDescription(`Yetersiz izin, sistemi sadece \`SUNUCU SAHIBI\` kullanabilir.`)] })

    const banGuardBoolean = await Database.get(`banGuardBoolean.${message.guild.id}`);
    const banGuardNumber = await Database.get(`banGuardNumber.${message.guild.id}`);
    const banGuardLogChannel = await Database.get(`banGuardLogChannel.${message.guild.id}`);

    if (!args[0]) return message.reply({ embeds: [embed.setDescription(`**Ban Limit Komutları:** \n${prefix}ban-koruma aç \n${prefix}ban-koruma kapat \n${prefix}ban-koruma limit <sayı> \n${prefix}ban-koruma limit sıfırla \n${prefix}ban-koruma log #kanal \n${prefix}ban-koruma log sıfırla`)] })

    if (args[0] === "aç") {
        if (banGuardBoolean) {
            message.reply({ embeds: [embed.setDescription(`Ban limit sistemi zaten açık durumda.`)] })
        } else {
            await Database.set(`banGuardBoolean.${message.guild.id}`, "open")
            message.reply({ embeds: [embed.setDescription(`Başarıyla ban limit sistemi açıldı.`)] })
        }
    }

    if (args[0] === "kapat") {
        if (banGuardBoolean) {
            await Database.delete(`banGuardBoolean.${message.guild.id}`)
            message.reply({ embeds: [embed.setDescription(`Başarıyla ban limit sistemi kapatıldı.`)] })
        } else {
            message.reply({ embeds: [embed.setDescription(`Ban limit sistemi zaten kapalı durumda.`)] })
        }
    }

    if (args[0] === "limit") {
        if (args[1] === "sıfırla") {
            if (banGuardNumber) {
                await Database.delete(`banGuardNumber.${message.guild.id}`);

                message.reply({ embeds: [embed.setDescription(`Başarıyla ban limit sıfırlandı.`)] })
            } else {
                message.reply({ embeds: [embed.setDescription(`Ban limiti zaten ayarlanmamış.`)] })
            }

            return;
        }

        if (banGuardNumber) {
            message.reply({ embeds: [embed.setDescription(`Silinen ban limiti zaten ayarlanmış. \n\nSıfırlamak İçin: ${prefix}ban-koruma limit sıfırla`)] })
        } else {
            if (!Number(args[1])) return message.reply({ embeds: [embed.setDescription(`Ban limitini ayarlamak için bir sayı girmelisin.`)] })
            if (Number(args[1]) < 0) return message.reply({ embeds: [embed.setDescription(`Ban limitini ayarlamak için pozitif bir sayı girmelisin.`)] })

            await Database.add(`banGuardNumber.${message.guild.id}`, Number(args[1]))

            message.reply({ embeds: [embed.setDescription(`Başarıyla ban limiti **${Number(args[1])}** olarak ayarlandı.`)] })
        }
    }

    if (args[0] === "log") {
        if (args[1] === "sıfırla") {
            if (banGuardLogChannel) {
                await Database.delete(`banGuardLogChannel.${message.guild.id}`)

                message.reply({ embeds: [embed.setDescription(`Başarıyla ban limit log kanalı sıfırlandı.`)] })
            } else {
                message.reply({ embeds: [embed.setDescription(`Silinen ban limit log kanalı zaten ayarlanmamış.`)] })
            }

            return;
        }

        if (banGuardLogChannel) {
            message.reply({ embeds: [embed.setDescription(`Ban limit log kanalı zaten ayarlanmış. \n\nSıfırlamak İçin: ${prefix}ban-koruma silinen log sıfırla`)] })
        } else {
            const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]);

            if (!channel) return message.reply({ embeds: [embed.setDescription(`Ban limit log kanalını ayarlamak için bir kanal etiketlemelisin.`)] })

            await Database.set(`banGuardLogChannel.${message.guild.id}`, channel.id)

            message.reply({ embeds: [embed.setDescription(`Başarıyla ban limit log kanalı ayarlandı. \n\nAyarlanan Kanal: ${channel ? channel : "Bulunamadı."}`)] })
        }
    }
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: 'ban-koruma',
    description: 'Ban limit sistemi açıp kapatır.',
    usage: 'ban-koruma <aç/kapat>',
    category: 'koruma'
}

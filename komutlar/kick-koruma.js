const { MessageEmbed } = require("discord.js");
const Database = require("croxydb");

exports.run = async (client, message, args) => {
    const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
    const embed = new MessageEmbed()
        .setAuthor({ name: `${client.user.username} | Kick Limit Sistemi`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setColor("BLUE")
        .setFooter({ text: '❤️', iconURL: message.author.avatarURL({ dynamic: true }) })
        .setTimestamp()

    if (message.author.id !== message.guild.ownerId) return message.reply({ embeds: [embed.setDescription(`Yetersiz izin, sistemi sadece \`SUNUCU SAHIBI\` kullanabilir.`)] })

    const kickGuardBoolean = await Database.get(`kickGuardBoolean.${message.guild.id}`);
    const kickGuardNumber = await Database.get(`kickGuardNumber.${message.guild.id}`);
    const kickGuardLogChannel = await Database.get(`kickGuardLogChannel.${message.guild.id}`);

    if (!args[0]) return message.reply({ embeds: [embed.setDescription(`**Kick Limit Komutları:** \n${prefix}kick-koruma aç \n${prefix}kick-koruma kapat \n${prefix}kick-koruma limit <sayı> \n${prefix}kick-koruma limit sıfırla \n${prefix}kick-koruma log #kanal \n${prefix}kick-koruma log sıfırla`)] })

    if (args[0] === "aç") {
        if (kickGuardBoolean) {
            message.reply({ embeds: [embed.setDescription(`Kick limit sistemi zaten açık durumda.`)] })
        } else {
            await Database.set(`kickGuardBoolean.${message.guild.id}`, "open")
            message.reply({ embeds: [embed.setDescription(`Başarıyla kick limit sistemi açıldı.`)] })
        }
    }

    if (args[0] === "kapat") {
        if (kickGuardBoolean) {
            await Database.delete(`kickGuardBoolean.${message.guild.id}`)
            message.reply({ embeds: [embed.setDescription(`Başarıyla kick limit sistemi kapatıldı.`)] })
        } else {
            message.reply({ embeds: [embed.setDescription(`Kick limit sistemi zaten kapalı durumda.`)] })
        }
    }

    if (args[0] === "limit") {
        if (args[1] === "sıfırla") {
            if (kickGuardNumber) {
                await Database.delete(`kickGuardNumber.${message.guild.id}`);

                message.reply({ embeds: [embed.setDescription(`Başarıyla kick limit sıfırlandı.`)] })
            } else {
                message.reply({ embeds: [embed.setDescription(`Kick limiti zaten ayarlanmamış.`)] })
            }

            return;
        }

        if (kickGuardNumber) {
            message.reply({ embeds: [embed.setDescription(`Silinen kick limiti zaten ayarlanmış. \n\nSıfırlamak İçin: ${prefix}kick-koruma limit sıfırla`)] })
        } else {
            if (!Number(args[1])) return message.reply({ embeds: [embed.setDescription(`Kick limitini ayarlamak için bir sayı girmelisin.`)] })
            if (Number(args[1]) < 0) return message.reply({ embeds: [embed.setDescription(`Kick limitini ayarlamak için pozitif bir sayı girmelisin.`)] })

            await Database.add(`kickGuardNumber.${message.guild.id}`, Number(args[1]))

            message.reply({ embeds: [embed.setDescription(`Başarıyla kick limiti **${Number(args[1])}** olarak ayarlandı.`)] })
        }
    }

    if (args[0] === "log") {
        if (args[1] === "sıfırla") {
            if (kickGuardLogChannel) {
                await Database.delete(`kickGuardLogChannel.${message.guild.id}`)

                message.reply({ embeds: [embed.setDescription(`Başarıyla kick limit log kanalı sıfırlandı.`)] })
            } else {
                message.reply({ embeds: [embed.setDescription(`Silinen kick limit log kanalı zaten ayarlanmamış.`)] })
            }

            return;
        }

        if (kickGuardLogChannel) {
            message.reply({ embeds: [embed.setDescription(`Kick limit log kanalı zaten ayarlanmış. \n\nSıfırlamak İçin: ${prefix}kick-koruma silinen log sıfırla`)] })
        } else {
            const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]);

            if (!channel) return message.reply({ embeds: [embed.setDescription(`Kick limit log kanalını ayarlamak için bir kanal etiketlemelisin.`)] })

            await Database.set(`kickGuardLogChannel.${message.guild.id}`, channel.id)

            message.reply({ embeds: [embed.setDescription(`Başarıyla kick limit log kanalı ayarlandı. \n\nAyarlanan Kanal: ${channel ? channel : "Bulunamadı."}`)] })
        }
    }
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: 'kick-koruma',
    description: 'Kick limit sistemi açıp kapatır.',
    usage: 'kick-koruma <aç/kapat>',
    category: "koruma"
}

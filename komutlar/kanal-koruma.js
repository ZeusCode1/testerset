const { MessageEmbed } = require("discord.js");
const Database = require("croxydb");

exports.run = async (client, message, args) => {
    const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
    const embed = new MessageEmbed()
        .setAuthor({ name: `${client.user.username} | Kanal Limit Sistemi`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setColor("BLUE")
        .setFooter({ text: '❤️', iconURL: message.author.avatarURL({ dynamic: true }) })
        .setTimestamp()

    if (message.author.id !== message.guild.ownerId) return message.reply({ embeds: [embed.setDescription(`Yetersiz izin, sistemi sadece \`SUNUCU SAHIBI\` kullanabilir.`)] })

    const channelDeleteBoolean = await Database.get(`channelDeleteBoolean.${message.guild.id}`);
    const channelDeleteNumber = await Database.get(`channelDeleteNumber.${message.guild.id}`);
    const channelDeleteLogChannel = await Database.get(`channelDeleteLogChannel.${message.guild.id}`);

    const channelCreateBoolean = await Database.get(`channelCreateBoolean.${message.guild.id}`);
    const channelCreateNumber = await Database.get(`channelCreateNumber.${message.guild.id}`);
    const channelCreateLogChannel = await Database.get(`channelCreateLogChannel.${message.guild.id}`);

    if (!args[0]) return message.reply({ embeds: [embed.setDescription(`**Silinen Kanal Limit Komutları:** \n${prefix}kanal-koruma silinen aç \n${prefix}kanal-koruma silinen kapat \n${prefix}kanal-koruma silinen limit <sayı> \n${prefix}kanal-koruma silinen limit sıfırla \n${prefix}kanal-koruma silinen log #kanal \n${prefix}kanal-koruma silinen log sıfırla \n\n**Oluşturulan Kanal Limit Komutları:** \n${prefix}kanal-koruma oluşturulan aç \n${prefix}kanal-koruma oluşturulan kapat \n${prefix}kanal-koruma oluşturulan limit <sayı> \n${prefix}kanal-koruma oluşturulan limit sıfırla \n${prefix}kanal-koruma oluşturulan log #kanal \n${prefix}kanal-koruma oluşturulan log sıfırla`)] })

    if (args[0] === "silinen") {
        if (!args[1]) return message.reply({ embeds: [embed.setDescription(`**Silinen Kanal Limit Komutları:** \n${prefix}kanal-koruma silinen aç \n${prefix}kanal-koruma silinen kapat \n${prefix}kanal-koruma silinen limit <sayı> \n${prefix}kanal-koruma silinen limit sıfırla \n${prefix}kanal-koruma silinen log #kanal \n${prefix}kanal-koruma silinen log sıfırla`)] })

        if (args[1] === "aç") {
            if (channelDeleteBoolean) {
                message.reply({ embeds: [embed.setDescription(`Silinen kanal limit sistemi zaten açık durumda.`)] })
            } else {
                await Database.set(`channelDeleteBoolean.${message.guild.id}`, "open")
                message.reply({ embeds: [embed.setDescription(`Başarıyla silinen kanal limit sistemi açıldı.`)] })
            }
        }

        if (args[1] === "kapat") {
            if (channelDeleteBoolean) {
                await Database.delete(`channelDeleteBoolean.${message.guild.id}`)
                message.reply({ embeds: [embed.setDescription(`Başarıyla silinen kanal limit sistemi kapatıldı.`)] })
            } else {
                message.reply({ embeds: [embed.setDescription(`Silinen kanal limit sistemi zaten kapalı durumda.`)] })
            }
        }

        if (args[1] === "limit") {
            if (args[2] === "sıfırla") {
                if (channelDeleteNumber) {
                    await Database.delete(`channelDeleteNumber.${message.guild.id}`);

                    message.reply({ embeds: [embed.setDescription(`Başarıyla silinen kanal limit sıfırlandı.`)] })
                } else {
                    message.reply({ embeds: [embed.setDescription(`Silinen kanal limiti zaten ayarlanmamış.`)] })
                }

                return;
            }

            if (channelDeleteNumber) {
                message.reply({ embeds: [embed.setDescription(`Silinen kanal limiti zaten ayarlanmış. \n\nSıfırlamak İçin: ${prefix}kanal-koruma silinen limit sıfırla`)] })
            } else {
                if (!Number(args[2])) return message.reply({ embeds: [embed.setDescription(`Silinen kanal limitini ayarlamak için bir sayı girmelisin.`)] })
                if (Number(args[2]) < 0) return message.reply({ embeds: [embed.setDescription(`Silinen kanal limitini ayarlamak için pozitif bir sayı girmelisin.`)] })

                await Database.add(`channelDeleteNumber.${message.guild.id}`, Number(args[2]))

                message.reply({ embeds: [embed.setDescription(`Başarıyla silinen kanal limiti **${Number(args[2])}** olarak ayarlandı.`)] })
            }
        }

        if (args[1] === "log") {
            if (args[2] === "sıfırla") {
                if (channelDeleteLogChannel) {
                    await Database.delete(`channelDeleteLogChannel.${message.guild.id}`)

                    message.reply({ embeds: [embed.setDescription(`Başarıyla silinen kanal limit log kanalı sıfırlandı.`)] })
                } else {
                    message.reply({ embeds: [embed.setDescription(`Silinen kanal limit log kanalı zaten ayarlanmamış.`)] })
                }

                return;
            }

            if (channelDeleteLogChannel) {
                message.reply({ embeds: [embed.setDescription(`Silinen kanal limit log kanalı zaten ayarlanmış. \n\nSıfırlamak İçin: ${prefix}kanal-koruma silinen log sıfırla`)] })
            } else {
                const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]);

                if (!channel) return message.reply({ embeds: [embed.setDescription(`Silinen kanal limit log kanalını ayarlamak için bir kanal etiketlemelisin.`)] })

                await Database.set(`channelDeleteLogChannel.${message.guild.id}`, channel.id)

                message.reply({ embeds: [embed.setDescription(`Başarıyla silinen kanal limit log kanalı ayarlandı. \n\nAyarlanan Kanal: ${channel ? channel : "Bulunamadı."}`)] })
            }
        }
    }

    if (args[0] === "oluşturulan") {
        if (!args[1]) return message.reply({ embeds: [embed.setDescription(`**Oluşturulan kanal Limit Komutları:** \n${prefix}kanal-koruma silinen aç \n${prefix}kanal-koruma silinen kapat \n${prefix}kanal-koruma silinen limit <sayı> \n${prefix}kanal-koruma silinen limit sıfırla \n${prefix}kanal-koruma silinen log #kanal \n${prefix}kanal-koruma silinen log sıfırla`)] })

        if (args[1] === "aç") {
            if (channelCreateBoolean) {
                message.reply({ embeds: [embed.setDescription(`Oluşturulan kanal limit sistemi zaten açık durumda.`)] })
            } else {
                await Database.set(`channelCreateBoolean.${message.guild.id}`, "open")
                message.reply({ embeds: [embed.setDescription(`Başarıyla oluşturulan kanal limit sistemi açıldı.`)] })
            }
        }

        if (args[1] === "kapat") {
            if (channelCreateBoolean) {
                await Database.delete(`channelCreateBoolean.${message.guild.id}`)
                message.reply({ embeds: [embed.setDescription(`Başarıyla oluşturulan kanal limit sistemi kapatıldı.`)] })
            } else {
                message.reply({ embeds: [embed.setDescription(`Oluşturulan kanal limit sistemi zaten kapalı durumda.`)] })
            }
        }

        if (args[1] === "limit") {
            if (args[2] === "sıfırla") {
                if (channelCreateNumber) {
                    await Database.delete(`channelCreateNumber.${message.guild.id}`);

                    message.reply({ embeds: [embed.setDescription(`Başarıyla oluşturulan kanal limit sıfırlandı.`)] })
                } else {
                    message.reply({ embeds: [embed.setDescription(`Oluşturulan kanal limiti zaten ayarlanmamış.`)] })
                }

                return;
            }

            if (channelCreateNumber) {
                message.reply({ embeds: [embed.setDescription(`Oluşturulan kanal limiti zaten ayarlanmış. \n\nSıfırlamak İçin: ${prefix}kanal-koruma oluşturulan limit sıfırla`)] })
            } else {
                if (!Number(args[2])) return message.reply({ embeds: [embed.setDescription(`Oluşturulan kanal limitini ayarlamak için bir sayı girmelisin.`)] })
                if (Number(args[2]) < 0) return message.reply({ embeds: [embed.setDescription(`Oluşturulan kanal limitini ayarlamak için pozitif bir sayı girmelisin.`)] })

                await Database.add(`channelCreateNumber.${message.guild.id}`, Number(args[2]))

                message.reply({ embeds: [embed.setDescription(`Başarıyla oluşturulan kanal limiti **${Number(args[2])}** olarak ayarlandı.`)] })
            }
        }

        if (args[1] === "log") {
            if (args[2] === "sıfırla") {
                if (channelCreateLogChannel) {
                    await Database.delete(`channelCreateLogChannel.${message.guild.id}`)

                    message.reply({ embeds: [embed.setDescription(`Başarıyla oluşturulan kanal limit log kanalı sıfırlandı.`)] })
                } else {
                    message.reply({ embeds: [embed.setDescription(`Oluşturulan kanal limit log kanalı zaten ayarlanmamış.`)] })
                }

                return;
            }

            if (channelCreateLogChannel) {
                message.reply({ embeds: [embed.setDescription(`Oluşturulan kanal limit log kanalı zaten ayarlanmış. \n\nSıfırlamak İçin: ${prefix}kanal-koruma oluşturulan log sıfırla`)] })
            } else {
                const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]);

                if (!channel) return message.reply({ embeds: [embed.setDescription(`Oluşturulan kanal limit log kanalını ayarlamak için bir kanal etiketlemelisin.`)] })

                await Database.set(`channelCreateLogChannel.${message.guild.id}`, channel.id)

                message.reply({ embeds: [embed.setDescription(`Başarıyla oluşturulan kanal limit log kanalı ayarlandı. \n\nAyarlanan Kanal: ${channel ? channel : "Bulunamadı."}`)] })
            }
        }
    }
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: 'kanal-koruma',
    description: 'Kanal limitlerini ayarlar.',
    usage: 'kanal-koruma <silinen/oluşturulan> <aç/kapat/limit/log>',
    category: "koruma"
}

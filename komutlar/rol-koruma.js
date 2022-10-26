const { MessageEmbed } = require("discord.js");
const Database = require("croxydb");

exports.run = async (client, message, args) => {
    const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
    const embed = new MessageEmbed()
        .setAuthor({ name: `${client.user.username} | Rol Limit Sistemi`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setColor("BLUE")
        .setFooter({ text: '❤️', iconURL: message.author.avatarURL({ dynamic: true }) })
        .setTimestamp()

    if (message.author.id !== message.guild.ownerId) return message.reply({ embeds: [embed.setDescription(`Yetersiz izin, sistemi sadece \`SUNUCU SAHIBI\` kullanabilir.`)] })

    const roleDeleteBoolean = await Database.get(`roleDeleteBoolean.${message.guild.id}`);
    const roleDeleteNumber = await Database.get(`roleDeleteNumber.${message.guild.id}`);
    const roleDeleteLogChannel = await Database.get(`roleDeleteLogChannel.${message.guild.id}`);

    const roleCreateBoolean = await Database.get(`roleCreateBoolean.${message.guild.id}`);
    const roleCreateNumber = await Database.get(`roleCreateNumber.${message.guild.id}`);
    const roleCreateLogChannel = await Database.get(`roleCreateLogChannel.${message.guild.id}`);

    if (!args[0]) return message.reply({ embeds: [embed.setDescription(`**Silinen Rol Limit Komutları:** \n${prefix}rol-koruma silinen aç \n${prefix}rol-koruma silinen kapat \n${prefix}rol-koruma silinen limit <sayı> \n${prefix}rol-koruma silinen limit sıfırla \n${prefix}rol-koruma silinen log #kanal \n${prefix}rol-koruma silinen log sıfırla \n\n**Oluşturulan Rol Limit Komutları:** \n${prefix}rol-koruma oluşturulan aç \n${prefix}rol-koruma oluşturulan kapat \n${prefix}rol-koruma oluşturulan limit <sayı> \n${prefix}rol-koruma oluşturulan limit sıfırla \n${prefix}rol-koruma oluşturulan log #kanal \n${prefix}rol-koruma oluşturulan log sıfırla`)] })

    if (args[0] === "silinen") {
        if (!args[1]) return message.reply({ embeds: [embed.setDescription(`**Silinen Rol Limit Komutları:** \n${prefix}rol-koruma silinen aç \n${prefix}rol-koruma silinen kapat \n${prefix}rol-koruma silinen limit <sayı> \n${prefix}rol-koruma silinen limit sıfırla \n${prefix}rol-koruma silinen log #kanal \n${prefix}rol-koruma silinen log sıfırla`)] })

        if (args[1] === "aç") {
            if (roleDeleteBoolean) {
                message.reply({ embeds: [embed.setDescription(`Silinen rol limit sistemi zaten açık durumda.`)] })
            } else {
                await Database.set(`roleDeleteBoolean.${message.guild.id}`, "open")
                message.reply({ embeds: [embed.setDescription(`Başarıyla silinen rol limit sistemi açıldı.`)] })
            }
        }

        if (args[1] === "kapat") {
            if (roleDeleteBoolean) {
                await Database.delete(`roleDeleteBoolean.${message.guild.id}`)
                message.reply({ embeds: [embed.setDescription(`Başarıyla silinen rol limit sistemi kapatıldı.`)] })
            } else {
                message.reply({ embeds: [embed.setDescription(`Silinen rol limit sistemi zaten kapalı durumda.`)] })
            }
        }

        if (args[1] === "limit") {
            if (args[2] === "sıfırla") {
                if (roleDeleteNumber) {
                    await Database.delete(`roleDeleteNumber.${message.guild.id}`);

                    message.reply({ embeds: [embed.setDescription(`Başarıyla silinen rol limit sıfırlandı.`)] })
                } else {
                    message.reply({ embeds: [embed.setDescription(`Silinen rol limiti zaten ayarlanmamış.`)] })
                }

                return;
            }

            if (roleDeleteNumber) {
                message.reply({ embeds: [embed.setDescription(`Silinen rol limiti zaten ayarlanmış. \n\nSıfırlamak İçin: ${prefix}rol-koruma silinen limit sıfırla`)] })
            } else {
                if (!Number(args[2])) return message.reply({ embeds: [embed.setDescription(`Silinen rol limitini ayarlamak için bir sayı girmelisin.`)] })
                if (Number(args[2]) < 0) return message.reply({ embeds: [embed.setDescription(`Silinen rol limitini ayarlamak için pozitif bir sayı girmelisin.`)] })

                await Database.add(`roleDeleteNumber.${message.guild.id}`, Number(args[2]))

                message.reply({ embeds: [embed.setDescription(`Başarıyla silinen rol limiti **${Number(args[2])}** olarak ayarlandı.`)] })
            }
        }

        if (args[1] === "log") {
            if (args[2] === "sıfırla") {
                if (roleDeleteLogChannel) {
                    await Database.delete(`roleDeleteLogChannel.${message.guild.id}`)

                    message.reply({ embeds: [embed.setDescription(`Başarıyla silinen rol limit log kanalı sıfırlandı.`)] })
                } else {
                    message.reply({ embeds: [embed.setDescription(`Silinen rol limit log kanalı zaten ayarlanmamış.`)] })
                }

                return;
            }

            if (roleDeleteLogChannel) {
                message.reply({ embeds: [embed.setDescription(`Silinen rol limit log kanalı zaten ayarlanmış. \n\nSıfırlamak İçin: ${prefix}rol-koruma silinen log sıfırla`)] })
            } else {
                const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]);

                if (!channel) return message.reply({ embeds: [embed.setDescription(`Silinen rol limit log kanalını ayarlamak için bir kanal etiketlemelisin.`)] })

                await Database.set(`roleDeleteLogChannel.${message.guild.id}`, channel.id)

                message.reply({ embeds: [embed.setDescription(`Başarıyla silinen rol limit log kanalı ayarlandı. \n\nAyarlanan Kanal: ${channel ? channel : "Bulunamadı."}`)] })
            }
        }
    }

    if (args[0] === "oluşturulan") {
        if (!args[1]) return message.reply({ embeds: [embed.setDescription(`**Oluşturulan Rol Limit Komutları:** \n${prefix}rol-koruma silinen aç \n${prefix}rol-koruma silinen kapat \n${prefix}rol-koruma silinen limit <sayı> \n${prefix}rol-koruma silinen limit sıfırla \n${prefix}rol-koruma silinen log #kanal \n${prefix}rol-koruma silinen log sıfırla`)] })

        if (args[1] === "aç") {
            if (roleCreateBoolean) {
                message.reply({ embeds: [embed.setDescription(`Oluşturulan rol limit sistemi zaten açık durumda.`)] })
            } else {
                await Database.set(`roleCreateBoolean.${message.guild.id}`, "open")
                message.reply({ embeds: [embed.setDescription(`Başarıyla oluşturulan rol limit sistemi açıldı.`)] })
            }
        }

        if (args[1] === "kapat") {
            if (roleCreateBoolean) {
                await Database.delete(`roleCreateBoolean.${message.guild.id}`)
                message.reply({ embeds: [embed.setDescription(`Başarıyla oluşturulan rol limit sistemi kapatıldı.`)] })
            } else {
                message.reply({ embeds: [embed.setDescription(`Oluşturulan rol limit sistemi zaten kapalı durumda.`)] })
            }
        }

        if (args[1] === "limit") {
            if (args[2] === "sıfırla") {
                if (roleCreateNumber) {
                    await Database.delete(`roleCreateNumber.${message.guild.id}`);

                    message.reply({ embeds: [embed.setDescription(`Başarıyla oluşturulan rol limit sıfırlandı.`)] })
                } else {
                    message.reply({ embeds: [embed.setDescription(`Oluşturulan rol limiti zaten ayarlanmamış.`)] })
                }

                return;
            }

            if (roleCreateNumber) {
                message.reply({ embeds: [embed.setDescription(`Oluşturulan rol limiti zaten ayarlanmış. \n\nSıfırlamak İçin: ${prefix}rol-koruma oluşturulan limit sıfırla`)] })
            } else {
                if (!Number(args[2])) return message.reply({ embeds: [embed.setDescription(`Oluşturulan rol limitini ayarlamak için bir sayı girmelisin.`)] })
                if (Number(args[2]) < 0) return message.reply({ embeds: [embed.setDescription(`Oluşturulan rol limitini ayarlamak için pozitif bir sayı girmelisin.`)] })

                await Database.add(`roleCreateNumber.${message.guild.id}`, Number(args[2]))

                message.reply({ embeds: [embed.setDescription(`Başarıyla oluşturulan rol limiti **${Number(args[2])}** olarak ayarlandı.`)] })
            }
        }

        if (args[1] === "log") {
            if (args[2] === "sıfırla") {
                if (roleCreateLogChannel) {
                    await Database.delete(`roleCreateLogChannel.${message.guild.id}`)

                    message.reply({ embeds: [embed.setDescription(`Başarıyla oluşturulan rol limit log kanalı sıfırlandı.`)] })
                } else {
                    message.reply({ embeds: [embed.setDescription(`Oluşturulan rol limit log kanalı zaten ayarlanmamış.`)] })
                }

                return;
            }

            if (roleCreateLogChannel) {
                message.reply({ embeds: [embed.setDescription(`Oluşturulan rol limit log kanalı zaten ayarlanmış. \n\nSıfırlamak İçin: ${prefix}rol-koruma oluşturulan log sıfırla`)] })
            } else {
                const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]);

                if (!channel) return message.reply({ embeds: [embed.setDescription(`Oluşturulan rol limit log kanalını ayarlamak için bir kanal etiketlemelisin.`)] })

                await Database.set(`roleCreateLogChannel.${message.guild.id}`, channel.id)

                message.reply({ embeds: [embed.setDescription(`Başarıyla oluşturulan rol limit log kanalı ayarlandı. \n\nAyarlanan Kanal: ${channel ? channel : "Bulunamadı."}`)] })
            }
        }
    }
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: 'rol-koruma',
    description: 'Rol Koruma Sistemi',
    usage: 'rol-koruma <komut>',
    category: "koruma"
}

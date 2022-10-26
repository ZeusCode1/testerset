const { MessageEmbed } = require("discord.js");
const Database = require("croxydb");

exports.run = async (client, message, args) => {
    const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
    const embed = new MessageEmbed()
        .setAuthor({ name: `${client.user.username} | Bot Koruma Sistemi`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setColor("BLUE")
        .setFooter({ text: '❤️', iconURL: message.author.avatarURL({ dynamic: true }) })
        .setTimestamp()

    if (message.author.id !== message.guild.ownerId) return message.reply({ embeds: [embed.setDescription(`Yetersiz izin, sistemi sadece \`SUNUCU SAHIBI\` kullanabilir.`)] })

    const botGuardBoolean = await Database.get(`botGuardBoolean.${message.guild.id}`);
    const botGuardLogChannel = await Database.get(`botGuardLogChannel.${message.guild.id}`);

    if (!args[0]) return message.reply({ embeds: [embed.setDescription(`**Bot Koruma Komutları:** \n${prefix}bot-koruma aç \n${prefix}bot-koruma kapat \n${prefix}bot-koruma izin ver @botID \n${prefix}bot-koruma izin kaldır @botID \n${prefix}bot-koruma log #kanal \n${prefix}bot-koruma log sıfırla`)] })

    if (args[0] === "aç") {
        if (botGuardBoolean) {
            message.reply({ embeds: [embed.setDescription(`Bot koruma sistemi zaten açık durumda.`)] })
        } else {
            await Database.set(`botGuardBoolean.${message.guild.id}`, "open")
            message.reply({ embeds: [embed.setDescription(`Başarıyla bot koruma sistemi açıldı.`)] })
        }
    }

    if (args[0] === "kapat") {
        if (botGuardBoolean) {
            await Database.delete(`botGuardBoolean.${message.guild.id}`)
            message.reply({ embeds: [embed.setDescription(`Başarıyla bot koruma sistemi kapatıldı.`)] })
        } else {
            message.reply({ embeds: [embed.setDescription(`Bot koruma sistemi zaten kapalı durumda.`)] })
        }
    }

    if (args[0] === "izin") {
        if (args[1] === "kaldır") {
            try {
                let bot = await client.users.fetch(args[2]);

                if (!bot) return message.reply({ embeds: [embed.setDescription(`İzinini kaldıracağın botun ID'sini yazmalısın.`)] })

                if (bot.bot === false) {
                    message.reply({ embeds: [embed.setDescription(`Belirttiğin ID bir botun ID'si değil, bot ID'si belirt.`)] })
                } else {
                    const botGuardPerm = await Database.get(`botGuardPerm.${message.guild.id}${bot.id}`);

                    if (!botGuardPerm) return message.reply({ embeds: [embed.setDescription(`Belirttiğin bot sistemde zaten izinli değil.`)] })

                    await Database.delete(`botGuardPerm.${message.guild.id}${bot.id}`)

                    message.reply({ embeds: [embed.setDescription(`Başarıyla \`${bot.username}\` adlı botun izinini kaldırdın.`)] })
                }
            } catch (err) {
                message.reply({ embeds: [embed.setDescription(`İzinini kaldıracağın botun ID'sini yazmalısın.`)] })
            }
        }

        if (args[1] === "ver") {
            try {
                let bot = await client.users.fetch(args[2]);

                if (!bot) return message.reply({ embeds: [embed.setDescription(`İzin vereceğin botun ID'sini yazmalısın.`)] })

                if (bot.bot === false) {
                    message.reply({ embeds: [embed.setDescription(`Belirttiğin ID bir botun ID'si değil, bot ID'si belirt.`)] })
                } else {
                    const botGuardPerm = await Database.get(`botGuardPerm.${message.guild.id}${bot.id}`);

                    if (botGuardPerm) return message.reply({ embeds: [embed.setDescription(`Belirttiğin bot sistemde zaten izinli.`)] })

                    await Database.set(`botGuardPerm.${message.guild.id}${bot.id}`, "izin")

                    message.reply({ embeds: [embed.setDescription(`Başarıyla \`${bot.username}\` adlı bota izin verdin.`)] })
                }
            } catch (err) {
                message.reply({ embeds: [embed.setDescription(`İzin vereceğin botun ID'sini yazmalısın.`)] })
            }
        }
    }

    if (args[0] === "log") {
        if (args[1] === "sıfırla") {
            if (botGuardLogChannel) {
                await Database.delete(`botGuardLogChannel.${message.guild.id}`)

                message.reply({ embeds: [embed.setDescription(`Başarıyla bot koruma log kanalı sıfırlandı.`)] })
            } else {
                message.reply({ embeds: [embed.setDescription(`Silinen bot koruma log kanalı zaten ayarlanmamış.`)] })
            }

            return;
        }

        if (botGuardLogChannel) {
            message.reply({ embeds: [embed.setDescription(`Bot koruma log kanalı zaten ayarlanmış. \n\nSıfırlamak İçin: ${prefix}bot-koruma silinen log sıfırla`)] })
        } else {
            const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]);

            if (!channel) return message.reply({ embeds: [embed.setDescription(`bot koruma log kanalını ayarlamak için bir kanal etiketlemelisin.`)] })

            await Database.set(`botGuardLogChannel.${message.guild.id}`, channel.id)

            message.reply({ embeds: [embed.setDescription(`Başarıyla bot koruma log kanalı ayarlandı. \n\nAyarlanan Kanal: ${channel ? channel : "Bulunamadı."}`)] })
        }
    }
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: 'bot-koruma',
    description: 'Bot koruma sistemini açıp kapatır.',
    usage: 'bot-koruma [aç/kapat]',
    category: "koruma"
}

const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");

module.exports.run = async (client, message, args) => {

let button = new MessageActionRow().addComponents(
    new MessageButton()
    .setStyle("SUCCESS")
    .setLabel("Güncelle")
    .setCustomId("rel"),
    new MessageButton()
    .setStyle("DANGER")
    .setLabel("Sil")
    .setCustomId("del"))
    
        let embed = new MessageEmbed()
        .setColor("BLUE")
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle(client.user.username)
        .setFooter({ text: '❤️', iconURL:message.author.avatarURL({ dynamic: true }) })
        .setDescription(`**
        > Sunucular: \`${client.guilds.cache.size}\`
        > Kullanıcılar: \`${Math.ceil(client.guilds.cache.reduce((a, b) => a + b.memberCount, 0))}\`
        > Kanallar: \`${client.channels.cache.size}\`**`)
        .addField("Invite Bot", `**[Beni Sunucuna Ekle](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)**` ,true)
        message.channel.send({embeds:[embed], components:[button]}).then(async Message => {
            
            const filter = i =>  i.user.id === message.author.id
            let col = await Message.createMessageComponentCollector({filter, time: 1200000 });
    
            col.on('collect', async(button) => {
            if(button.user.id !== message.author.id) return
            
              switch (button.customId) {
                case 'rel':
                      const embedd = new MessageEmbed()
                .setColor("BLUE")
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL())
                .setTitle(client.user.username)
                .setFooter({ text: '❤️', iconURL:message.author.avatarURL({ dynamic: true }) })
                .setDescription(`**
                > Sunucular: \`${client.guilds.cache.size}\`
                > Kullanıcılar: \`${Math.ceil(client.guilds.cache.reduce((a, b) => a + b.memberCount, 0))}\`
                > Kanallar: \`${client.channels.cache.size}\`**`)
                .addField("Invite Bot", `**[Beni Sunucuna Ekle](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)**` ,true)
                      
                await Message.edit({embeds: [embedd]})
                button.reply({content: "> **✅ Başarılı:** Bot istatistikleri güncellendi!", ephemeral: true}).catch(e => { });
    
                break
                case 'del':
                col.stop(true)
                await message.delete().catch(e => { });
                await Message.delete().catch(e => { });
                button.reply({content: "> **✅ Başarılı** Bot istatistikleri silindi!", ephemeral: true}).catch(e => { });
                break
    
              }
            })
            col.on('end', async(button) => {

                 button = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setStyle("SUCCESS")
                    .setLabel("Güncelle")
                    .setCustomId("rel")
                    .setDisabled(true),
                    new MessageButton()
                    .setStyle("DANGER")
                    .setLabel("Sil")
                    .setCustomId("del")
                    .setDisabled(true))

                const embedd = new MessageEmbed()
                .setColor("BLUE")
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL())
                .setTitle(client.user.username + " Komut Süresi Doldu!")
                .setFooter({ text: '❤️', iconURL:message.author.avatarURL({ dynamic: true }) })
                .setDescription(`**
    > Sunucular: \`${client.guilds.cache.size}\`
    > Kullanıcılar: \`${Math.ceil(client.guilds.cache.reduce((a, b) => a + b.memberCount, 0))}\`
    > Kanallar: \`${client.channels.cache.size}\`**`)
    .addField("Invite Bot", `**[Beni Sunucuna Ekle](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)**` ,true)
                      
                await Message.edit({embeds: [embedd], components:[button]})
            })
        }).catch(e => { });

    }
        exports.conf = {
            aliases: []
        }
        
        exports.help = {
            name: 'istatistik',
            description: 'Bot istatistiklerini gösterir.',
            usage: 'istatistik',
            category: 'bot'
        }
            
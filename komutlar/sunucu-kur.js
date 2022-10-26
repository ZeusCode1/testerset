const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

exports.run = async (client, message, args) => {
    const prefix = client.db.get(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`).catch(e => {})
    if(!message.guild.me.permissions.has("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalıyım!`).catch(e => {})
    if(message.guild.me.roles.highest.position < message.guild.roles.highest.position) return message.reply(`Bu Komutu Kullanabilmek İçin \`${message.guild.roles.highest.name}\` Rolünün Üstünde Olmalıyım veya O Role Sahip Olmalıyım!`).catch(e => {})
    
    const row = new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId('normal')
					.setLabel('Normal Sunucu')
					.setStyle('SUCCESS'),
                    new MessageButton()
					.setCustomId('game')
					.setLabel('Oyun Sunucusu')
					.setStyle('SUCCESS'),
                    new MessageButton()
                    .setCustomId('iptal')
                    .setLabel('İptal Et')
                    .setStyle('DANGER')
			);

    const embed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle("Ne Tür Sunucu Kurmak İstiyorsun?")
    .setTimestamp()
message.channel.send({ embeds: [embed], components: [row] }).then(async mesaj => {

const filter = x => x.user.id === message.author.id
let collector = mesaj.createMessageComponentCollector({ filter, time: 300000 })

collector.on("collect", async button => {


if(button.customId === "normal") {
    // Tüm Kanalları Sil
message.guild.channels.cache.map(c => {
    c.delete().catch(e => { })
    })
    message.guild.roles.cache.map(c => {
    c.delete().catch(e => { })
    })
    // Tüm Kanalları Sil
    
    // Rol Oluştur
    message.author.send("Sunucu Kurulumu Başladı, Roller Olusturuluyor!").catch(e => {})
    setTimeout(async() => {
        message.guild.roles.create({
            name: `🏆︲Kurucu`,
            color: "#ff0002", 
            hoist: true,
            permissions: [
                "ADMINISTRATOR"
        ]
        }).then(async(kurucuR) => { 
    
        message.guild.roles.create({
            name: `▬▬▬▬ 》Yetkili Rolleri《 ▬▬▬▬`,
            color: "#2f3136", 
            hoist: true,
            permissions: "CREATE_INSTANT_INVITE"
        }).catch(e => { })
    
        message.guild.roles.create({
            name: `🎓︲Yönetici`,
            color: "#0c0808",
            hoist: true,
            permissions: [
                "MANAGE_GUILD",
                "MANAGE_ROLES",
                "MUTE_MEMBERS",
                "DEAFEN_MEMBERS",
                "MANAGE_MESSAGES",
                "MANAGE_NICKNAMES",
                "KICK_MEMBERS",
                "BAN_MEMBERS",
                "CREATE_INSTANT_INVITE",
                "ADD_REACTIONS",
                "VIEW_AUDIT_LOG", 
                "MANAGE_CHANNELS",
                "CHANGE_NICKNAME",
                "VIEW_CHANNEL",
                "SEND_MESSAGES",
                "USE_EXTERNAL_EMOJIS", 
                "ADD_REACTIONS",
                "CONNECT",
                "SPEAK",
                "MOVE_MEMBERS",
                "READ_MESSAGE_HISTORY",
                "ATTACH_FILES",
                "EMBED_LINKS",
                "MENTION_EVERYONE"
        ]
            }).then(async(yöneticiR) => { 
    
            message.guild.roles.create({
            name: `🔅︲Admin`,
            color: "#008aff",
            hoist: true,
            permissions: [
                "MANAGE_ROLES",
                "MUTE_MEMBERS",
                "DEAFEN_MEMBERS",
                "MANAGE_MESSAGES",
                "MANAGE_NICKNAMES",
                "CREATE_INSTANT_INVITE",
                "ADD_REACTIONS",
                "VIEW_AUDIT_LOG", 
                "MANAGE_CHANNELS",
                "CHANGE_NICKNAME",
                "VIEW_CHANNEL",
                "SEND_MESSAGES",
                "USE_EXTERNAL_EMOJIS", 
                "CONNECT",
                "SPEAK",
                "MOVE_MEMBERS",
                "READ_MESSAGE_HISTORY"
        ]
            }).then(async(adminR) => { 
    
        message.guild.roles.create({
            name: `🔧︲Moderatör`,
            color: "#00a71f" ,
            hoist: true,
            permissions: [
                "MANAGE_ROLES",
                "MUTE_MEMBERS",
                "DEAFEN_MEMBERS",
                "MANAGE_MESSAGES",
                "MANAGE_NICKNAMES",
                "CREATE_INSTANT_INVITE",
                "ADD_REACTIONS",
                "VIEW_AUDIT_LOG", 
                "CHANGE_NICKNAME",
                "VIEW_CHANNEL",
                "SEND_MESSAGES",
                "USE_EXTERNAL_EMOJIS", 
                "CONNECT",
                "SPEAK",
                "MOVE_MEMBERS",
                "READ_MESSAGE_HISTORY"
        ]
            }).then(async(moderatörR) => { 
       
    
        message.guild.roles.create({
            name: `🔒︲Kayıt Yetkilisi`,
            color: '#00b5fa',
            hoist: true,
            permissions: [
                "MANAGE_ROLES",
                "MUTE_MEMBERS",
                "MANAGE_MESSAGES",
                "MANAGE_NICKNAMES",
                "CREATE_INSTANT_INVITE",
                "ADD_REACTIONS",
                "CHANGE_NICKNAME",
                "VIEW_CHANNEL",
                "SEND_MESSAGES",
                "USE_EXTERNAL_EMOJIS", 
                "CONNECT",
                "SPEAK",
                "MOVE_MEMBERS",
                "READ_MESSAGE_HISTORY"
    ]
        }).then(async(kayıtyetkilisiR) => { 
      
    
        message.guild.roles.create({
            name: `📂︲Deneme Moderatör`,
            color: '#f1c40f',  
            hoist: true,
            permissions: [
                "MUTE_MEMBERS",
                "MANAGE_MESSAGES",
                "MANAGE_NICKNAMES",
                "CREATE_INSTANT_INVITE",
                "ADD_REACTIONS",
                "CHANGE_NICKNAME",
                "VIEW_CHANNEL",
                "SEND_MESSAGES",
                "USE_EXTERNAL_EMOJIS", 
                "CONNECT",
                "SPEAK",
                "MOVE_MEMBERS",
                "READ_MESSAGE_HISTORY"
    ]
            }).then(async(denememodR) => { 
     
    
        message.guild.roles.create({
            name: `▬▬▬▬ 》Üye Rolleri《 ▬▬▬▬`,
            color: "#2f3136", 
            hoist: true,
            permissions: "CREATE_INSTANT_INVITE"
        }).catch(e => { })
      
    
        message.guild.roles.create({
            name: `💎︲Özel Üye`,
            color: "#00d3ff" ,
            hoist: true,
            permissions: [
    "CREATE_INSTANT_INVITE",
    "SEND_MESSAGES",
    "READ_MESSAGE_HISTORY",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "CHANGE_NICKNAME",
    "ATTACH_FILES",
    "EMBED_LINKS",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_CHANNEL",
    "USE_VAD"
    ]
            }).then(async(özelüyeR) => { 
    
    
      message.guild.roles.create({
            hoist: true,
            name: `🎀︲Bayan Üye`,
            color: "#ef00ff",
            permissions: [
    "CREATE_INSTANT_INVITE",
    "SEND_MESSAGES",
    "READ_MESSAGE_HISTORY",
    "CONNECT",
    "SPEAK",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_CHANNEL",
    "USE_VAD"
    ]
            }).then(async(bayanüyeR) => { 
    
             message.guild.roles.create({
            hoist: true,
            name: `🌙︲Üye`,
            color: "#fff000", 
            permissions: [
    "CREATE_INSTANT_INVITE",
    "SEND_MESSAGES",
    "READ_MESSAGE_HISTORY",
    "CONNECT",
    "SPEAK",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_CHANNEL",
    "USE_VAD"
    ]
            }).then(async(üyeR) => { 
    
    message.guild.roles.create({
            hoist: true,
            name: ` 🔒︲Kayıtsız`,
            color: "#0c0c0c",
            permissions: [
    "CREATE_INSTANT_INVITE",
    "SEND_MESSAGES",
    "READ_MESSAGE_HISTORY",
    "CONNECT",
    "SPEAK",
    "USE_EXTERNAL_EMOJIS",
    "USE_VAD"
    ]
    }).then(async(kayıtsızR) => { 
    
    
     message.guild.roles.create({
            hoist: true,
            name: `▬▬▬▬ 》Bot Rolleri《 ▬▬▬▬`,
            color: "#2f3136",
            permissions: "CREATE_INSTANT_INVITE"
            }).catch(e => { })
    
            message.guild.roles.create({
            hoist: true,
            name: `🤖︲Bot`,
            color: "#0c0c0c",
            permissions: [
    "CREATE_INSTANT_INVITE",
    "SEND_MESSAGES",
    "READ_MESSAGE_HISTORY",
    "USE_EXTERNAL_EMOJIS",
    "CONNECT",
    "SPEAK",
    "ATTACH_FILES",
    "EMBED_LINKS"]
            }).then(async(botR) => { 
    // Rol Oluştur
    
    setTimeout(async() => {
    // GUILD_CATEGORY Oluştur
    message.author.send("Sunucu Kurulumu Deavm Ediyor, Kanallar Olusturuluyor!").catch(e => {})
  await message.guild.channels.create(`🎓︲YETKİLİ`, { type: "GUILD_CATEGORY" }).then(async(yetkiliKG) => {
  await message.guild.channels.create(`🔑︲KAYIT`, { type: "GUILD_CATEGORY" }).then(async(kayıtkanallarıKG) => {
  await message.guild.channels.create(`📢︲DUYURU`, { type: "GUILD_CATEGORY" }).then(async(duyuruKG) => {
  await message.guild.channels.create(`💬︲GENEL`, { type: "GUILD_CATEGORY" }).then(async(genelKG) => {
  await message.guild.channels.create(`🌟︲EGLENCE`, { type: "GUILD_CATEGORY" }).then(async(eğlenceKG) => { 
  await message.guild.channels.create(`🎤︲SES KANALLARI`, { type: "GUILD_CATEGORY" }).then(async(seskanallarıKG) => { 
    // GUILD_CATEGORY Oluştur 
    
    // Rol Değişkenleri
    let everyoneR = message.guild.roles.cache.find(x => x.name === "@everyone")
    message.guild.roles.everyone.setPermissions([
    "CREATE_INSTANT_INVITE",
    "SEND_MESSAGES",
    "READ_MESSAGE_HISTORY",
    "USE_EXTERNAL_EMOJIS",
    "CONNECT",
    "SPEAK",
    "USE_VAD"
    ]).catch(e => {})
    // Rol Değişkenleri
    
    // Kanal Oluştur
    message.guild.channels.create(`︲💾︲modlog`, { type: "GUILD_TEXT", parent: yetkiliKG}).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kurucuR, {
              VIEW_CHANNEL: true
          }).catch(e => {})
    await c.permissionOverwrites.create(adminR, {
              VIEW_CHANNEL: true
          }).catch(e => {})
    await c.permissionOverwrites.create(yöneticiR, {
              VIEW_CHANNEL: true
          }).catch(e => {})
    }).catch(e => {})

    

    message.guild.channels.create(`︲🎓︲yetkili-duyuru`, { type: "GUILD_TEXT", parent: yetkiliKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kurucuR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(yöneticiR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(adminR, {
              VIEW_CHANNEL: true
          }).catch(e => {})
    await c.permissionOverwrites.create(moderatörR, {
              VIEW_CHANNEL: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtyetkilisiR, {
              VIEW_CHANNEL: true
          }).catch(e => {})
    await c.permissionOverwrites.create(denememodR, {
              VIEW_CHANNEL: true
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`︲🎓︲yetkili-sohbet`, { type: "GUILD_TEXT", parent: yetkiliKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kurucuR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})

    await c.permissionOverwrites.create(yöneticiR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(adminR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(moderatörR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtyetkilisiR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(denememodR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`︲🔧︲yetkili-komut`, { type: "GUILD_TEXT", parent: yetkiliKG}).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: false,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kurucuR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    await c.permissionOverwrites.create(yöneticiR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    await c.permissionOverwrites.create(adminR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    await c.permissionOverwrites.create(moderatörR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtyetkilisiR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    await c.permissionOverwrites.create(denememodR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`︲📚︲bilgilendirme`, { type: "GUILD_TEXT", parent: kayıtkanallarıKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtyetkilisiR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`︲🔐︲kayıt`, { type: "GUILD_TEXT", parent: kayıtkanallarıKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: null
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: null
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtyetkilisiR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`🎧╏Ses Teyit`, { type: "GUILD_VOICE", parent: kayıtkanallarıKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: false,
              CONNECT: true,
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtyetkilisiR, {
              VIEW_CHANNEL: true,
              CONNECT: true, 
              MOVE_MEMBERS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`🎧╏Ses Teyit`, { type: "GUILD_VOICE", parent: kayıtkanallarıKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: false,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtyetkilisiR, {
              VIEW_CHANNEL: true,
              CONNECT: true, 
              MOVE_MEMBERS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`︲✨︲hoşgeldin`, { type: "GUILD_TEXT", parent: duyuruKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              SEND_MESSAGES: null,
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false,          
              SEND_MESSAGES: false,
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: false,
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`︲📜︲kurallar`, { type: "GUILD_TEXT", parent: duyuruKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: false,
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`︲📢︲duyuru`, { type: "GUILD_TEXT", parent: duyuruKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: false,
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`︲🎁︲çekiliş`, { type: "GUILD_TEXT", parent: duyuruKG}).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: null,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false,          
              SEND_MESSAGES: false,
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: false,
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`︲🚀︲boost-bilgilendirme`, { type: "GUILD_TEXT", parent: duyuruKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: null,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false,          
              SEND_MESSAGES: false,
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: false,
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`︲🧷︲yenilikler`, { type: "GUILD_TEXT", parent: duyuruKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: null,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false,          
              SEND_MESSAGES: false,
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: false,
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`︲💬︲genel`, { type: "GUILD_TEXT", parent: genelKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`︲🤖︲Bot Komut`, { type: "GUILD_TEXT", parent: genelKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`︲📷︲Fotoğraf`, { type: "GUILD_TEXT", parent: genelKG}).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              ATTACH_FILES: true,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: true,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: true,
              EMBED_LINKS: false
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`︲🎮︲Oyun`, { type: "GUILD_TEXT", parent: genelKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              ATTACH_FILES: true,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: true,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: true,
              EMBED_LINKS: false
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`︲📝︲kelime-türetmece`, { type: "GUILD_TEXT", parent: eğlenceKG }).then(async(c) => {
    c.send(`
    **S: Bu Kanalın Amacı Nedir?**
    C: Bu Kanalın Amacı Kelime Türetmek.
    
    **S: Bu Oyunun Kuralları Neler?**
    
    **C: Bu Oyunun Kuralları;**
    - Herkes Alt Alta __Sadece__ 1 Kelime Yazabilir.
    - Son Kelimenin Son Harfi İle Yeni Baş Harfi o Olcak Şekilde Kelime Üreteceksiniz.
    - **Ğ** Harfi İle Başlayan Kelime İle Biterse Oyun Biter Kurucu Tarafından Yeni Kelime Verilir!
    
    **Örnek Oynanış;**
    
    Kelime
    Ekmek
    Kağıt.
      
    **İlk Kelime Benden;**
    
    Kelim__e__
    `).catch(e => {})

    await c.permissionOverwrites.create(everyoneR, {
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`︲💥︲bom`, { type: "GUILD_TEXT", parent: eğlenceKG }).then(async(c) => {
    c.send(`
    **S: Bu Kanalın Amacı Nedir?**
    C: Bu Kanalın Amacı Bom Diye Adlandıralan Sayı Sayarak 5 ve 10 Katlarına Gelince 15 Yazmak Yerin **Bom** Yazıyoruz.
    
    **S: Bu Oyunun Kuralları Neler?**
    
    **C: Bu Oyunun Kuralları;**
    - Herkes Alt Alta __Sadece__ 1 Sayı Yazabilir.
    - **Bom** Yerine Sayıyı Yazan Kaybeder.
    
    **Örnek Oynanış;**
    
    1
    2
    3
    4
    BOM
    
      
    **İlk Sayı Benden;**
    
    1
    `).catch(e => {})
    
    await c.permissionOverwrites.create(everyoneR, {
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`︲🎰︲sayı-saymaca`, { type: "GUILD_TEXT", parent: eğlenceKG }).then(async(c) => {
    c.send(`
    **S: Bu Kanalın Amacı Nedir?**
    C: Bu Kanalın Amacı Sayı Saymak.
    
    **S: Bu Oyunun Kuralları Neler?**
    
    **C: Bu Oyunun Kuralları;**
    - Herkes Alt Alta __Sadece__ 1 Sayı Yazabilir.
    - Yanlış Sayıyı Yazan Kaybeder.
    
    **Örnek Oynanış;**
    
    1
    2
    3
    4
    5
    
      
    **İlk Sayı Benden;**
    
    1
    `).catch(e => {})
    
    await c.permissionOverwrites.create(everyoneR, {
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`︲🎭︲tuttu-tutmadı`, { type: "GUILD_TEXT", parent: eğlenceKG }).then(async(c) => {
    c.send(`
    **S: Bu Kanalın Amacı Nedir?**
    C: Bu Kanalın Amacı Tuttu Tuttmadı.
    
    **S: Bu Oyunun Kuralları Neler?**
    
    **C: Bu Oyunun Kuralları;**
    - Herkes Alt Alta __Sadece__ Tuttu Tuttmadı Yazabilir.
    - **Bom** Yerine Sayıyı Yazan Kaybeder.
    
    **Örnek Oynanış;**
    
    tuttu altımdakinin nitrosu var
    tuttmadı üstekinin tuttu tutmadısı tutmadı :D
    tuttu altımdakinin sevgilsi var <3 
    tuttmadı üstümdekini sevgilisi yok </3
    
      
    **İlk Tuttu Tuttmadı Benden;**
    
    Tuttu altımdaki tuttu tuttmadı oyniyacak
    `).catch(e => {})
    
    await c.permissionOverwrites.create(everyoneR, {
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`🏆╏Kurucu`, { type: "GUILD_VOICE", parent: seskanallarıKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: null,
              CONNECT: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`🎓╏Yetkili Sohbet`, { type: "GUILD_VOICE", parent: seskanallarıKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: null,
              CONNECT: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kurucuR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(yöneticiR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(adminR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(moderatörR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtyetkilisiR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(denememodR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`💼╏Toplantı Odası`, { type: "GUILD_VOICE", parent: seskanallarıKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: null,
              CONNECT: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kurucuR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(yöneticiR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(adminR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(moderatörR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtyetkilisiR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(denememodR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`︲🔒︲Kilitli︲🔒︲`, { type: "GUILD_VOICE", parent: seskanallarıKG }).then(async(c) => {
    c.permissionOverwrites.create(everyoneR, {
              CONNECT: false,
              VIEW_CHANNEL: null
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`💭╏Sohbet Odası`, { type: "GUILD_VOICE", parent: seskanallarıKG }).then(async(c) => {
    c.permissionOverwrites.create(everyoneR, {
              CONNECT: true,
              VIEW_CHANNEL: null,
              STREAM: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    c.permissionOverwrites.create(üyeR, {
              CONNECT: true,
              VIEW_CHANNEL: null
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              CONNECT: true,
              VIEW_CHANNEL: null
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`🎮╏Oyun Odası`, { type: "GUILD_VOICE", parent: seskanallarıKG }).then(async(c) => {
    c.permissionOverwrites.create(everyoneR, {
              CONNECT: true,
              VIEW_CHANNEL: null,
              STREAM: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    c.permissionOverwrites.create(üyeR, {
              CONNECT: true,
              VIEW_CHANNEL: null,
              STREAM: true
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              CONNECT: true,
              VIEW_CHANNEL: null,
              STREAM: true
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`🎵╏Müzik Odası`, { type: "GUILD_VOICE", parent: seskanallarıKG }).then(async(c) => {
    c.permissionOverwrites.create(everyoneR, {
              CONNECT: true,
              VIEW_CHANNEL: null,
              SPEAK: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
          c.permissionOverwrites.create(üyeR, {
              CONNECT: true,
              VIEW_CHANNEL: null,
              SPEAK: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              CONNECT: true,
              VIEW_CHANNEL: null,
              SPEAK: false
          }).catch(e => {}) 
}).catch(e => {})



}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}, 10000)

    setTimeout(async () => {
        message.guild.members.cache.filter(m => !m.user.bot).map(m => {
        m.roles.add(kayıtsızR.id).catch(e => { })
        })
        if(message.author.id === message.guild.ownerId) {
        message.member.roles.add(kurucuR.id).catch(e => { })
        }
        message.guild.members.cache.filter(m => m.user.bot).map(m => {
        m.roles.add(botR.id).catch(e => { })
        })
        message.member.send("Sunucu Kur Tamamlandı!\nDonanımda Sorun Yaşıyorsanız Discordu Kapatın ve Yeniden Açın!").catch(e => { })
    }, 30000)

}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}, 5000)

button.deferUpdate();
}








if(button.customId === "game") {
    


    // Tüm Kanalları Sil
message.guild.channels.cache.map(c => {
    c.delete().catch(e => { })
    })
    message.guild.roles.cache.map(c => {
    c.delete().catch(e => { })
    })
    // Tüm Kanalları Sil
    
    // Rol Oluştur
    message.author.send("Sunucu Kurulumu Başladı, Roller Olusturuluyor!").catch(e => {})
    setTimeout(async() => {
        message.guild.roles.create({
            name: `🏆︲BOSS︲🏆`,
            color: "#ff0002", 
            hoist: true,
            permissions: [
                "ADMINISTRATOR"
        ]
        }).then(async(kurucuR) => { 
    
        message.guild.roles.create({
            name: `▬ Satff Roles ▬`,
            color: "#2f3136", 
            hoist: true,
            permissions: "CREATE_INSTANT_INVITE"
        }).catch(e => { })
    
        message.guild.roles.create({
            name: `🎓︲Manager︲🎓`,
            color: "#0c0808",
            hoist: true,
            permissions: [
                "MANAGE_GUILD",
                "MANAGE_ROLES",
                "MUTE_MEMBERS",
                "DEAFEN_MEMBERS",
                "MANAGE_MESSAGES",
                "MANAGE_NICKNAMES",
                "KICK_MEMBERS",
                "BAN_MEMBERS",
                "CREATE_INSTANT_INVITE",
                "ADD_REACTIONS",
                "VIEW_AUDIT_LOG", 
                "MANAGE_CHANNELS",
                "CHANGE_NICKNAME",
                "VIEW_CHANNEL",
                "SEND_MESSAGES",
                "USE_EXTERNAL_EMOJIS", 
                "ADD_REACTIONS",
                "CONNECT",
                "SPEAK",
                "MOVE_MEMBERS",
                "READ_MESSAGE_HISTORY",
                "ATTACH_FILES",
                "EMBED_LINKS",
                "MENTION_EVERYONE"
        ]
            }).then(async(yöneticiR) => { 
    
            message.guild.roles.create({
            name: `🔅︲Admin︲🔅`,
            color: "#008aff",
            hoist: true,
            permissions: [
                "MANAGE_ROLES",
                "MUTE_MEMBERS",
                "DEAFEN_MEMBERS",
                "MANAGE_MESSAGES",
                "MANAGE_NICKNAMES",
                "CREATE_INSTANT_INVITE",
                "ADD_REACTIONS",
                "VIEW_AUDIT_LOG", 
                "MANAGE_CHANNELS",
                "CHANGE_NICKNAME",
                "VIEW_CHANNEL",
                "SEND_MESSAGES",
                "USE_EXTERNAL_EMOJIS", 
                "CONNECT",
                "SPEAK",
                "MOVE_MEMBERS",
                "READ_MESSAGE_HISTORY"
        ]
            }).then(async(adminR) => { 
    
        message.guild.roles.create({
            name: `🔧︲Moderator︲🔧`,
            color: "#00a71f" ,
            hoist: true,
            permissions: [
                "MANAGE_ROLES",
                "MUTE_MEMBERS",
                "DEAFEN_MEMBERS",
                "MANAGE_MESSAGES",
                "MANAGE_NICKNAMES",
                "CREATE_INSTANT_INVITE",
                "ADD_REACTIONS",
                "VIEW_AUDIT_LOG", 
                "CHANGE_NICKNAME",
                "VIEW_CHANNEL",
                "SEND_MESSAGES",
                "USE_EXTERNAL_EMOJIS", 
                "CONNECT",
                "SPEAK",
                "MOVE_MEMBERS",
                "READ_MESSAGE_HISTORY"
        ]
            }).then(async(moderatörR) => { 
       
    
        message.guild.roles.create({
            name: `🔒︲Register Guard︲🔒`,
            color: '#00b5fa',
            hoist: true,
            permissions: [
                "MANAGE_ROLES",
                "MUTE_MEMBERS",
                "MANAGE_MESSAGES",
                "MANAGE_NICKNAMES",
                "CREATE_INSTANT_INVITE",
                "ADD_REACTIONS",
                "CHANGE_NICKNAME",
                "VIEW_CHANNEL",
                "SEND_MESSAGES",
                "USE_EXTERNAL_EMOJIS", 
                "CONNECT",
                "SPEAK",
                "MOVE_MEMBERS",
                "READ_MESSAGE_HISTORY"
    ]
        }).then(async(kayıtyetkilisiR) => { 
      
    
        message.guild.roles.create({
            name: `📂︲Trial Moderator︲📂`,
            color: '#f1c40f',  
            hoist: true,
            permissions: [
                "MUTE_MEMBERS",
                "MANAGE_MESSAGES",
                "MANAGE_NICKNAMES",
                "CREATE_INSTANT_INVITE",
                "ADD_REACTIONS",
                "CHANGE_NICKNAME",
                "VIEW_CHANNEL",
                "SEND_MESSAGES",
                "USE_EXTERNAL_EMOJIS", 
                "CONNECT",
                "SPEAK",
                "MOVE_MEMBERS",
                "READ_MESSAGE_HISTORY"
    ]
            }).then(async(denememodR) => { 
     
    
        message.guild.roles.create({
            name: `▬ Member Roles ▬`,
            color: "#2f3136", 
            hoist: true,
            permissions: "CREATE_INSTANT_INVITE"
        }).catch(e => { })
      
    
        message.guild.roles.create({
            name: `💎︲Special Member︲💎`,
            color: "#00d3ff" ,
            hoist: true,
            permissions: [
    "CREATE_INSTANT_INVITE",
    "SEND_MESSAGES",
    "READ_MESSAGE_HISTORY",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "CHANGE_NICKNAME",
    "ATTACH_FILES",
    "EMBED_LINKS",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_CHANNEL",
    "USE_VAD"
    ]
            }).then(async(özelüyeR) => { 
    
    
      message.guild.roles.create({
            hoist: true,
            name: `🎀︲Girls︲🎀`,
            color: "#ef00ff",
            permissions: [
    "CREATE_INSTANT_INVITE",
    "SEND_MESSAGES",
    "READ_MESSAGE_HISTORY",
    "CONNECT",
    "SPEAK",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_CHANNEL",
    "USE_VAD"
    ]
            }).then(async(bayanüyeR) => { 
    
             message.guild.roles.create({
            hoist: true,
            name: `🌙︲Gamers︲🌙`,
            color: "#fff000", 
            permissions: [
    "CREATE_INSTANT_INVITE",
    "SEND_MESSAGES",
    "READ_MESSAGE_HISTORY",
    "CONNECT",
    "SPEAK",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_CHANNEL",
    "USE_VAD"
    ]
            }).then(async(üyeR) => { 
    
    message.guild.roles.create({
            hoist: true,
            name: ` 🔒︲Novice Gamer︲🔒`,
            color: "#0c0c0c",
            permissions: [
    "CREATE_INSTANT_INVITE",
    "SEND_MESSAGES",
    "READ_MESSAGE_HISTORY",
    "CONNECT",
    "SPEAK",
    "USE_EXTERNAL_EMOJIS",
    "USE_VAD"
    ]
    }).then(async(kayıtsızR) => { 
    
    
     message.guild.roles.create({
            hoist: true,
            name: `▬ Bot Roles ▬`,
            color: "#2f3136",
            permissions: "CREATE_INSTANT_INVITE"
            }).catch(e => { })
    
            message.guild.roles.create({
            hoist: true,
            name: `🤖︲Bot︲🤖`,
            color: "#0c0c0c",
            permissions: [
    "CREATE_INSTANT_INVITE",
    "SEND_MESSAGES",
    "READ_MESSAGE_HISTORY",
    "USE_EXTERNAL_EMOJIS",
    "CONNECT",
    "SPEAK",
    "ATTACH_FILES",
    "EMBED_LINKS"]
            }).then(async(botR) => { 
    // Rol Oluştur
    
    setTimeout(async() => {
    // GUILD_CATEGORY Oluştur
    message.author.send("Sunucu Kurulumu Deavm Ediyor, Kanallar Olusturuluyor!").catch(e => {})
  await message.guild.channels.create(`STAFF CHANNELS`, { type: "GUILD_CATEGORY" }).then(async(yetkiliKG) => {
  await message.guild.channels.create(`REGISTER`, { type: "GUILD_CATEGORY" }).then(async(kayıtkanallarıKG) => {
  await message.guild.channels.create(`ANNOUNCEMENT`, { type: "GUILD_CATEGORY" }).then(async(duyuruKG) => {
  await message.guild.channels.create(`GENERAL`, { type: "GUILD_CATEGORY" }).then(async(genelKG) => {
  await message.guild.channels.create(`FUN CHATS`, { type: "GUILD_CATEGORY" }).then(async(eğlenceKG) => { 
  await message.guild.channels.create(`VOICE CHANNELS`, { type: "GUILD_CATEGORY" }).then(async(seskanallarıKG) => { 
    // GUILD_CATEGORY Oluştur 
    
    // Rol Değişkenleri
    let everyoneR = message.guild.roles.cache.find(x => x.name === "@everyone")
    message.guild.roles.everyone.setPermissions([
    "CREATE_INSTANT_INVITE",
    "SEND_MESSAGES",
    "READ_MESSAGE_HISTORY",
    "USE_EXTERNAL_EMOJIS",
    "CONNECT",
    "SPEAK",
    "USE_VAD"
    ]).catch(e => {})
    // Rol Değişkenleri
    
    // Kanal Oluştur
    message.guild.channels.create(`mod-log`, { type: "GUILD_TEXT", parent: yetkiliKG}).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kurucuR, {
              VIEW_CHANNEL: true
          }).catch(e => {})
    await c.permissionOverwrites.create(adminR, {
              VIEW_CHANNEL: true
          }).catch(e => {})
    await c.permissionOverwrites.create(yöneticiR, {
              VIEW_CHANNEL: true
          }).catch(e => {})
    }).catch(e => {})

    

    message.guild.channels.create(`staff-announcement`, { type: "GUILD_TEXT", parent: yetkiliKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kurucuR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(yöneticiR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(adminR, {
              VIEW_CHANNEL: true
          }).catch(e => {})
    await c.permissionOverwrites.create(moderatörR, {
              VIEW_CHANNEL: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtyetkilisiR, {
              VIEW_CHANNEL: true
          }).catch(e => {})
    await c.permissionOverwrites.create(denememodR, {
              VIEW_CHANNEL: true
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`staff-chat`, { type: "GUILD_TEXT", parent: yetkiliKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kurucuR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})

    await c.permissionOverwrites.create(yöneticiR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(adminR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(moderatörR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtyetkilisiR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(denememodR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`staff-commands`, { type: "GUILD_TEXT", parent: yetkiliKG}).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: false,
              ATTACH_FILES: true,
              EMBED_LINKS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kurucuR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    await c.permissionOverwrites.create(yöneticiR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    await c.permissionOverwrites.create(adminR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    await c.permissionOverwrites.create(moderatörR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtyetkilisiR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    await c.permissionOverwrites.create(denememodR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`📚-bilgilendirme`, { type: "GUILD_TEXT", parent: kayıtkanallarıKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtyetkilisiR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`🔐-kayıt`, { type: "GUILD_TEXT", parent: kayıtkanallarıKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: null
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: null
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtyetkilisiR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`Voice Confirmation 1`, { type: "GUILD_VOICE", parent: kayıtkanallarıKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: false,
              CONNECT: true,
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtyetkilisiR, {
              VIEW_CHANNEL: true,
              CONNECT: true, 
              MOVE_MEMBERS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`Voice Confirmation 2`, { type: "GUILD_VOICE", parent: kayıtkanallarıKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: false,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtyetkilisiR, {
              VIEW_CHANNEL: true,
              CONNECT: true, 
              MOVE_MEMBERS: true
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
          }).catch(e => {})
    }).catch(e => {})


  
    message.guild.channels.create(`✨-hoşgeldin`, { type: "GUILD_TEXT", parent: duyuruKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              SEND_MESSAGES: null,
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false,          
              SEND_MESSAGES: false,
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: false,
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`📜-kurallar`, { type: "GUILD_TEXT", parent: duyuruKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: false,
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`📢-duyurular`, { type: "GUILD_TEXT", parent: duyuruKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: false,
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`🎁-çekiliş`, { type: "GUILD_TEXT", parent: duyuruKG}).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: null,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false,          
              SEND_MESSAGES: false,
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: false,
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`🧷-güncellemeler`, { type: "GUILD_TEXT", parent: duyuruKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: null,
              SEND_MESSAGES: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false,          
              SEND_MESSAGES: false,
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: false,
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`💬-sohbet`, { type: "GUILD_TEXT", parent: genelKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`🤖-bot-komut`, { type: "GUILD_TEXT", parent: genelKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`📷-fotoğraflar`, { type: "GUILD_TEXT", parent: genelKG}).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              ATTACH_FILES: true,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: true,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: true,
              EMBED_LINKS: false
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`🎮-oyundan-kareler`, { type: "GUILD_TEXT", parent: genelKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              ATTACH_FILES: true,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: true,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: true,
              EMBED_LINKS: false
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`📝-oyuncu-bul`, { type: "GUILD_TEXT", parent: eğlenceKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`💥-oyun-önerileri`, { type: "GUILD_TEXT", parent: eğlenceKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`🎰-ekipman-önerileri`, { type: "GUILD_TEXT", parent: eğlenceKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`🎭-oyun-skinleri`, { type: "GUILD_TEXT", parent: eğlenceKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    await c.permissionOverwrites.create(üyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              VIEW_CHANNEL: true,          
              SEND_MESSAGES: null,
              ATTACH_FILES: false,
              EMBED_LINKS: false
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`🏆 ╏ BOSS`, { type: "GUILD_VOICE", parent: seskanallarıKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: null,
              CONNECT: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`🎓 ╏ YETKİLİ`, { type: "GUILD_VOICE", parent: seskanallarıKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: null,
              CONNECT: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kurucuR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(yöneticiR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(adminR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(moderatörR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtyetkilisiR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(denememodR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`💼 ╏ TOPLANTI`, { type: "GUILD_VOICE", parent: seskanallarıKG }).then(async(c) => {
    await c.permissionOverwrites.create(everyoneR, {
              VIEW_CHANNEL: null,
              CONNECT: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kurucuR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(yöneticiR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(adminR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(moderatörR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtyetkilisiR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    await c.permissionOverwrites.create(denememodR, {
              VIEW_CHANNEL: true,
              CONNECT: true
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`💭 ╏ SOHBET`, { type: "GUILD_VOICE", parent: seskanallarıKG }).then(async(c) => {
    c.permissionOverwrites.create(everyoneR, {
              CONNECT: true,
              VIEW_CHANNEL: null,
              STREAM: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    c.permissionOverwrites.create(üyeR, {
              CONNECT: true,
              VIEW_CHANNEL: null
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              CONNECT: true,
              VIEW_CHANNEL: null
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`🎮 ╏ OYUN ODASI`, { type: "GUILD_VOICE", parent: seskanallarıKG }).then(async(c) => {
    c.permissionOverwrites.create(everyoneR, {
              CONNECT: true,
              VIEW_CHANNEL: null,
              STREAM: true
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
    c.permissionOverwrites.create(üyeR, {
              CONNECT: true,
              VIEW_CHANNEL: null,
              STREAM: true
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              CONNECT: true,
              VIEW_CHANNEL: null,
              STREAM: true
          }).catch(e => {})
    }).catch(e => {})



    message.guild.channels.create(`🎮 ╏ OYUN ODASI`, { type: "GUILD_VOICE", parent: seskanallarıKG }).then(async(c) => {
        c.permissionOverwrites.create(everyoneR, {
                  CONNECT: true,
                  VIEW_CHANNEL: null,
                  STREAM: true
              }).catch(e => {})
        await c.permissionOverwrites.create(kayıtsızR, {
                  VIEW_CHANNEL: false
              }).catch(e => {})
        c.permissionOverwrites.create(üyeR, {
                  CONNECT: true,
                  VIEW_CHANNEL: null,
                  STREAM: true
              }).catch(e => {})
        await c.permissionOverwrites.create(bayanüyeR, {
                  CONNECT: true,
                  VIEW_CHANNEL: null,
                  STREAM: true
              }).catch(e => {})
        }).catch(e => {})

        

        message.guild.channels.create(`🎮 ╏ OYUN ODASI`, { type: "GUILD_VOICE", parent: seskanallarıKG }).then(async(c) => {
            c.permissionOverwrites.create(everyoneR, {
                      CONNECT: true,
                      VIEW_CHANNEL: null,
                      STREAM: true
                  }).catch(e => {})
            await c.permissionOverwrites.create(kayıtsızR, {
                      VIEW_CHANNEL: false
                  }).catch(e => {})
            c.permissionOverwrites.create(üyeR, {
                      CONNECT: true,
                      VIEW_CHANNEL: null,
                      STREAM: true
                  }).catch(e => {})
            await c.permissionOverwrites.create(bayanüyeR, {
                      CONNECT: true,
                      VIEW_CHANNEL: null,
                      STREAM: true
                  }).catch(e => {})
            }).catch(e => {})
        

    message.guild.channels.create(`🎵 ╏ MÜZİK ODASI`, { type: "GUILD_VOICE", parent: seskanallarıKG }).then(async(c) => {
    c.permissionOverwrites.create(everyoneR, {
              CONNECT: true,
              VIEW_CHANNEL: null,
              SPEAK: false
          }).catch(e => {})
    await c.permissionOverwrites.create(kayıtsızR, {
              VIEW_CHANNEL: false
          }).catch(e => {})
          c.permissionOverwrites.create(üyeR, {
              CONNECT: true,
              VIEW_CHANNEL: null,
              SPEAK: false
          }).catch(e => {})
    await c.permissionOverwrites.create(bayanüyeR, {
              CONNECT: true,
              VIEW_CHANNEL: null,
              SPEAK: false
          }).catch(e => {}) 
}).catch(e => {})



}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}, 10000)

    setTimeout(async () => {
        message.guild.members.cache.filter(m => !m.user.bot).map(m => {
        m.roles.add(kayıtsızR.id).catch(e => { })
        })
        if(message.author.id === message.guild.ownerId) {
        message.member.roles.add(kurucuR.id).catch(e => { })
        }
        message.guild.members.cache.filter(m => m.user.bot).map(m => {
        m.roles.add(botR.id).catch(e => { })
        })
        message.member.send("Sunucu Kur Tamamlandı!\nDonanımda Sorun Yaşıyorsanız Discordu Kapatın ve Yeniden Açın!").catch(e => { })
    }, 30000)

}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}).catch(e => {})
}, 5000)
button.deferUpdate();

}


if(button.customId === "iptal"){

    const row = new MessageActionRow().addComponents(
         new MessageButton()
            .setCustomId('iptal')
            .setLabel('İptal Et')
            .setDisabled(true)
            .setStyle('DANGER'))

const embed = new MessageEmbed()
.setColor("RED")
.setTitle("Sunucu Kurulumu İptal Edildi!")
.setTimestamp()
return mesaj.edit({ embeds: [embed], components: [row] })
button.deferUpdate();
}


})
}).catch(e => {})
}
exports.conf = {
    aliases: ['sunucukur', 'kur']
}

exports.help = {
    name: 'sunucu-kur',
    description: 'Sunucu kurmanıza yarar.',
    usage: 'sunucu-kur',
    category: 'moderasyon'
}
    
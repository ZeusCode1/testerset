const {
  MessageEmbed,
  MessageButton,
  MessageSelectMenu,
  MessageActionRow,
  Permissions,
} = require("discord.js");
const db = require("orio.db");

exports.run = async (bot, message, args) => {
  const prefix = bot.db.get(`prefix_${message.guild.id}`) || bot.ayarlar.prefix;
    

  const backId = "davetTopBack";
  const forwardId = "davetTopForward";
  const closeBackId = "davetTopCloseBack";
  const closeForwardId = "davetTopCloseForward";
  const deleteButtonId = "deleteButton";

  const backButton = new MessageButton({
    style: "PRIMARY",
    customId: backId,
  });
  const forwardButton = new MessageButton({
    style: "PRIMARY",
    customId: forwardId,
  });

  const closeBackButton = new MessageButton({
    style: "PRIMARY",
    customId: closeBackId,
    disabled: true,
  });
  const closeForwardButton = new MessageButton({
    style: "PRIMARY",
    customId: closeForwardId,
    disabled: true,
  });

  const deleteButton = new MessageButton({
    style: "DANGER",
    customId: deleteButtonId,
  });

  const davets = [
    ...(await message.guild.members.cache
      .filter((x) => db.get(`inviteNumber_${x.user.id}_${message.guild.id}`))
      .values()),
  ];

  if (!davets.join(" "))
    return message
      .reply({
        content: `> ❌ **Başarısız!** Kimsenin bu sunucuda davet verisi yok.`,
        allowedMentions: { repliedUser: false },
      })
      .catch((err) => {});

  let kaçtane = 5;
  let page = 1;

  let a = davets.length / kaçtane;
  let toplam = Math.ceil(a);

  const generateEmbed = async (start) => {
    const current = await davets
      .slice(start, start + kaçtane)
      .filter((x) => db.get(`inviteNumber_${x.user.id}_${message.guild.id}`) || 0 > 0)
      .sort((a, b) => (Number(db.get(`inviteNumber_${b.user.id}_${message.guild.id}`)) || 0) - (Number(db.get(`inviteNumber_${a.user.id}_${message.guild.id}`)) || 0));

    let sayı = page === 1 ? 1 : page * kaçtane - kaçtane + 1;

    return new MessageEmbed()
      .setTitle(`Davet Sıralaması`)
      .setFooter({ text: `Sayfa ${page} / ${toplam}` })
      .setDescription(`> Bu sunucuda toplam **${davets.length}** kişinin sıralama bilgisi var.`)
      .addField("Sıralama ↷", (
          await Promise.all(
            current.map(async (x) => {
              let inviteData = db.get(`inviteNumber_${x.id}_${message.guild.id}`);
              let regularData = db.get(`regularNumber_${x.id}_${message.guild.id}`);
              let bonusData = db.get(`bonusNumber_${x.id}_${message.guild.id}`);
              let fakeData = db.get(`fakeNumber_${x.id}_${message.guild.id}`);
              let leaveData = db.get(`leaveNumber_${x.id}_${message.guild.id}`);

              return `> **${sayı++}.** ${
                bot.users.cache.get(x.id)
                  ? `<@!${bot.users.cache.get(x.id).id}>`
                  : `<@!${x.id}>`
              } ↷
            **${inviteData ? inviteData || 0 : 0} ** Invites ( **${
                regularData ? regularData || 0 : 0
              }** Regular, **${bonusData ? bonusData || 0 : 0}** Bonus, **${
                fakeData ? fakeData : 0
              }** Fake, **${leaveData ? leaveData || 0 : 0}** Leave)`;
            })
          )
        )
          .join("\n\n")
          .toString()
      )
      .setColor("BLUE");
  };

  const canFitOnOnePage = davets.length <= kaçtane;
  const embedMessage = await message.channel
    .send({
      content: `Invite Top`,
      embeds: [await generateEmbed(0)],
      components: canFitOnOnePage
        ? [
            new MessageActionRow({
              components: [closeBackButton, deleteButton, closeForwardButton],
            }),
          ]
        : [
            new MessageActionRow({
              components: [closeBackButton, deleteButton, forwardButton],
            }),
          ],
    })
    .catch((e) => {});

  if (canFitOnOnePage) return;

  const collector = embedMessage.createMessageComponentCollector({
    filter: ({ user }) => user.id === message.author.id,
    time: 600000,
  });

  let currentIndex = 0;
  collector.on("collect", async (interaction) => {
    if (interaction.customId === deleteButtonId)
      return interaction.message.delete();
    if (interaction.customId === backId) {
      page--;
    }
    if (interaction.customId === forwardId) {
      page++;
    }

    interaction.customId === backId
      ? (currentIndex -= kaçtane)
      : (currentIndex += kaçtane);

    await interaction
      .update({
        content: `Invite Top`,
        embeds: [await generateEmbed(currentIndex)],
        components: [
          new MessageActionRow({
            components: [
              ...(currentIndex ? [backButton] : [closeBackButton]),
              deleteButton,
              ...(currentIndex + kaçtane < davets.length
                ? [forwardButton]
                : [closeForwardButton]),
            ],
          }),
        ],
      })
      .catch((e) => {});
  });
};
exports.conf = {
  aliases: ["davettop", "davet-sıramala", "invite-top", "davetsıralama", "top"],
};

exports.help = {
  name: "davet-top",
  description: "Davet sıralamasını gösterir.",
  usage: "davet-top",
  category: "invite"
};

const { MessageEmbed } = require("discord.js");
exports.run = async (client, message, args) => {
if (!message.member.permissions.has("MANAGE_NICKNAMES")) return message.reply("Bu komutu kullanabilmek için `İsimleri Yönet` yetkisine sahip olmalısın!").catch(e => {});

let tag = args.slice(0).join(" ");
if (!tag) return message.reply("Bir Tag Yazmalısın!").catch(e => {});

 
let sayi = 0
message.reply(`Tag alma işlemi başlıyor...`).then(async msg => {
message.guild.members.cache.map(async cs => {
    sayi = sayi + 1
    setTimeout(async () => {
        if(!cs.displayName.includes(tag)) return
        await cs.setNickname(`${cs.displayName.replace(tag, "")}`).then(async mr => {
            return msg.edit(`**${sayi}.** Son Tag Alınan: **${cs.user.tag}**`).catch(e => {})
        }).catch(e => {
            return msg.edit("Tag alma işlemi başarısız oldu! ("+cs.user.tag+")").catch(e => {});
        });
        if(sayi == message.guild.memberCount) return msg.edit("Tag alma işlemi sonlandı. Toplam tagı alınan üye sayısı: "+sayi).catch(e => {});
    }, 3000)
  })
}).catch(e => {});
};
exports.conf = {
  aliases: []
}

exports.help = {
  name: "herkesten-tag-al",
  description: "Tag alır.",
  usage: "herkesten-tag-al <tag>",
  category: "moderasyon"
}

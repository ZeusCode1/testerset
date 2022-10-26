const { MessageEmbed } = require("discord.js");
exports.run = async (client, message, args) => {
if (!message.member.permissions.has("MANAGE_NICKNAMES")) return message.reply("Bu komutu kullanabilmek için `İsimleri Yönet` yetkisine sahip olmalısın!").catch(e => {});

let tag = args.slice(0).join(" ");
if (!tag) return message.reply("Bir Tag Yazmalısın!").catch(e => {});

 
let sayi = 1
message.reply(`Tag verme işlemi başlıyor...`).then(async msg => {
message.guild.members.cache.map(async cs => {
    sayi = sayi + 1
    setTimeout(async () => {
        if(cs.displayName.includes(tag)) return
        await cs.setNickname(`${tag} | ${cs.displayName}`).then(async mr => {
            return msg.edit(`**${sayi}.** Son Tag Verilen: **${cs.user.tag}**`).catch(e => {});
        }).catch(e => {
            return msg.edit("Tag verme işlemi başarısız oldu! ("+cs.user.tag+")").catch(e => {});
        });
    }, 3000)
    if(sayi == message.guild.memberCount) return msg.edit("Tag verme işlemi sonlandı. Toplam tag verilen üye sayısı: "+sayi).catch(e => {});
  })
}).catch(e => {});
};
exports.conf = {
  aliases: []
}

exports.help = {
  name: "herkese-tag-ver",
  description: "Tag verir.",
  usage: "herkese-tag-ver <tag>",
  category: "moderasyon"
}

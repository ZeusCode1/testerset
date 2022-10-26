const client = require("../index");
client.on("ready", async () => {
    console.log(`${client.user.tag} İsmi İle Bot Aktif!`)
    let mesajlar = [
        `Bot Prefixi ${client.ayarlar.prefix}`,
          `${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} Toplam Kullanıcı`,
          `${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} Toplam Sunucu`,
          `${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} Toplam Kanal`,
          `${client.ayarlar.prefix}yardım Bilgi Al!`,
          `Lourity`
          ];
    setInterval(() => {
        const mesaj = mesajlar[Math.floor(Math.random() * mesajlar.length)];
    
        client.user.setPresence({ 
            activities: [{ 
              name: mesaj,
              type: "WATCHING"
      }], 
      status: 'online' });
      }, 30000);   //1000= 1 saniye - 30000=30 saniye

      const mesaj = mesajlar[Math.floor(Math.random() * mesajlar.length)];
    
      client.user.setPresence({ 
          activities: [{ 
            name: mesaj,
            type: "WATCHING"
    }], 
    status: 'online' });

});

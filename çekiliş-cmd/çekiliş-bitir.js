const ms = require('ms');

module.exports = {

    description: 'Çekilişi bitirir!',
    name: 'çekiliş-bitir',

    options: [
        {
            name: 'çekiliş',
            description: 'Çekilişi bitirir (mesaj ID veya çekiliş ödülü)',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        // If the member doesn't have enough permissions
        if(!interaction.member.permissions.has('MANAGE_GUILD')){
            return interaction.reply({
                content: ':x: Bu komutu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın.',
                ephemeral: true
            });
        }

        const query = interaction.options.getString('çekiliş');

        // try to found the giveaway with prize then with ID
        const giveaway = 
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            // Search with giveaway ID
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

        // If no giveaway was found
        if (!giveaway) {
            return interaction.reply({
                content: 'Belirtilen mesaj-id için bir çekiliş zaten yok: `'+ query + '`.',
                ephemeral: true
            });
        }

        if (giveaway.ended) {
            return interaction.reply({
                content: 'Çekiliş zaten bitmiş.',
                ephemeral: true
            });
        }

        // Edit the giveaway
        client.giveawaysManager.end(giveaway.messageId)
        // Success message
        .then(() => {
            // Success message
            interaction.reply('Çekiliş başarıyla bitirildi!');
        })
        .catch((e) => {
            interaction.reply({
                content: e,
                ephemeral: true
            });
        });

    }
};

const client = require("../index");
module.exports = (client, interaction) => {

    if (!interaction.isCommand()) return;

    const command = client.commandss.get(interaction.commandName);

    if (!command) return void interaction.reply({
        content: `Command \`${interaction.commandName}\` not found.`,
        ephemeral: true
    });
  
    command.run(client, interaction);
};
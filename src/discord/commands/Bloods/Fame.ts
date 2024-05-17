import { Command } from "#base";
import { CommandTimer } from "#classes";
import { database } from "#database";
import { embedFame } from "#functions";
import { ApplicationCommandOptionType, ApplicationCommandType, time } from "discord.js";

new Command({
    name: "fama",
    description: "De um ponto de fama para o seu ídolo",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            description: "Menção ou ID do usuário",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
    ],
    async run(interaction) {
        const userId = interaction.user.id;
        const userReceiverFameId = interaction.options.getUser("usuário", true).id;

        if (interaction.options.getUser("usuário", true).bot)
            return await interaction.reply({ content: "Você não pode dar fama a um bot", ephemeral: true });

        if (userId == userReceiverFameId) return await interaction.reply({ content: "Você não pode dar fama a si mesmo", ephemeral: true });

        const commandCooldown = new CommandTimer(userId, "Fame");

        commandCooldown.setTimer(86400);

        if (await commandCooldown.verifyTimer())
            return await interaction.reply({
                content: `Você poderá usar esse comando novamente ${time(await commandCooldown.getTimer(), "R")}`,
                ephemeral: true,
            });

        await database.memberProfile.add(`${userReceiverFameId}.fame`, 1);

        return await interaction.reply({ embeds: [embedFame(userId, userReceiverFameId)] });
    },
});

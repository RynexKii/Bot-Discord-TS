import { Command } from "#base";
import { CommandTimer } from "#classes";
import { database } from "#database";
import { contentChannelSendCommand, contentFameBot, contentFameYourself, cooldownMessage, embedFameSend } from "#functions";
import { channelSendCommandsId } from "#tools";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

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

        // Verifica se o canal que foi executado o comando é o mesmo que está no sendCommandsChannel
        if (interaction.channelId !== channelSendCommandsId)
            return await interaction.reply({ content: contentChannelSendCommand(channelSendCommandsId), ephemeral: true });
        // ---

        // Verifica se o usuário que enviou não está enviando para um bot
        if (interaction.options.getUser("usuário", true).bot) return await interaction.reply({ content: contentFameBot(userReceiverFameId), ephemeral: true });

        // Verifica se o usuário que enviou não está enviando para ele mesmo
        if (userId == userReceiverFameId) return await interaction.reply({ content: contentFameYourself, ephemeral: true });

        // Colocando cooldown no comando de 24 horas (86400 segundos)
        const cooldownCommand = new CommandTimer(userId, "Fame");

        cooldownCommand.setTimer(86400);

        if (await cooldownCommand.verifyTimer()) return await interaction.reply(cooldownMessage(await cooldownCommand.getTimer()));
        // ---

        await database.memberProfile.add(`${userReceiverFameId}.fame`, 1);

        return await interaction.reply({ embeds: [embedFameSend(userId, userReceiverFameId)] });
    },
});

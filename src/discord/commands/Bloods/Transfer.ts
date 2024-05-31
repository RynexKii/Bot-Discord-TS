import { Command } from "#base";
import { CommandCooldown } from "#classes";
import { database } from "#database";
import { contentChannelSendCommand, cooldownMessage, transferBloods, transferBloodsForBot, transferBloodsForYou, transferBloodsLow } from "#messages";
import { channelSendCommandsId } from "#tools";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

new Command({
    name: "transferir",
    description: "❰ Economia ❱ Transfira Bloods para outro usuário (Taxa 10%)",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            description: "Menção ou ID do usuário",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "valor",
            description: "Insira a quantidade de Bloods que deseja transferir",
            type: ApplicationCommandOptionType.Number,
            minValue: 10,
            maxValue: 1000,
            required: true,
        },
    ],
    async run(interaction) {
        const userId = interaction.user.id;
        const userReceiverId = interaction.options.getUser("usuário", true).id;
        const valueTransfer = interaction.options.getNumber("valor", true);
        const valueTransferMoreHate = Math.round(valueTransfer * 0.1);
        const userBloodsDB = await database.profile.getBloods(userId);

        // Verifica se o canal que foi executado o comando é o mesmo que está no sendCommandsChannel
        if (interaction.channelId !== channelSendCommandsId)
            return await interaction.reply({ content: contentChannelSendCommand(channelSendCommandsId), ephemeral: true });
        // ---

        // Verifica se o usuário que vai receber é um bot
        if (interaction.options.getUser("usuário", true).bot) return await interaction.reply({ content: transferBloodsForBot, ephemeral: true });

        // Verifica se o usuário que vai receber é o proprio usuário que transferiu
        if (userId == userReceiverId) return await interaction.reply({ content: transferBloodsForYou, ephemeral: true });

        // Colocando cooldown no comando de 30 segundos
        const cooldownCommand = new CommandCooldown(userId, "Transfer");

        cooldownCommand.setTimer(30);

        if (await cooldownCommand.verifyTimer()) return await interaction.reply(cooldownMessage(await cooldownCommand.getTimer()));
        // ---

        // Verifica se possui Bloods para transferir
        if (valueTransfer > userBloodsDB) return await interaction.reply({ content: transferBloodsLow, ephemeral: true });

        await database.profile.subBloods(userId, valueTransfer);
        await database.profile.addBloods(userReceiverId, valueTransfer - valueTransferMoreHate);

        return await interaction.reply({ embeds: [transferBloods(userId, userReceiverId, valueTransfer, valueTransferMoreHate)] });
    },
});

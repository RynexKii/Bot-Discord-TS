import { Command } from "#base";
import { CommandTimer } from "#classes";
import { database } from "#database";
import { contentChannelSendCommand, cooldownMessage, transferBloods, transferBloodsForBot, transferBloodsForYou, transferBloodsLow } from "#messages";
import { channelSendCommandsId } from "#tools";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

new Command({
    name: "transferir",
    description: "❰ Economia ❱ Transfira Bloods para outro usuário",
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
            minValue: 20,
            maxValue: 1500,
            required: true,
        },
    ],
    async run(interaction) {
        const userId = interaction.user.id;

        // Verifica se o canal que foi executado o comando é o mesmo que está no sendCommandsChannel
        if (interaction.channelId !== channelSendCommandsId)
            return await interaction.reply({ content: contentChannelSendCommand(channelSendCommandsId), ephemeral: true });
        // ---

        // Colocando cooldown no comando de 30 segundos
        const cooldownCommand = new CommandTimer(userId, "Transfer");

        cooldownCommand.setTimer(30);

        if (await cooldownCommand.verifyTimer()) return await interaction.reply(cooldownMessage(await cooldownCommand.getTimer()));
        // ---

        const userReceiverId = interaction.options.getUser("usuário", true).id;
        const valueTransfer = interaction.options.getNumber("valor", true);
        const userBloodsDB = await database.memberBloods.get<number>(`${userId}.bloods`);

        // Verifica se o usuário que vai receber é um bot
        if (interaction.options.getUser("usuário", true).bot) return await interaction.reply({ content: transferBloodsForBot, ephemeral: true });

        // Verifica se o usuário que vai receber é o proprio usuário que transferiu
        if (userId == userReceiverId) return await interaction.reply({ content: transferBloodsForYou, ephemeral: true });

        // Verifica se possui Bloods para transferir
        if (!userBloodsDB || valueTransfer > userBloodsDB) return await interaction.reply({ content: transferBloodsLow, ephemeral: true });

        await database.memberBloods.sub(`${userId}.bloods`, valueTransfer);
        await database.memberBloods.add(`${userReceiverId}.bloods`, valueTransfer);

        return await interaction.reply({ embeds: [transferBloods(userId, userReceiverId, valueTransfer)] });
    },
});

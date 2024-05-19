import { Command } from "#base";
import { CommandTimer } from "#classes";
import { database } from "#database";
import { transferBloods, transferBloodsForBot, transferBloodsForYou, transferBloodsLow } from "#functions";
import { ApplicationCommandOptionType, ApplicationCommandType, time } from "discord.js";

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
            maxValue: 1000,
            required: true,
        },
    ],
    async run(interaction) {
        const userId = interaction.user.id;

        const commandCooldown = new CommandTimer(userId, "Transfer");

        commandCooldown.setTimer(30);

        if (await commandCooldown.verifyTimer())
            return await interaction.reply({
                content: `Você poderá usar esse comando novamente ${time(await commandCooldown.getTimer(), "R")}`,
                ephemeral: true,
            });

        //? TROCAR
        const sendCommandsChannel = "CHANNELID"; //? ID do canal que o comando poderá ser enviado

        // Verifica se o canal que foi executado o comando é o mesmo que está no sendCommandsChannel
        if (interaction.channelId !== sendCommandsChannel)
            return await interaction.reply({
                content: `Por favor, utilize apenas o canal <#${sendCommandsChannel}> para enviar este comando!`,
                ephemeral: true,
            });

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

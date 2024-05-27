import { Command } from "#base";
import { CommandTimer } from "#classes";
import { database } from "#database";
import {
    coinflipMessage,
    coinflipSameUser,
    coinflipUserBot,
    coinflipUserLowBloods,
    coinflipUserReceivedLowBloods,
    contentChannelSendCommand,
    cooldownMessage,
} from "#messages";
import { channelSendCommandsId } from "#tools";
import { createRow } from "@magicyan/discord";
import { ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle } from "discord.js";

new Command({
    name: "coinflip",
    description: "❰ Diversão ❱ Aposte Bloods em um cara ou coroa contra outro usuário.",
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
            name: "lado",
            description: "Selecione o lado que você deseja",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "cara",
                    value: "coinflipCara",
                },
                {
                    name: "coroa",
                    value: "coinflipCoroa",
                },
            ],
        },
        {
            name: "valor",
            description: "Insira a quantidade de Bloods que deseja apostar",
            type: ApplicationCommandOptionType.Number,
            minValue: 20,
            maxValue: 1000,
            required: true,
        },
    ],

    async run(interaction) {
        const userId = interaction.user.id;
        const userReceivedId = interaction.options.getUser("usuário", true).id;
        const valueBet = interaction.options.getNumber("valor", true);
        const sideBet = interaction.options.getString("lado", true);

        const valueRate = Math.round(valueBet * 0.05);

        const bloodsUserDB = await database.memberBloods.get<number>(`${userId}.bloods`);
        const bloodsUserReceivedDB = await database.memberBloods.get<number>(`${userReceivedId}.bloods`);

        // Verifica se o canal que foi executado o comando é o mesmo que está no sendCommandsChannel
        if (interaction.channelId !== channelSendCommandsId)
            return await interaction.reply({ content: contentChannelSendCommand(channelSendCommandsId), ephemeral: true });
        // ---

        // Verifica se o usuário que enviou não está tentando apostar contra ele mesmo
        if (userId == userReceivedId) return await interaction.reply({ content: coinflipSameUser, ephemeral: true });

        // Verifica se o usuário que enviou não está tentando apostar contra um bot
        if (interaction.options.getUser("usuário", true).bot) return await interaction.reply({ content: coinflipUserBot, ephemeral: true });

        // Verifica se o usuário que enviou a aposta tem Bloods
        if (!bloodsUserDB || valueBet > bloodsUserDB) return await interaction.reply({ content: coinflipUserLowBloods, ephemeral: true });

        // Verifica se quem vai receber a aposta tem Bloods
        if (!bloodsUserReceivedDB || valueBet > bloodsUserReceivedDB)
            return await interaction.reply({ content: coinflipUserReceivedLowBloods(userReceivedId), ephemeral: true });

        // Colocando cooldown no comando de 20 segundos
        const cooldownCommand = new CommandTimer(userId, "Coinflip");

        cooldownCommand.setTimer(20);

        if (await cooldownCommand.verifyTimer()) return await interaction.reply(cooldownMessage(await cooldownCommand.getTimer()));
        // ---

        const betButtons = createRow(
            new ButtonBuilder({
                customId: "button/coinflip/accept",
                label: "Aceitar",
                style: ButtonStyle.Success,
                emoji: "<:aceitar:1242630383217020939>",
            }),
            new ButtonBuilder({
                customId: "button/coinflip/cancel",
                label: "Cancelar",
                style: ButtonStyle.Secondary,
                emoji: "<:cancelar:1239753868989173831>",
            })
        );

        // Envia a mensagem e armazena ela pra poder pegar o ID
        const messageCoinflip = await interaction.reply({ content: coinflipMessage(userId, userReceivedId, sideBet, valueBet, valueRate), components: [betButtons] });

        // Pega o ID da mensagem enviada
        const messageCoinflipId = (await messageCoinflip.fetch()).id;

        // Armazena no Banco de Dados o ID da mensagem, Lado que foi escolhido e o Valor da aposta
        return await database.coinflip.set(messageCoinflipId, {
            userSendId: userId,
            userReceivedId: userReceivedId,
            side: sideBet,
            value: valueBet,
        });
    },
});

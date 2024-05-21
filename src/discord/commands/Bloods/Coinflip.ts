import { Command } from "#base";
import { CommandTimer } from "#classes";
import { database } from "#database";
import { coinflipLowBloods, coinflipMessage, contentChannelSendCommand, cooldownMessage } from "#functions";
import { channelSendCommandsId } from "#tools";
import { createRow } from "@magicyan/discord";
import { ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle } from "discord.js";

new Command({
    name: "coinflip",
    description: "❰ Economia ❱ Aposte Bloods em um Cara ou Coroa.",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    options: [
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
            maxValue: 500,
            required: true,
        },
    ],

    async run(interaction) {
        const userId = interaction.user.id;

        // Verifica se o canal que foi executado o comando é o mesmo que está no sendCommandsChannel
        if (interaction.channelId !== channelSendCommandsId)
            return await interaction.reply({ content: contentChannelSendCommand(channelSendCommandsId), ephemeral: true });
        // ---

        // Colocando cooldown no comando de 1 minuto
        const cooldownCommand = new CommandTimer(userId, "Coinflip");

        cooldownCommand.setTimer(30);

        if (await cooldownCommand.verifyTimer()) return await interaction.reply(cooldownMessage(await cooldownCommand.getTimer()));
        // ---

        const valueBet = interaction.options.getNumber("valor", true);
        const sideBet = interaction.options.getString("lado", true);
        const bloodsUserDB = await database.memberBloods.get<number>(`${userId}.bloods`);

        let side = "Cara";
        let emojiButton = "<:cara:1239758569482752011>";

        if (sideBet === "coinflipCoroa") {
            side = "Coroa";
            emojiButton = "<:coroa:1239758080149946458>";
        }

        // Verifica se o usuário tem Bloods
        if (!bloodsUserDB || valueBet > bloodsUserDB) return await interaction.reply({ content: coinflipLowBloods(userId), ephemeral: true });

        const betButtons = createRow(
            new ButtonBuilder({
                customId: "button/coinflip/confirm",
                label: "Jogar moeda",
                style: ButtonStyle.Success,
                emoji: emojiButton,
            }),
            new ButtonBuilder({
                customId: "button/coinflip/cancel",
                label: "Cancelar",
                style: ButtonStyle.Secondary,
                emoji: "<:cancelar:1239753868989173831>",
            })
        );

        // Envia a mensagem e armazena ela pra poder pegar o ID
        const msg = await interaction.reply({ content: coinflipMessage(userId, side, valueBet), components: [betButtons] });

        // Pega o ID da mensagem enviada
        const msgId = (await msg.fetch()).id;

        // Armazena no Banco de Dados o ID da mensagem, Lado que foi escolhido e o Valor da aposta
        await database.coinflip.set(userId, {
            MessageId: msgId,
            Side: sideBet,
            Value: valueBet,
        });
        return;
    },
});

import { Component } from "#base";
import { database } from "#database";
import { coinflipLowBloods, coinflipNotUserBet, coinflipWinMessage } from "#messages";
import { createRow, randomNumber } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, ComponentType, userMention } from "discord.js";

//* Botão de Aceitar
new Component({
    customId: "button/coinflip/accept",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        const messageId = interaction.message.id;
        const getBetDB = await database.profile.getCoinflip(messageId);

        const cancelDisabled = createRow(
            new ButtonBuilder({
                customId: "cancelDisabled",
                label: "[Error] Aposta Cancelada",
                style: ButtonStyle.Secondary,
                emoji: "<:cancelar:1239753868989173831>",
                disabled: true,
            })
        );

        // Cancela a aposta caso não exista mais no Banco de Dados
        if (!getBetDB) return interaction.message.edit({ components: [cancelDisabled] });

        if (interaction.user.id !== getBetDB.userReceivedId)
            return await interaction.reply({
                content: `<:Cheryl:1241523161795661854> Somente ${userMention(getBetDB.userReceivedId)} pode aceitar essa aposta!`,
                ephemeral: true,
            });

        const getBloodsSendUser = await database.profile.getBloods(getBetDB.userSendId);
        const getBloodsReceivedUser = await database.profile.getBloods(getBetDB.userReceivedId);

        // Verifica se os 2 usuários ainda possui Bloods para a aposta
        if (getBloodsSendUser < getBetDB.value || getBloodsReceivedUser < getBetDB.value) {
            await interaction.message.edit({ components: [cancelDisabled] });
            return await interaction.reply({ content: coinflipLowBloods, ephemeral: true });
        }

        const betAcceptedButton = createRow(
            new ButtonBuilder({
                customId: "button/coinflip/accepted",
                label: "Aposta Aceita",
                style: ButtonStyle.Secondary,
                emoji: "🤝",
                disabled: true,
            })
        );

        await interaction.update({ components: [betAcceptedButton] });

        let randomSide: string;
        let emojiCoinflip: string;

        if (randomNumber(1, 2) === 1) {
            randomSide = "Cara";
            emojiCoinflip = "<:cara:1239758569482752011>";
        } else {
            randomSide = "Coroa";
            emojiCoinflip = "<:coroa:1239758080149946458>";
        }

        if (getBetDB.side === `coinflip${randomSide}`) {
            const valueRate = Math.round(getBetDB.value * 0.05);

            await database.profile.addBloods(getBetDB.userSendId, getBetDB.value - valueRate);

            await database.profile.subBloods(getBetDB.userReceivedId, getBetDB.value);

            await interaction.message.reply({
                content: coinflipWinMessage(getBetDB.userSendId, getBetDB.userReceivedId, emojiCoinflip, randomSide, getBetDB.value, valueRate),
            });

            await database.profile.pullCoinflip(messageId);
        } else {
            const valueRate = Math.round(getBetDB.value * 0.05);

            await database.profile.addBloods(getBetDB.userReceivedId, getBetDB.value - valueRate);

            await database.profile.subBloods(getBetDB.userSendId, getBetDB.value);

            await interaction.message.reply({
                content: coinflipWinMessage(getBetDB.userReceivedId, getBetDB.userSendId, emojiCoinflip, randomSide, getBetDB.value, valueRate),
            });

            await database.profile.pullCoinflip(messageId);
        }
        return;
    },
});

//* Botão de Cancelar
new Component({
    customId: "button/coinflip/cancel",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        const userId = interaction.user.id;
        const messageId = interaction.message.id;
        const getBetDB = await database.profile.getCoinflip(messageId);

        // Verifica se o usuário que interagiu com o botão é o mesmo que está participando da aposta
        if (userId !== getBetDB?.userSendId && userId !== getBetDB?.userReceivedId) return await interaction.reply({ content: coinflipNotUserBet, ephemeral: true });

        const cancelDisabled = createRow(
            new ButtonBuilder({
                customId: "cancelDisabled",
                label: "Aposta Cancelada",
                style: ButtonStyle.Secondary,
                emoji: "<:cancelar:1239753868989173831>",
                disabled: true,
            })
        );

        await database.profile.pullCoinflip(messageId);

        return await interaction.update({ components: [cancelDisabled] });
    },
});

import { Component } from "#base";
import { database } from "#database";
import {
    coinflipCancel,
    coinflipCancelError,
    coinflipLossMessage,
    coinflipLowBloods,
    coinflipPlayingMessage,
    coinflipWinMessage,
    contentNotInteractCommand,
} from "#functions";
import { createRow, randomNumber } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";

//* Botão de Confirmar
new Component({
    customId: "button/coinflip/confirm",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        if (interaction.message.interaction?.user.id !== interaction.user.id)
            return await interaction.reply({ content: contentNotInteractCommand, ephemeral: true });

        const userId = interaction.user.id;
        const bloodsUserDB = await database.memberBloods.get<number>(`${userId}.bloods`);
        const betUserDB = await database.coinflip.get(userId);
        let randomSide: string;

        const cancelDisabled = createRow(
            new ButtonBuilder({
                customId: "cancelDisabled",
                label: "Aposta Cancelada",
                style: ButtonStyle.Secondary,
                emoji: "<:cancelar:1239753868989173831>",
                disabled: true,
            })
        );

        if (!betUserDB?.Value || !bloodsUserDB || betUserDB?.Value > bloodsUserDB)
            return await interaction.update({ content: coinflipLowBloods(userId), components: [cancelDisabled] });

        if (betUserDB?.MessageId !== interaction.message.id)
            return await interaction.update({ content: coinflipCancelError(userId), components: [cancelDisabled] });

        await interaction.update({ content: coinflipPlayingMessage(userId), components: [] });

        setTimeout(() => {
            if (randomNumber(1, 2) === 1) {
                randomSide = "Cara";
            } else {
                randomSide = "Coroa";
            }

            if (betUserDB.Side === `coinflip${randomSide}`) {
                database.memberBloods.add(`${userId}.bloods`, betUserDB.Value);

                return interaction.message.edit({ content: coinflipWinMessage(userId, randomSide, betUserDB.Value) });
            }

            database.memberBloods.sub(`${userId}.bloods`, betUserDB.Value);

            return interaction.message.edit({ content: coinflipLossMessage(userId, randomSide, betUserDB.Side) });
        }, 2000);

        return;
    },
});

//* Botão de Cancelar
new Component({
    customId: "button/coinflip/cancel",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        if (interaction.message.interaction?.user.id !== interaction.user.id)
            return await interaction.reply({ content: contentNotInteractCommand, ephemeral: true });

        const userId = interaction.user.id;

        const cancelDisabled = createRow(
            new ButtonBuilder({
                customId: "cancelDisabled",
                label: "Aposta Cancelada",
                style: ButtonStyle.Secondary,
                emoji: "<:cancelar:1239753868989173831>",
                disabled: true,
            })
        );

        return await interaction.update({ content: coinflipCancel(userId), components: [cancelDisabled] });
    },
});

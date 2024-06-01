import { Component } from "#base";
import { database } from "#database";
import { contentNotInteractCommand, embedWalletRank } from "#messages";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, ComponentType, inlineCode, userMention } from "discord.js";

// Botão para acessar o Top Rank
new Component({
    customId: "button/bloods/wallet/ranks",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        // Verifica se o usuário que está interagindo com o botão é o mesmo que enviou a mensagem
        if (interaction.user.id !== interaction.message.interaction?.user.id) return await interaction.reply({ content: contentNotInteractCommand, ephemeral: true });

        const rowButton = createRow(
            new ButtonBuilder({
                customId: "button/bloods/wallet/home",
                label: "Inicio",
                style: ButtonStyle.Secondary,
                emoji: "<:home:1224341744531804210>",
            })
        );

        const userId = interaction.user.id;
        const getAllUsersRankDB = await database.profile.find().sort({ bloodsRank: 1 });
        const getFirstFiveUsers = getAllUsersRankDB?.slice(0, 10);
        let textRank = "";

        getFirstFiveUsers.forEach((user) => {
            textRank += `${user.bloodsRank}º <@${user.userId}> ` + inlineCode(`ﾠ${user.bloods} Bloods 🩸\n`);
        });

        return await interaction.update({ content: userMention(userId), embeds: [embedWalletRank(textRank)], components: [rowButton] });
    },
});

import { Modal } from "#base";
import { database } from "#database";
import { embedWallet } from "#messages";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";

new Modal({
    customId: "modal/bloods/wallet/aboutme",
    cache: "cached",
    async run(interaction) {
        const userId = interaction.user.id;
        const modalValueAbountMe = interaction.fields.getTextInputValue("aboutMe");
        const userName = interaction.user.displayName;
        const userIcon = interaction.user.displayAvatarURL();
        const userBloodsDB = await database.profile.getBloods(userId);
        const userFameDB = await database.profile.getFame(userId);
        const userRankDB = await database.profile.getRank(userId);
        const allUsersRanksDB = (await database.profile.find()).length;

        // Adicionando o sobre mim no Banco de Dados
        await database.profile.setAbout(userId, modalValueAbountMe);

        const rowButton = createRow(
            new ButtonBuilder({
                customId: "button/bloods/wallet/home",
                label: "Atualizar",
                style: ButtonStyle.Success,
                emoji: "<:refresh:1228505777837178900>",
            }),

            new ButtonBuilder({
                customId: "button/bloods/wallet/aboutme",
                label: "Sobre Mim",
                style: ButtonStyle.Secondary,
                emoji: "<:sobre:1240774961493184542>",
            }),

            new ButtonBuilder({
                customId: "button/bloods/wallet/shop",
                label: "Loja",
                style: ButtonStyle.Secondary,
                emoji: "<:shop:1226234464389173388>",
            }),

            new ButtonBuilder({
                customId: "button/bloods/wallet/ranks",
                label: "Ranks",
                style: ButtonStyle.Secondary,
                emoji: "<:rank:1242560092281245746>",
            })
        );

        await interaction.deferUpdate();

        await interaction.editReply({
            embeds: [embedWallet(userName, userIcon, userBloodsDB, modalValueAbountMe, userFameDB, userRankDB, allUsersRanksDB)],
            components: [rowButton],
        });
    },
});

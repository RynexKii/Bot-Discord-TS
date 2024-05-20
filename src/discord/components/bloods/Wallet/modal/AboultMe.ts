import { Modal } from "#base";
import { database } from "#database";
import { embedWallet } from "#functions";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";

new Modal({
    customId: "modal/bloods/wallet/aboutme",
    cache: "cached",
    async run(interaction) {
        const userId = interaction.user.id;
        const { fields } = interaction;
        const modalValueAbountMe = fields.getTextInputValue("aboutMe");
        const userName = interaction.user.displayName;
        const userIcon = interaction.user.avatarURL();
        const userBloods = await database.memberBloods.get(`${userId}.bloods`);
        const userFame = await database.memberProfile.get<number>(`${userId}.fame`);
        const GetUserRank = await database.memberBloodsRank.get<any[]>("MembersRank");

        await database.memberProfile.set(`${userId}.aboutMe`, modalValueAbountMe);

        let userRank = null;

        GetUserRank?.forEach((element) => {
            if (element.userId === userId) {
                userRank = element.userRank;
            }
        });

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
                emoji: "<:ranking:1226234468587540500>",
            })
        );

        await interaction.deferUpdate();

        await interaction.editReply({
            embeds: [embedWallet(userName, userIcon, userBloods, modalValueAbountMe, userFame ?? 0, userRank, GetUserRank?.length)],
            components: [rowButton],
        });
    },
});

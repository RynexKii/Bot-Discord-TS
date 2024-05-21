import { embedWallet, embedWalletUsers } from "#functions";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";

export function bloodsWalletMenu(
    userName: string,
    userIcon: string,
    userBloods: number,
    userAboutMe: string,
    userFame: number,
    userRank: number | null,
    allUsersRank: number | undefined
) {
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

    return { embeds: [embedWallet(userName, userIcon, userBloods, userAboutMe, userFame, userRank, allUsersRank)], components: [rowButton] };
}

export function bloodsWalletMenuUsers(
    userName: string,
    userIcon: string,
    userBloods: number,
    userAboutMe: string,
    userFame: number,
    userRank: number | null,
    allUsersRank: number | undefined
) {
    return { embeds: [embedWalletUsers(userName, userIcon, userBloods, userAboutMe, userFame, userRank, allUsersRank)] };
}

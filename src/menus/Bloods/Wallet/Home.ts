import { embedWallet } from "#functions";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";

export function bloodsWalletMenu(userName: string, userIcon: any, userBloods: any, userAboutMe: string, userFame: number, userRank: any, allUsersRank: any) {
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

    return { embeds: [embedWallet(userName, userIcon, userBloods, userAboutMe, userFame, userRank, allUsersRank)], components: [rowButton] };
}

export function bloodsWalletMenuUsers(userName: string, userIcon: any, userBloods: any, userAboutMe: string, userFame: number, userRank: any, allUsersRank: any) {
    return { embeds: [embedWallet(userName, userIcon, userBloods, userAboutMe, userFame, userRank, allUsersRank)] };
}

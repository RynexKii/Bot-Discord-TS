import { embedWallet } from "#functions";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";

export function bloodsWalletMenu(userId: string, userName: string, userIcon: any, userBloods: any, userRank: any, allUsersRank: any) {
    const rowButton = createRow(
        new ButtonBuilder({
            customId: "button/bloods/wallet/home",
            label: "Atualizar",
            style: ButtonStyle.Secondary,
            emoji: "<:refresh:1228505777837178900>",
        }),

        new ButtonBuilder({
            customId: "button/bloods/wallet/bank",
            label: "Banco",
            style: ButtonStyle.Secondary,
            emoji: "<:bank:1226234467186905170>",
            disabled: true,
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

    return { content: `<@${userId}>`, embeds: [embedWallet(userName, userIcon, userBloods, userRank, allUsersRank)], components: [rowButton] };
}

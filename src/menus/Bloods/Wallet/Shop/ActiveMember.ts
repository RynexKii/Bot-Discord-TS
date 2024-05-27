import { embedWalletShopActiveMember } from "#messages";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";

export function walletShopActiveMember(userId: string) {
    const rowButton = createRow(
        new ButtonBuilder({
            customId: "button/bloods/wallet/home",
            label: "Inicio",
            style: ButtonStyle.Secondary,
            emoji: "<:home:1224341744531804210>",
        }),

        new ButtonBuilder({
            customId: "button/bloods/wallet/shop/activemember/3day",
            label: " (600)",
            style: ButtonStyle.Secondary,
            emoji: "<:3_:1227600147496566825>",
        }),

        new ButtonBuilder({
            customId: "button/bloods/wallet/shop/activemember/7day",
            label: " (1330) -5%",
            style: ButtonStyle.Secondary,
            emoji: "<:7_:1227600143583416361>",
        }),
        new ButtonBuilder({
            customId: "button/bloods/wallet/shop/activemember/30day",
            label: " (5100) -15%",
            style: ButtonStyle.Secondary,
            emoji: "<:30:1227600145479368714>",
        })
    );

    return { content: `<@${userId}>`, embeds: [embedWalletShopActiveMember()], components: [rowButton] };
}

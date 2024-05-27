import { embedWalletShop } from "#messages";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";

export function bloodsWalletShopMenu(userId: string) {
    const rowButton = createRow(
        new ButtonBuilder({
            customId: "button/bloods/wallet/home",
            label: "Inicio",
            style: ButtonStyle.Secondary,
            emoji: "<:home:1224341744531804210>",
        }),

        new ButtonBuilder({
            customId: "button/bloods/wallet/shop/activemember",
            label: "Membro Ativo",
            style: ButtonStyle.Secondary,
            emoji: "<:activemember:1227386523373146142>",
        }),

        new ButtonBuilder({
            customId: "button/bloods/wallet/shop/customchannel",
            label: "Canal Personalizado",
            style: ButtonStyle.Secondary,
            emoji: "<:channel:1227386524690157568>",
            disabled: true,
        })
    );

    return { content: `<@${userId}>`, embeds: [embedWalletShop], components: [rowButton] };
}

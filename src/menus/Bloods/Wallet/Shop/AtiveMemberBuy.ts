import { embedWalletShopAtiveMemberBuy } from "#functions";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";

export function walletShopActiveMemberBuy(userId: string, day: number, roleActiveMember: string) {
    const rowButton = createRow(
        new ButtonBuilder({
            customId: "button/bloods/wallet/home",
            label: "Inicio",
            style: ButtonStyle.Secondary,
            emoji: "<:home:1224341744531804210>",
        })
    );

    return { content: `<@${userId}>`, embeds: [embedWalletShopAtiveMemberBuy(day, roleActiveMember)], components: [rowButton] };
}

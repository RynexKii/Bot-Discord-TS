import { embedBloodsConfig } from "#functions";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";

export function bloodsHomeMenu(getChannelDB: any) {
    const rowButton = createRow(
        new ButtonBuilder({
            customId: `button/bloods/configurações/inicio`,
            label: "Inicio",
            style: ButtonStyle.Secondary,
            emoji: "<:home:1224341744531804210>",
            disabled: true,
        }),

        new ButtonBuilder({
            customId: `button/bloods/configurações/adicionar`,
            label: "Adicionar",
            style: ButtonStyle.Success,
            emoji: "<:add:1212567044428533760>",
        }),

        new ButtonBuilder({
            customId: `button/bloods/configurações/remover`,
            label: "Remover",
            style: ButtonStyle.Danger,
            emoji: "<:remove:1212567045695213629>",
        })
    );

    return {
        embeds: [embedBloodsConfig(getChannelDB)],
        components: [rowButton],
        ephemeral: true,
    };
}

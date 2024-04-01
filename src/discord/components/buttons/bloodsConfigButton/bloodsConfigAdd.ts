import { Component } from "#base";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, ChannelSelectMenuBuilder, ChannelType, ComponentType } from "discord.js";
import { embedAddButton } from "#functions";

new Component({
    customId: "button/bloods/configurações/adicionar",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        const rowChannelSelect = createRow(
            new ChannelSelectMenuBuilder({
                customId: "select/bloods/configurações/adicionar",
                placeholder: "Adicionar Canais no Banco de Dados",
                channelTypes: [ChannelType.GuildText, ChannelType.GuildVoice],
            })
        );

        const rowButtonHome = createRow(
            new ButtonBuilder({
                customId: `button/bloods/configurações/inicio`,
                label: "Inicio",
                style: ButtonStyle.Secondary,
                emoji: "<:home:1224341744531804210>",
            })
        );

        await interaction.update({ embeds: [embedAddButton], components: [rowChannelSelect, rowButtonHome] });
    },
});

import { Component } from "#base";
import { database } from "#database";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, ChannelSelectMenuBuilder, ChannelType, ComponentType } from "discord.js";
import { embedRemoveButton, embednotAllChannels } from "#functions";

new Component({
    customId: "button/bloods/configurações/remover",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        const guildId = interaction.guildId;

        const getChannelDB = await database.channelBloodsIgnored.get(guildId);

        if (!getChannelDB?.allChannels || getChannelDB?.allChannels?.length === 0)
            return await interaction.reply({ embeds: [embednotAllChannels], ephemeral: true });

        const rowChannelSelect = createRow(
            new ChannelSelectMenuBuilder({
                customId: "select/bloods/configurações/remover",
                placeholder: "Remover Canais no Banco de Dados",
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

        return await interaction.update({ embeds: [embedRemoveButton], components: [rowChannelSelect, rowButtonHome] });
    },
});

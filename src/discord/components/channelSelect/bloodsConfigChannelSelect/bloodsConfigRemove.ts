import { Component } from "#base";
import { database } from "#database";
import { ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";
import { embedNotChannel, embedRemoveSuccessText, embedRemoveSuccessVoice } from "#functions";
import { createRow } from "@magicyan/discord";

new Component({
    customId: "select/bloods/configurações/remover",
    type: ComponentType.ChannelSelect,
    cache: "cached",
    async run(interaction) {
        const rowButtonHome = createRow(
            new ButtonBuilder({
                customId: `button/bloods/configurações/inicio`,
                label: "Inicio",
                style: ButtonStyle.Secondary,
                emoji: "<:home:1224341744531804210>",
            })
        );

        const channelId = interaction.values[0];

        const channelType = interaction.guild.channels.cache.get(channelId)?.type;

        const guildId = interaction.guildId;

        const getChannelDB = await database.channelBloodsIgnored.get(guildId);

        if (!getChannelDB?.allChannels?.includes(channelId))
            return await interaction.reply({ embeds: [embedNotChannel(channelId)], ephemeral: true });

        // Type 0 é canal de Texto
        if (channelType === 0) {
            await database.channelBloodsIgnored.pull(`${guildId}.textChannels`, channelId);

            await database.channelBloodsIgnored.pull(`${guildId}.allChannels`, channelId);

            await interaction.update({ embeds: [embedRemoveSuccessText(channelId)], components: [rowButtonHome] });
        }

        // Type 2 é canal de Voz
        if (channelType === 2) {
            await database.channelBloodsIgnored.pull(`${guildId}.voiceChannels`, channelId);

            await database.channelBloodsIgnored.pull(`${guildId}.allChannels`, channelId);

            await interaction.update({ embeds: [embedRemoveSuccessVoice(channelId)], components: [rowButtonHome] });
        }
        return;
    },
});

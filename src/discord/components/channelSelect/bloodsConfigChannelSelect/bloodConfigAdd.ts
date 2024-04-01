import { Component } from "#base";
import { database } from "#database";
import { ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";
import { embedAddSuccessText, embedAddSuccessVoice, embedAlreadyRegistered } from "#functions";
import { createRow } from "@magicyan/discord";

new Component({
    customId: "select/bloods/configurações/adicionar",
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

        if (getChannelDB?.allChannels?.includes(channelId))
            return await interaction.reply({ embeds: [embedAlreadyRegistered(channelId)], ephemeral: true });

        // Type 0 é canal de Texto
        if (channelType === 0) {
            await database.channelBloodsIgnored.push(`${guildId}.textChannels`, channelId);

            await database.channelBloodsIgnored.push(`${guildId}.allChannels`, channelId);

            return await interaction.update({ embeds: [embedAddSuccessText(channelId)], components: [rowButtonHome] });
        }

        // Type 2 é canal de Voz
        if (channelType === 2) {
            await database.channelBloodsIgnored.push(`${guildId}.voiceChannels`, channelId);

            await database.channelBloodsIgnored.push(`${guildId}.allChannels`, channelId);

            return await interaction.update({ embeds: [embedAddSuccessVoice(channelId)], components: [rowButtonHome] });
        }
        return;
    },
});

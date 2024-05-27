import { Component } from "#base";
import { database } from "#database";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";
import {
    embedAddSuccessText,
    embedAddSuccessVoice,
    contentAlreadyRegistered,
    contentNotChannel,
    embedRemoveSuccessText,
    embedRemoveSuccessVoice,
} from "#messages";

// Select Menu de Adicionar o Canal
new Component({
    customId: "select/bloods/configurações/adicionar/canal",
    type: ComponentType.ChannelSelect,
    cache: "cached",
    async run(interaction) {
        const rowButtonHome = createRow(
            new ButtonBuilder({
                customId: "button/bloods/configurações/inicio",
                label: "Inicio",
                style: ButtonStyle.Secondary,
                emoji: "<:home:1224341744531804210>",
            })
        );

        const { guildId } = interaction;

        const channelId = interaction.values[0];

        const channelType = interaction.guild.channels.cache.get(channelId)?.type;

        const getChannelDB = await database.channelBloodsIgnored.get<string[]>("GuildConfig.allChannels");

        const getGuildDB = await database.channelBloodsIgnored.get<string[]>("GuildConfig.guildId");

        // Verificação se não existe ainda um Servidor Principal Adicionado
        if (!getGuildDB || getGuildDB.length === 0)
            return await interaction.reply({
                content: "Você precisa antes usar o botão `Adicionar Servidor` para tornar este o `Servidor Principal` do sistema de `Bloods`!",
                ephemeral: true,
            });

        // Verificação se o Servidor que foi chamado o comando for diferente do Servidor Principal
        if (getGuildDB[0] !== guildId)
            return await interaction.reply({
                content: "Você não pode usar esse comando em um servidor diferente do `Servidor Principal`",
                ephemeral: true,
            });

        // Verificação se o canal que esta sendo registrado já exista no Banco de Dados
        if (getChannelDB?.includes(channelId)) return await interaction.reply({ content: contentAlreadyRegistered(channelId), ephemeral: true });

        // Type 0 é canal de Texto
        if (channelType === 0) {
            await database.channelBloodsIgnored.push("GuildConfig.textChannels", channelId);

            await database.channelBloodsIgnored.push("GuildConfig.allChannels", channelId);

            return await interaction.update({ embeds: [embedAddSuccessText(channelId)], components: [rowButtonHome] });
        }

        // Type 2 é canal de Voz
        if (channelType === 2) {
            await database.channelBloodsIgnored.push("GuildConfig.voiceChannels", channelId);

            await database.channelBloodsIgnored.push("GuildConfig.allChannels", channelId);

            return await interaction.update({ embeds: [embedAddSuccessVoice(channelId)], components: [rowButtonHome] });
        }
        return;
    },
});

// Select Menu de Remover o Canal
new Component({
    customId: "select/bloods/configurações/remover/canal",
    type: ComponentType.ChannelSelect,
    cache: "cached",
    async run(interaction) {
        const rowButtonHome = createRow(
            new ButtonBuilder({
                customId: "button/bloods/configurações/inicio",
                label: "Inicio",
                style: ButtonStyle.Secondary,
                emoji: "<:home:1224341744531804210>",
            })
        );

        const channelId = interaction.values[0];

        const channelType = interaction.guild.channels.cache.get(channelId)?.type;

        const getChannelDB = await database.channelBloodsIgnored.get<string[]>("GuildConfig.allChannels");

        // Verifica se o canal já está registado no Banco de Dados
        if (!getChannelDB?.includes(channelId)) return await interaction.reply({ content: contentNotChannel(channelId), ephemeral: true });

        // Type 0 é canal de Texto
        if (channelType === 0) {
            await database.channelBloodsIgnored.pull("GuildConfig.textChannels", channelId);

            await database.channelBloodsIgnored.pull("GuildConfig.allChannels", channelId);

            await interaction.update({ embeds: [embedRemoveSuccessText(channelId)], components: [rowButtonHome] });
        }

        // Type 2 é canal de Voz
        if (channelType === 2) {
            await database.channelBloodsIgnored.pull("GuildConfig.voiceChannels", channelId);

            await database.channelBloodsIgnored.pull("GuildConfig.allChannels", channelId);

            await interaction.update({ embeds: [embedRemoveSuccessVoice(channelId)], components: [rowButtonHome] });
        }
        return;
    },
});

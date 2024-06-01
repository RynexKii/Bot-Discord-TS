import { Component } from "#base";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, ChannelSelectMenuBuilder, ChannelType, ComponentType } from "discord.js";
import { embedAddButton, embedRemoveButton, contentNotAllChannels, contentAddMainGuild, contentNotMainGuild } from "#messages";
import { database } from "#database";
import { bloodsHomeMenu } from "#menus";

// Botão de Menu Inicio
new Component({
    customId: "button/bloods/configurações/inicio",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        const botId = interaction.message.author.id;
        await interaction.update(await bloodsHomeMenu(botId));
    },
});

// Botão principal de Adicionar Canal
new Component({
    customId: "button/bloods/configurações/adicionar/canal",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        const rowChannelSelect = createRow(
            new ChannelSelectMenuBuilder({
                customId: "select/bloods/configurações/adicionar/canal",
                placeholder: "Adicionar Canais no Banco de Dados",
                channelTypes: [ChannelType.GuildText, ChannelType.GuildVoice],
            })
        );

        const rowButtonHome = createRow(
            new ButtonBuilder({
                customId: "button/bloods/configurações/inicio",
                label: "Inicio",
                style: ButtonStyle.Secondary,
                emoji: "<:home:1224341744531804210>",
            })
        );

        const guildId = interaction.guildId;
        const getGuildIdDB = await database.guild.getGuildId();

        // Verificação se não existe ainda um Servidor Principal Adicionado
        if (!getGuildIdDB) return await interaction.reply({ content: contentAddMainGuild, ephemeral: true });

        // Verificação se o Servidor que foi chamado o comando for diferente do Servidor Principal
        if (getGuildIdDB !== guildId) return await interaction.reply({ content: contentNotMainGuild, ephemeral: true });

        return await interaction.update({ embeds: [embedAddButton], components: [rowChannelSelect, rowButtonHome] });
    },
});

// Botão principal de Remover Canal
new Component({
    customId: "button/bloods/configurações/remover/canal",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        const rowChannelSelect = createRow(
            new ChannelSelectMenuBuilder({
                customId: "select/bloods/configurações/remover/canal",
                placeholder: "Remover Canais no Banco de Dados",
                channelTypes: [ChannelType.GuildText, ChannelType.GuildVoice],
            })
        );

        const rowButtonHome = createRow(
            new ButtonBuilder({
                customId: "button/bloods/configurações/inicio",
                label: "Inicio",
                style: ButtonStyle.Secondary,
                emoji: "<:home:1224341744531804210>",
            })
        );

        const guildId = interaction.guildId;
        const getGuildIdDB = await database.guild.getGuildId();
        const getAllChannelsDB = await database.guild.getAllChannels(guildId);

        // Verificação se não existe ainda um Servidor Principal Adicionado
        if (!getGuildIdDB) return await interaction.reply({ content: contentAddMainGuild, ephemeral: true });

        // Verificação se o Servidor que foi chamado o comando for diferente do Servidor Principal
        if (getGuildIdDB !== guildId) return await interaction.reply({ content: contentNotMainGuild, ephemeral: true });

        // Verificação caso não exista nenhum canal registrado no Banco de Dados
        if (!getAllChannelsDB) return await interaction.reply({ content: contentNotAllChannels, ephemeral: true });

        return await interaction.update({ embeds: [embedRemoveButton], components: [rowChannelSelect, rowButtonHome] });
    },
});

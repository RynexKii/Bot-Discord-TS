import { Component } from "#base";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, ChannelSelectMenuBuilder, ChannelType, ComponentType } from "discord.js";
import { embedAddButton, embedRemoveButton, contentNotAllChannels } from "#functions";
import { database } from "#database";
import { bloodsHomeMenu } from "#menus";

// Botão de Menu Inicio
new Component({
    customId: "button/bloods/configurações/inicio",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        const getChannelDB = await database.channelBloodsIgnored.get("GuildConfig");

        await interaction.update(bloodsHomeMenu(getChannelDB));
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
                customId: `button/bloods/configurações/inicio`,
                label: "Inicio",
                style: ButtonStyle.Secondary,
                emoji: "<:home:1224341744531804210>",
            })
        );

        const { guildId } = interaction;

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
                customId: `button/bloods/configurações/inicio`,
                label: "Inicio",
                style: ButtonStyle.Secondary,
                emoji: "<:home:1224341744531804210>",
            })
        );

        const { guildId } = interaction;

        const getAllChannelsDB = await database.channelBloodsIgnored.get<string[]>("GuildConfig.allChannels");

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

        // Verificação caso não exista nenhum canal registrado no Banco de Dados
        if (!getAllChannelsDB || getAllChannelsDB.length === 0) return await interaction.reply({ content: contentNotAllChannels, ephemeral: true });

        return await interaction.update({ embeds: [embedRemoveButton], components: [rowChannelSelect, rowButtonHome] });
    },
});

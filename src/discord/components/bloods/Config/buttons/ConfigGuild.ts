import { Component } from "#base";
import { database } from "#database";
import { contentAlreadyGuild, contentIncorrectGuild, contentNotGuildRegistered, embedGuildAdd, embedGuildConfig, embedGuildRemove } from "#messages";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";

// Interação com o Botão principal de Adicionar Guild
new Component({
    customId: "button/bloods/configurações/set/guild",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        const rowButton = createRow(
            new ButtonBuilder({
                customId: "button/bloods/configurações/inicio",
                label: "Inicio",
                style: ButtonStyle.Secondary,
                emoji: "<:home:1224341744531804210>",
            }),

            new ButtonBuilder({
                customId: "button/bloods/configurações/adicionar/guild",
                label: "Adicionar",
                style: ButtonStyle.Success,
                emoji: "<:add:1225995605558431786>",
            }),

            new ButtonBuilder({
                customId: "button/bloods/configurações/remover/guild",
                label: "Remover",
                style: ButtonStyle.Danger,
                emoji: "<:remove:1226004959540150372>",
            })
        );

        const { guildId } = interaction;

        const guildName = interaction.guild.name;

        await interaction.update({ embeds: [embedGuildConfig(guildName, guildId)], components: [rowButton] });
    },
});

// Interação com o Botão Adicionar dentro da interação de Adiocionar Guild
new Component({
    customId: "button/bloods/configurações/adicionar/guild",
    type: ComponentType.Button,
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

        const guildName = interaction.guild.name;

        const getGuildDB = await database.channelBloodsIgnored.get<string[]>("GuildConfig.guildName");

        // Verifica se existe um servidor já registrado no banco de dados
        if (getGuildDB && getGuildDB.length > 0) return await interaction.reply({ content: contentAlreadyGuild, ephemeral: true });

        await database.channelBloodsIgnored.push("GuildConfig.guildName", guildName);

        await database.channelBloodsIgnored.push("GuildConfig.guildId", guildId);

        return await interaction.update({ embeds: [embedGuildAdd(guildName)], components: [rowButtonHome] });
    },
});

// Interação com o Botão Remover dentro da interação de Adiocionar Guild
new Component({
    customId: "button/bloods/configurações/remover/guild",
    type: ComponentType.Button,
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

        const guildName = interaction.guild.name;

        const getGuildIdDB = await database.channelBloodsIgnored.get<string[]>("GuildConfig.guildId");

        const getGuildNameDB = await database.channelBloodsIgnored.get<string[]>("GuildConfig.guildName");

        // Verifica se ainda não existe um servidor principal no Banco de Dados
        if (!getGuildIdDB || !getGuildNameDB) return await interaction.reply({ content: contentNotGuildRegistered, ephemeral: true });

        // Verifica se o servidor que o comando está sendo executado é o mesmo que o registrado no Banco de Dados
        if (getGuildIdDB[0] !== guildId)
            return interaction.reply({ content: contentIncorrectGuild(getGuildNameDB[0], getGuildIdDB[0]), ephemeral: true });

        await database.channelBloodsIgnored.deleteAll();

        return await interaction.update({ embeds: [embedGuildRemove(guildName)], components: [rowButtonHome] });
    },
});

import { Component } from "#base";
import { database } from "#database";
import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";
import { embedAddSuccessText, embedAddSuccessVoice, contentAlreadyRegistered, contentNotChannel, embedRemoveSuccessText, embedRemoveSuccessVoice } from "#messages";

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

        const guildId = interaction.guildId;
        const channelId = interaction.values[0];
        const channelType = interaction.guild.channels.cache.get(channelId)?.type;
        const getAllChannelsDB = await database.guild.getAllChannels(guildId);
        const getGuildIdDB = await database.guild.getGuildId("Dead by Daylight Brasil");

        // Verificação se não existe ainda um Servidor Principal Adicionado
        if (getGuildIdDB == "Sem ID")
            return await interaction.reply({
                content: "Você precisa antes usar o botão `Adicionar Servidor` para tornar este o `Servidor Principal` do sistema de `Bloods`!",
                ephemeral: true,
            });

        // Verificação se o Servidor que foi chamado o comando for diferente do Servidor Principal
        if (getGuildIdDB !== guildId)
            return await interaction.reply({
                content: "Você não pode usar esse comando em um servidor diferente do `Servidor Principal`",
                ephemeral: true,
            });

        // Verificação se o canal que esta sendo registrado já exista no Banco de Dados
        if (getAllChannelsDB.includes(channelId)) return await interaction.reply({ content: contentAlreadyRegistered(channelId), ephemeral: true });

        switch (channelType) {
            // Type 0 é canal de Texto
            case 0: {
                await database.guild.pushTextChannels(guildId, channelId);

                await database.guild.pushAllChannels(guildId, channelId);

                await interaction.update({ embeds: [embedAddSuccessText(channelId)], components: [rowButtonHome] });
                break;
            }
            // Type 2 é canal de Voz
            case 2: {
                await database.guild.pushVoiceChannels(guildId, channelId);

                await database.guild.pushAllChannels(guildId, channelId);

                await interaction.update({ embeds: [embedAddSuccessVoice(channelId)], components: [rowButtonHome] });
                break;
            }
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

        const guildId = interaction.guildId;
        const channelId = interaction.values[0];
        const channelType = interaction.guild.channels.cache.get(channelId)?.type;
        const getAllChannelsDB = await database.guild.getAllChannels(guildId);

        // Verifica se o canal já está registado no Banco de Dados
        if (!getAllChannelsDB.includes(channelId)) return await interaction.reply({ content: contentNotChannel(channelId), ephemeral: true });

        switch (channelType) {
            // Type 0 é canal de Texto
            case 0: {
                await database.guild.pullTextChannels(guildId, channelId);

                await database.guild.pullAllChannels(guildId, channelId);

                await interaction.update({ embeds: [embedRemoveSuccessText(channelId)], components: [rowButtonHome] });
                break;
            }
            // Type 2 é canal de Voz
            case 2: {
                await database.guild.pullVoiceChannels(guildId, channelId);

                await database.guild.pullAllChannels(guildId, channelId);

                await interaction.update({ embeds: [embedRemoveSuccessVoice(channelId)], components: [rowButtonHome] });
                break;
            }
        }

        return;
    },
});

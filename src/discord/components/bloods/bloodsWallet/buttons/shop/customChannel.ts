import { Component } from "#base";
import { walletShopCustomChannel } from "#menus";
import { ChannelType, ComponentType } from "discord.js";

//* Menu Principal Canal Personalizado
new Component({
    customId: "button/bloods/wallet/shop/customchannel",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        const userId = interaction.user.id;

        interaction.update(walletShopCustomChannel(userId));
    },
});

new Component({
    customId: "button/bloods/wallet/shop/customchannel/3day",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        const userId = interaction.user.id;

        const userName = interaction.user.globalName;

        const a = await interaction.guild.channels.create({
            name: `➝ ${userName}`,
            type: ChannelType.GuildVoice,
            parent: "CATEGORYID",
            permissionOverwrites: [
                {
                    id: "1134438162161225748", // Fundador
                    allow: [`ViewChannel`, `Connect`],
                },
                {
                    id: "1134438162161225748", // Administrador
                    allow: [`ViewChannel`, `Connect`],
                },
                {
                    id: "1134438162161225748", // Moderador
                    allow: [`ViewChannel`, `Connect`],
                },
                {
                    id: "1134438162161225748", // Ajudante
                    allow: [`ViewChannel`, `Connect`],
                },
                {
                    id: interaction.user.id, // Usuário que criou a sala
                    allow: ["ViewChannel", "Connect"],
                },
                {
                    id: interaction.guild.roles.everyone, // Tirando as permissões de todos
                    deny: ["ViewChannel", "Connect"],
                },
            ],
        });

        console.log(a.id);
    },
});

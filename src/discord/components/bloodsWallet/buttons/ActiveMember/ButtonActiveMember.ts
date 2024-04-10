import { Component } from "#base";
import { contentNotInteractCommand } from "#functions";
import { walletShopActiveMember } from "#menus";
import { ComponentType } from "discord.js";

new Component({
    customId: "button/bloods/wallet/shop/activemember",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        // Verifica se o usuário que está interagindo com o botão é o mesmo que enviou a mensagem
        if (interaction.user.id !== interaction.message.interaction?.user.id)
            return await interaction.reply({ content: contentNotInteractCommand, ephemeral: true });

        const userId = interaction.user.id;

        return await interaction.update(walletShopActiveMember(userId));
    },
});

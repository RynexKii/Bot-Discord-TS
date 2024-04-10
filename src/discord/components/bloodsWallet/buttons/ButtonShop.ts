import { Component } from "#base";
import { contentNotInteractCommand } from "#functions";
import { ComponentType } from "discord.js";
import { bloodsWalletShopMenu } from "menus/bloodsMenus/bloodsWalletMenu/MenuShop.js";

new Component({
    customId: "button/bloods/wallet/shop",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        // Verifica se o usuário que está interagindo com o botão é o mesmo que enviou a mensagem
        if (interaction.user.id !== interaction.message.interaction?.user.id)
            return await interaction.reply({ content: contentNotInteractCommand, ephemeral: true });

        const userId = interaction.user.id;

        return await interaction.update(bloodsWalletShopMenu(userId));
    },
});

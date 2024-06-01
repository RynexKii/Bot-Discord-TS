import { Component } from "#base";
import { database } from "#database";
import { contentNotInteractCommand } from "#messages";
import { bloodsWalletMenu } from "#menus";
import { ComponentType } from "discord.js";

// Botão de inicio da Wallet
new Component({
    customId: "button/bloods/wallet/home",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        // Verifica se o usuário que está interagindo com o botão é o mesmo que enviou a mensagem
        if (interaction.user.id !== interaction.message.interaction?.user.id) return await interaction.reply({ content: contentNotInteractCommand, ephemeral: true });

        const userId = interaction.user.id;
        const userName = interaction.user.displayName;
        const userIcon = interaction.user.displayAvatarURL();
        const userBloodsDB = await database.profile.getBloods(userId);
        const userAboutDB = await database.profile.getAbout(userId);
        const userFameDB = await database.profile.getFame(userId);
        const userRankDB = await database.profile.getRank(userId);
        const allUsersRanksDB = (await database.profile.find()).length;

        return await interaction.update(bloodsWalletMenu(userId, userName, userIcon, userBloodsDB, userAboutDB, userFameDB, userRankDB, allUsersRanksDB));
    },
});

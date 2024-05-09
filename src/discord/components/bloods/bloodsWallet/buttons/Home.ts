import { Component } from "#base";
import { database } from "#database";
import { contentNotInteractCommand } from "#functions";
import { bloodsWalletMenu } from "#menus";
import { ComponentType } from "discord.js";

// Botão de inicio da Wallet
new Component({
    customId: "button/bloods/wallet/home",
    type: ComponentType.Button,
    cache: "cached",
    async run(interaction) {
        // Verifica se o usuário que está interagindo com o botão é o mesmo que enviou a mensagem
        if (interaction.user.id !== interaction.message.interaction?.user.id)
            return await interaction.reply({ content: contentNotInteractCommand, ephemeral: true });

        const userId = interaction.user.id;

        const userName = interaction.user.displayName;

        const userIcon = interaction.user.avatarURL();

        const userBloods = await database.memberBloods.get(`${userId}.bloods`);

        const GetUserRank = await database.memberBloodsRank.get<any[]>("MembersRank");

        let userRank = null;

        GetUserRank?.forEach((element) => {
            if (element.userId === userId) {
                userRank = element.userRank;
            }
        });

        return await interaction.update(bloodsWalletMenu(userId, userName, userIcon, userBloods, userRank, GetUserRank?.length));
    },
});

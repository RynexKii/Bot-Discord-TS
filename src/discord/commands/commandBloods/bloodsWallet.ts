import { Command } from "#base";
import { database } from "#database";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { bloodsWalletMenu } from "menus/bloodsMenus/bloodsWalletMenu/MenuHome.js";

new Command({
    name: "bloods",
    description: "Sistema de Bloods",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "carteira",
            description: "Veja o seu saldo de Bloods, opção de transferencia, loja e ranks",
            type: ApplicationCommandOptionType.Subcommand,
        },
    ],
    async run(interaction) {
        const getSubcommand = interaction.options.getSubcommand();
        switch (getSubcommand) {
            case "carteira": {
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

                await interaction.reply(bloodsWalletMenu(userId, userName, userIcon, userBloods, userRank, GetUserRank?.length));

                break;
            }
        }
    },
});

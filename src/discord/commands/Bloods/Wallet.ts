import { Command } from "#base";
import { CommandTimer } from "#classes";
import { database } from "#database";
import { bloodsWalletMenu } from "#menus";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

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
        const userId = interaction.user.id;

        const test = new CommandTimer(userId, "Test");
        
        test.setTimer();

        const sendCommandsChannel = "1113654401786183783"; //? ID do canal que o comando poderá ser enviado

        // Verifica se o canal que foi executado o comando é o mesmo que está no sendCommandsChannel
        if (interaction.channelId !== sendCommandsChannel)
            return await interaction.reply({
                content: `Por favor, utilize apenas o canal <#${sendCommandsChannel}> para enviar este comando!`,
                ephemeral: true,
            });

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
        return;
    },
});

import { Command } from "#base";
import { CommandTimer } from "#classes";
import { database } from "#database";
import { contentChannelSendCommand, contentProfileBot, cooldownMessage, defaultContentAboutMe } from "#functions";
import { bloodsWalletMenu, bloodsWalletMenuUsers } from "#menus";
import { channelSendCommandsId } from "#tools";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

new Command({
    name: "perfil",
    description: "❰ Social ❱ Veja o seu perfil ou de algum outro usuário",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            description: "Menção ou ID do usuário",
            type: ApplicationCommandOptionType.User,
        },
    ],
    async run(interaction) {
        const userId = interaction.user.id;
        const userReceiverId = interaction.options.getUser("usuário")?.id;
        const userBotId = interaction.options.getUser("usuário")?.id;

        // Verifica se o canal que foi executado o comando é o mesmo que está no sendCommandsChannel
        if (interaction.channelId !== channelSendCommandsId)
            return await interaction.reply({ content: contentChannelSendCommand(channelSendCommandsId), ephemeral: true });
        // ---

        // Verifica se o usuário que foi recebido no userReceiverId é bot
        if (interaction.options.getUser("usuário")?.bot && userBotId) return await interaction.reply({ content: contentProfileBot(userBotId), ephemeral: true });

        // Colocando cooldown no comando de 1 minuto
        const cooldownCommand = new CommandTimer(userId, "Wallet");

        cooldownCommand.setTimer(30);

        if (await cooldownCommand.verifyTimer()) return await interaction.reply(cooldownMessage(await cooldownCommand.getTimer()));
        // ---

        async function showWallet(showUserId: string) {
            const userName = (await interaction.guild.members.fetch(showUserId)).displayName;
            const userIcon = (await interaction.guild.members.fetch(showUserId)).displayAvatarURL();
            const userBloods = await database.memberBloods.get<number>(`${showUserId}.bloods`);
            const userAboutMeDB = await database.memberProfile.get<string>(`${showUserId}.aboutMe`);
            const GetUserRank = await database.memberBloodsRank.get<any[]>("MembersRank");
            const userFameDB = await database.memberProfile.get<number>(`${showUserId}.fame`);

            let userRank = null;

            GetUserRank?.forEach((element) => {
                if (element.userId === showUserId) {
                    userRank = element.userRank;
                }
            });

            if (!userReceiverId || userId == userReceiverId) {
                return await interaction.reply(
                    bloodsWalletMenu(
                        userName,
                        userIcon,
                        userBloods ?? 0,
                        userAboutMeDB ?? defaultContentAboutMe(showUserId),
                        userFameDB ?? 0,
                        userRank,
                        GetUserRank?.length
                    )
                );
            } else {
                return await interaction.reply(
                    bloodsWalletMenuUsers(
                        userName,
                        userIcon,
                        userBloods ?? 0,
                        userAboutMeDB ?? defaultContentAboutMe(showUserId),
                        userFameDB ?? 0,
                        userRank,
                        GetUserRank?.length
                    )
                );
            }
        }

        if (!userReceiverId) {
            showWallet(userId);
        } else {
            showWallet(userReceiverId);
        }
        return;
    },
});

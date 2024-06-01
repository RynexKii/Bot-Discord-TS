import { Command } from "#base";
import { CommandCooldown } from "#classes";
import { database } from "#database";
import { contentChannelSendCommand, contentProfileBot, cooldownMessage } from "#messages";
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
        const cooldownCommand = new CommandCooldown(userId, "Wallet");

        cooldownCommand.setTimer(30);

        if (await cooldownCommand.verifyTimer()) return await interaction.reply(cooldownMessage(await cooldownCommand.getTimer()));
        // ---

        async function showWallet(showUserId: string) {
            const userName = (await interaction.guild.members.fetch(showUserId)).displayName;
            const userIcon = (await interaction.guild.members.fetch(showUserId)).displayAvatarURL();
            const userBloodsDB = await database.profile.getBloods(showUserId);
            const userAboutDB = await database.profile.getAbout(showUserId);
            const userFameDB = await database.profile.getFame(showUserId);
            const userRankDB = await database.profile.getRank(showUserId);
            const allUsersRanksDB = (await database.profile.find()).length;

            if (!userReceiverId || userId == userReceiverId) {
                return await interaction.reply(bloodsWalletMenu(userId, userName, userIcon, userBloodsDB, userAboutDB, userFameDB, userRankDB, allUsersRanksDB));
            } else {
                return await interaction.reply(bloodsWalletMenuUsers(userName, userIcon, userBloodsDB, userAboutDB, userFameDB, userRankDB, allUsersRanksDB));
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

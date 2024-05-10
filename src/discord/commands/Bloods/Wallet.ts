import { Command } from "#base";
import { CommandTimer } from "#classes";
import { database } from "#database";
import { bloodsWalletMenu } from "#menus";
import { ApplicationCommandType, time } from "discord.js";

new Command({
    name: "bloods",
    description: "Veja o seu saldo de Bloods, loja e ranks",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        const userId = interaction.user.id;

        const commandCooldown = new CommandTimer(userId, "Wallet");

        commandCooldown.setTimer(300);

        if (await commandCooldown.verifyTimer())
            return await interaction.reply({
                content: `Você pode usar esse comando novamente ${time(await commandCooldown.getTimer(), "R")}`,
                ephemeral: true,
            });

        const sendCommandsChannel = "1113654401786183783"; //? ID do canal que o comando poderá ser enviado

        // Verifica se o canal que foi executado o comando é o mesmo que está no sendCommandsChannel
        if (interaction.channelId !== sendCommandsChannel)
            return await interaction.reply({
                content: `Por favor, utilize apenas o canal <#${sendCommandsChannel}> para enviar este comando!`,
                ephemeral: true,
            });

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

        return await interaction.reply(bloodsWalletMenu(userId, userName, userIcon, userBloods, userRank, GetUserRank?.length));
    },
});

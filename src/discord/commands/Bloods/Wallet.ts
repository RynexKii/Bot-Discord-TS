import { Command } from "#base";
import { CommandTimer } from "#classes";
import { database } from "#database";
import { defaultContentAboutMe } from "#functions";
import { bloodsWalletMenu } from "#menus";
import { ApplicationCommandType, time } from "discord.js";

new Command({
    name: "bloods",
    description: "❰ Social ❱ Veja o seu saldo de Bloods, loja e ranks",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        const userId = interaction.user.id;

        const commandCooldown = new CommandTimer(userId, "Wallet");

        commandCooldown.setTimer(120);

        if (await commandCooldown.verifyTimer())
            return await interaction.reply({
                content: `Você poderá usar esse comando novamente ${time(await commandCooldown.getTimer(), "R")}`,
                ephemeral: true,
            });

        //? TROCAR
        const sendCommandsChannel = "CHANNELID"; //? ID do canal que o comando poderá ser enviado

        // Verifica se o canal que foi executado o comando é o mesmo que está no sendCommandsChannel
        if (interaction.channelId !== sendCommandsChannel)
            return await interaction.reply({
                content: `Por favor, utilize apenas o canal <#${sendCommandsChannel}> para enviar este comando!`,
                ephemeral: true,
            });

        const userName = interaction.user.displayName;
        const userIcon = interaction.user.avatarURL();
        const userBloods = await database.memberBloods.get(`${userId}.bloods`);
        const userAboutMeDB = await database.memberProfile.get<string>(`${userId}.aboutMe`);
        const GetUserRank = await database.memberBloodsRank.get<any[]>("MembersRank");
        const userFameDB = await database.memberProfile.get<number>(`${userId}.fame`);

        let userRank = null;

        GetUserRank?.forEach((element) => {
            if (element.userId === userId) {
                userRank = element.userRank;
            }
        });

        return await interaction.reply(
            bloodsWalletMenu(
                userId,
                userName,
                userIcon,
                userBloods,
                userAboutMeDB ?? defaultContentAboutMe(userId),
                userFameDB ?? 0,
                userRank,
                GetUserRank?.length
            )
        );
    },
});

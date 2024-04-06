import { Command } from "#base";
import { database } from "#database";
import { bloodsHomeMenu } from "#menus";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

new Command({
    name: "staff",
    description: "Comandos para a staff utilizar.",
    dmPermission: false,
    defaultMemberPermissions: ["Administrator"],
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "bloods",
            description: "Comandos de staff para Bloods.",
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: "configurações",
                    description: "Utilize para configurar os canais e verificar quais deles não oferecerão Bloods.",
                    type: ApplicationCommandOptionType.Subcommand,
                },
            ],
        },
    ],
    async run(interaction) {
        const subCommandGroup = interaction.options.getSubcommandGroup();

        switch (subCommandGroup) {
            case "bloods": {
                const subCommand = interaction.options.getSubcommand();

                switch (subCommand) {
                    case "configurações": {
                        const getChannelDB = await database.channelBloodsIgnored.get("GuildConfig");

                        await interaction.reply(bloodsHomeMenu(getChannelDB));
                        break;
                    }
                }
                break;
            }
        }
    },
});

import { Command } from "#base";
import { CommandCooldown } from "#classes";
import { database } from "#database";
import { cooldownMessage, contentStaffAddBloods, contentStaffBot, contentStaffNoHaveBloods, contentStaffRemoveBloods } from "#messages";
import { bloodsHomeMenu } from "#menus";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

new Command({
    name: "staff",
    description: "❰ Staff ❱ Comandos para a staff utilizar.",
    dmPermission: false,
    defaultMemberPermissions: ["Administrator"],
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "bloods",
            description: "❰ Staff ❱ Comandos de staff para Bloods.",
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: "configurações",
                    description: "❰ Staff ❱ Utilize para configurar os canais e verificar quais deles não oferecerão Bloods.",
                    type: ApplicationCommandOptionType.Subcommand,
                },
                {
                    name: "adicionar-remover",
                    description: "❰ Staff ❱ Adicine ou remova Bloods de algum usuário específico.",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "opção",
                            description: "Selecione se deseja adicionar o remover Bloods",
                            type: ApplicationCommandOptionType.String,
                            choices: [
                                {
                                    name: "+ Adicionar",
                                    value: "addBloods",
                                },
                                {
                                    name: "- Remover",
                                    value: "removeBloods",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "usuário",
                            description: "Selecione o usuário",
                            type: ApplicationCommandOptionType.User,
                            required: true,
                        },
                        {
                            name: "valor",
                            description: "Selecione a quantidade de Bloods",
                            type: ApplicationCommandOptionType.Number,
                            minValue: 1,
                            maxValue: 10000,
                            required: true,
                        },
                    ],
                },
            ],
        },
    ],
    async run(interaction) {
        const subCommandGroup = interaction.options.getSubcommandGroup();
        const userId = interaction.user.id;

        // Colocando cooldown no comando de 5 Segundos
        const cooldownCommand = new CommandCooldown(userId, "Staff");

        cooldownCommand.setTimer(5);

        if (await cooldownCommand.verifyTimer()) return await interaction.reply(cooldownMessage(await cooldownCommand.getTimer()));
        // ---

        switch (subCommandGroup) {
            case "bloods": {
                const subCommand = interaction.options.getSubcommand();

                switch (subCommand) {
                    case "configurações": {
                        await interaction.reply(await bloodsHomeMenu());
                        break;
                    }
                    case "adicionar-remover": {
                        const userReceiverId = interaction.options.getUser("usuário", true).id;
                        const userBot = interaction.options.getUser("usuário", true).bot;
                        const optionBloods = interaction.options.getString("opção");
                        const valueBloods = interaction.options.getNumber("valor", true);

                        switch (optionBloods) {
                            case "addBloods":
                                {
                                    if (userBot) return await interaction.reply({ content: contentStaffBot, ephemeral: true });

                                    await database.profile.addBloods(userReceiverId, valueBloods);

                                    await interaction.reply({ content: contentStaffAddBloods(userReceiverId, valueBloods), ephemeral: true });
                                }
                                break;

                            case "removeBloods":
                                {
                                    const bloodsUserDB = await database.profile.getBloods(userReceiverId);

                                    if (bloodsUserDB < valueBloods || bloodsUserDB == 0)
                                        return await interaction.reply({ content: contentStaffNoHaveBloods(userReceiverId, valueBloods, bloodsUserDB), ephemeral: true });

                                    await database.profile.subBloods(userReceiverId, valueBloods);

                                    await interaction.reply({ content: contentStaffRemoveBloods(userReceiverId, valueBloods), ephemeral: true });
                                }
                                break;
                        }
                        break;
                    }
                }
                break;
            }
        }
        return;
    },
});

import { Command } from "#base";
import { CommandCooldown } from "#classes";
import { database } from "#database";
import { contentBoostActivated, contentBoostAlready, cooldownMessage, embedBoostActivated } from "#messages";
import { channelCongratulationsPublic, channelLogStaffBoost, channelSendCommandsId } from "#tools";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

new Command({
    name: "moderação",
    description: "❰ Mod ❱ Comandos para a moderação utilizar.",
    dmPermission: false,
    defaultMemberPermissions: ["ManageChannels"],
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "bloods",
            description: "❰ Mod ❱ Comandos de moderação para Bloods.",
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: "boost",
                    description: "❰ Mod ❱ De um boost de Bloods no servidor.",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "multiplicador",
                            description: "❰ Mod ❱ Selecione o multiplicador do Boost",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            choices: [
                                {
                                    name: "1.5x",
                                    value: "boost1.5x",
                                },
                                {
                                    name: "2x",
                                    value: "boost2x",
                                },
                            ],
                        },
                        {
                            name: "duração",
                            description: "❰ Mod ❱ Selecione a duração do Boost",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            choices: [
                                {
                                    name: "30 minutos",
                                    value: "30",
                                },
                                {
                                    name: "1 hora",
                                    value: "60",
                                },
                                {
                                    name: "2 hora",
                                    value: "120",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    async run(interaction) {
        const userId = interaction.user.id;
        const userAvatarURL = interaction.user.displayAvatarURL();
        const userName = interaction.user.displayName;
        const subCommand = interaction.options.getSubcommand();

        // Colocando cooldown no comando de 5 Segundos
        const cooldownCommand = new CommandCooldown(userId, "Moderation");

        cooldownCommand.setTimer(5);

        if (await cooldownCommand.verifyTimer()) return await interaction.reply(cooldownMessage(await cooldownCommand.getTimer()));
        // ---
        switch (subCommand) {
            case "boost":
                {
                    const getMultiplication = interaction.options.getString("multiplicador");

                    switch (getMultiplication) {
                        case "boost1.5x":
                            {
                                const getBoostDurationMinutes = Number(interaction.options.getString("duração"));
                                const guildId = interaction.guildId;
                                const getBloodsBoostDB = await database.guild.getBloodsBoost(guildId);
                                const dateNow = +new Date();
                                const dateBoost = 1000 * 60 * getBoostDurationMinutes + dateNow;


                                if (getBloodsBoostDB?.boostDuration)
                                    return await interaction.reply({
                                        content: contentBoostAlready(getBloodsBoostDB.boostMultiplication, getBloodsBoostDB.boostDuration),
                                        ephemeral: true,
                                    });

                                await database.guild.setBloodsBoost(guildId, getMultiplication, dateBoost);

                                // Canal geral
                                const getChannelSend = interaction.guild.channels.cache.get(channelCongratulationsPublic);

                                if (getChannelSend && getChannelSend.isTextBased()) {
                                    getChannelSend.send({ embeds: [embedBoostActivated(userName, userAvatarURL, getMultiplication, dateBoost)] });
                                }

                                // Canal de Comandos
                                const getChannelSend2 = interaction.guild.channels.cache.get(channelSendCommandsId);

                                if (getChannelSend2 && getChannelSend2.isTextBased()) {
                                    getChannelSend2.send({ embeds: [embedBoostActivated(userName, userAvatarURL, getMultiplication, dateBoost)] });
                                }

                                // Canal de Logs da Staff
                                const getChannelSendLog = interaction.guild.channels.cache.get(channelLogStaffBoost);

                                if (getChannelSendLog && getChannelSendLog.isTextBased()) {
                                    getChannelSendLog.send({ embeds: [embedBoostActivated(userName, userAvatarURL, getMultiplication, dateBoost)] });
                                }

                                await interaction.reply({ content: contentBoostActivated(getMultiplication, dateBoost), ephemeral: true });
                            }
                            break;
                        case "boost2x":
                            {
                                const getBoostDurationMinutes = Number(interaction.options.getString("duração"));
                                const guildId = interaction.guildId;
                                const getBloodsBoostDB = await database.guild.getBloodsBoost(guildId);
                                const dateNow = +new Date();
                                const dateBoost = 1000 * 60 * getBoostDurationMinutes + dateNow;

                                if (getBloodsBoostDB?.boostDuration)
                                    return await interaction.reply({
                                        content: contentBoostAlready(getBloodsBoostDB.boostMultiplication, getBloodsBoostDB.boostDuration),
                                        ephemeral: true,
                                    });

                                await database.guild.setBloodsBoost(guildId, getMultiplication, dateBoost);

                                // Canal geral
                                const getChannelSend = interaction.guild.channels.cache.get(channelCongratulationsPublic);

                                if (getChannelSend && getChannelSend.isTextBased()) {
                                    getChannelSend.send({ embeds: [embedBoostActivated(userName, userAvatarURL, getMultiplication, dateBoost)] });
                                }

                                // Canal de Comandos
                                const getChannelSend2 = interaction.guild.channels.cache.get(channelSendCommandsId);

                                if (getChannelSend2 && getChannelSend2.isTextBased()) {
                                    getChannelSend2.send({ embeds: [embedBoostActivated(userName, userAvatarURL, getMultiplication, dateBoost)] });
                                }

                                // Canal de Logs da Staff
                                const getChannelSendLog = interaction.guild.channels.cache.get(channelLogStaffBoost);

                                if (getChannelSendLog && getChannelSendLog.isTextBased()) {
                                    getChannelSendLog.send({ embeds: [embedBoostActivated(userName, userAvatarURL, getMultiplication, dateBoost)] });
                                }

                                await interaction.reply({ content: contentBoostActivated(getMultiplication, dateBoost), ephemeral: true });
                            }
                            break;
                    }
                }

                break;
        }
        return;
    },
});

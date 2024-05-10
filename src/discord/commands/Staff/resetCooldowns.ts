import { Command } from "#base";
import { database } from "#database";
import { ApplicationCommandType } from "discord.js";

new Command({
    name: "reset",
    description: "Resetar todos os cooldowns dos comandos da Nea",
    dmPermission: false,
    defaultMemberPermissions: ["Administrator"],
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        await database.commandTimer.deleteAll();

        return await interaction.reply({ content: "Todos os cooldowns dos comandos da Nea foram reiniciados com sucesso.", ephemeral: true });
    },
});

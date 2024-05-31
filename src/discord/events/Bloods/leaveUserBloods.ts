import { Event } from "#base";
import { database } from "#database";

new Event({
    name: "Quando um usuário sair do servidor ele perde o seu perfil",
    event: "guildMemberRemove",
    async run(interaction) {
        const userId = interaction.user.id;
        const guildId = interaction.guild.id;
        const guildIdDB = await database.guild.getGuildId("Dead by Daylight Brasil");

        if (!guildIdDB || guildIdDB && guildId !== guildIdDB) return;

        await database.profile.deleteProfile(userId);
    },
});

import { Event } from "#base";
import { database } from "#database";

new Event({
    name: "Quando um usuário sair do servidor ele perde o seu perfil",
    event: "guildMemberRemove",
    async run(interaction) {
        const userId = interaction.user.id;
        const guildId = interaction.guild.id;
        const getGuildIdDB = await database.guild.getGuildId();

        if (!getGuildIdDB || (getGuildIdDB && guildId !== getGuildIdDB)) return;

        await database.profile.deleteProfile(userId);
    },
});

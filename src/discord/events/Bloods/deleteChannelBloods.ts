import { Event } from "#base";
import { database } from "#database";

new Event({
    name: "Quando um canal for deletado, remove ele do Banco de Dados (GuildConfig)",
    event: "channelDelete",
    async run(interaction) {
        const deletedChannel = interaction.id;
        const getGuildIdDB = await database.guild.getGuildId("Dead by Daylight Brasil");
        const getAllChannelsDB = await database.guild.getAllChannels(getGuildIdDB);

        // Verifica se existe o ID do canal deletado no Array allChannels e caso tenha deleta o canal de todos os Arrays
        if (getAllChannelsDB !== "Sem Canal" && getAllChannelsDB.includes(deletedChannel)) {
            await database.guild.pullAllChannels(getGuildIdDB, deletedChannel);
            await database.guild.pullTextChannels(getGuildIdDB, deletedChannel);
            await database.guild.pullVoiceChannels(getGuildIdDB, deletedChannel);
        }
    },
});

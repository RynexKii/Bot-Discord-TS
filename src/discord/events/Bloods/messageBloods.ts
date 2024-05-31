import { Event } from "#base";
import { database } from "#database";
import { randomNumber } from "@magicyan/discord";

new Event({
    name: "Adicionar Bloods por Mensagem",
    event: "messageCreate",
    async run(interaction) {
        const userId = interaction.author.id;
        //!Ativar dps
        // const channelId = interaction.channelId;
        // const getAllChannelsDB = await database.guild.getAllChannels("Dead by Daylight Brasil");

        // // Verificação dos canais que não concederão Bloods
        // if (getAllChannelsDB && getAllChannelsDB.includes(channelId)) return;

        // Verifica se a mensagem foi enviada no privado do bot
        if (interaction.channel.isDMBased()) return;

        // Verifica se é bot
        if (interaction.author.bot) return;

        // Verifica se o usuário tem Boost ativo no servidor para dar 1.5x de Bloods
        if (interaction.member?.premiumSince) return await database.profile.addBloods(userId, randomNumber(1, 3));

        return await database.profile.addBloods(userId, randomNumber(1, 2));
    },
});

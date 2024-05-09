import { Event } from "#base";
import { database } from "#database";
import { randomNumber } from "@magicyan/discord";

new Event({
    name: "Adicionar Bloods por Mensagem",
    event: "messageCreate",

    async run(client) {
        const userId = client.author.id;

        const { channelId } = client;

        const getAllChannelsDB = await database.channelBloodsIgnored.get<string[]>("GuildConfig.allChannels");

        // Verificação dos canais que não concederão Bloods
        if (getAllChannelsDB) {
            if (getAllChannelsDB.includes(channelId)) {
                return;
            }
        }

        // Verifica se a mensagem foi criada no privado do bot
        if (client.channel.isDMBased()) return;

        // Verifica se é bot
        if (client.author.bot) return;

        // Verifica se o usuário tem Boost ativo no servidor para dar 1.5x de Bloods
        if (client.member?.premiumSince) return await database.memberBloods.add(`${userId}.bloods`, randomNumber(1, 3));

        return await database.memberBloods.add(`${userId}.bloods`, randomNumber(1, 2));
    },
});

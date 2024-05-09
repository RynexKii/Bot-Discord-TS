import { Event } from "#base";
import { database } from "#database";

new Event({
    name: "Quando um canal for deletado, remove ele do Banco de Dados (GuildConfig)",
    event: "channelDelete",
    async run(channel) {
        const deletedChannel = channel.id;

        const getAllChannels = await database.channelBloodsIgnored.get<string[]>("GuildConfig.allChannels");

        // Verifica se existe o ID do canal deletado no Array allChannels e caso tenha deleta o canal de todos os Arrays
        if (getAllChannels && getAllChannels.includes(deletedChannel)) {
            await database.channelBloodsIgnored.pull("GuildConfig.allChannels", deletedChannel);
            await database.channelBloodsIgnored.pull("GuildConfig.textChannels", deletedChannel);
            await database.channelBloodsIgnored.pull("GuildConfig.voiceChannels", deletedChannel);
        }
    },
});

import { Event } from "#base";
import { database } from "#database";
import { randomNumber } from "@magicyan/discord";

new Event({
    name: "Adicionar Bloods por Canal de Voz",
    event: "ready",
    async run(client) {
        async function addBloodsVoiceChannel() {
            let allMembersGuild: string[] = [];

            const getGuildIdDB = await database.channelBloodsIgnored.get<string[]>("GuildConfig.guildId");

            const getAllChannelsDB = await database.channelBloodsIgnored.get<string[]>(`GuildConfig.allChannels`);

            // Verifica se existe um guildId registrado no Banco de Dados
            if (!getGuildIdDB) return;

            // De todas as Guilds que o bot está, pega a guild que está registrada no Banco de Dados
            const guild = await client.guilds.cache.get(getGuildIdDB[0]);

            // Verifica se existe um valor na variável guild
            if (!guild) return;

            // Pega todos os ID's dos membros da guild e armazena no Array allMembersGuild
            const res = await guild.members.fetch();
            res.forEach((member) => {
                allMembersGuild.push(member.user.id);
            });

            for (let index = 0; index < allMembersGuild.length; index++) {
                let membersId = allMembersGuild[index];

                // Passando por todos os membros ele pega os ID's dos canais que tem membros conectados ( Também pega os que não estão conectado returnando null )
                const getMemberVoiceId = (await guild.members.fetch(membersId)).voice.channelId;

                // Verifica se o getMemberVoiceId não existe um ID fazendo o return
                if (getMemberVoiceId) {
                    // Passa o ID do canal para pagar se o membro está conectado no canal do Servidor Principal
                    const memberHasConnected = guild.channels.cache.has(getMemberVoiceId);

                    // Uma segunda verificação se o membro está conectado no canal do Servidor Principal
                    if (memberHasConnected) {
                        // Verificação dos canais que não concederão Bloods
                        if (getAllChannelsDB) {
                            if (!getAllChannelsDB.includes(getMemberVoiceId)) {
                                // Verifica se o usuário tem Boost ativo no servidor para dar 1.5x de Bloods
                                if (guild.members.cache.get(membersId)?.premiumSince) {
                                    await database.memberBloods.add(`${membersId}.bloods`, randomNumber(1, 3));
                                } else {
                                    await database.memberBloods.add(`${membersId}.bloods`, randomNumber(1, 2));
                                }
                            }
                        }
                    }
                }
            }
        }

        setInterval(() => {
            addBloodsVoiceChannel();
        }, 60 * 1000);
    },
});

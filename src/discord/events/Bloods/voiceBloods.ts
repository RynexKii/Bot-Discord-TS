import { Event } from "#base";
import { database } from "#database";
import { randomNumber } from "@magicyan/discord";

new Event({
    name: "Adicionar Bloods por Canal de Voz",
    event: "ready",
    async run(client) {
        async function addBloodsVoiceChannel() {
            const allMembersGuild: string[] = [];
            const guildIdDB = await database.channelBloodsIgnored.get<string[]>("GuildConfig.guildId");
            const allChannelsDB = await database.channelBloodsIgnored.get<string[]>("GuildConfig.allChannels");

            // Verifica se existe um guildId registrado no Banco de Dados
            if (!guildIdDB) return;

            // De todas as Guilds que o bot está, pega a guild que está registrada no Banco de Dados
            const guild = client.guilds.cache.get(guildIdDB[0]);

            // Verifica se existe um valor na variável guild
            if (!guild) return;

            // Pega todos os ID's dos usuários da guild e armazena no Array allMembersGuild
            const membersGuild = await guild.members.fetch();
            membersGuild.forEach((member) => {
                allMembersGuild.push(member.user.id);
            });

            for (const index in allMembersGuild) {
                const membersId = allMembersGuild[index];

                // Passando por todos os usuários ele pega os ID's dos canais que tem usuários conectados ( Também pega os que não estão conectado returnando null )
                const memberVoiceConnectedId = (await guild.members.fetch(membersId)).voice.channelId;

                if (memberVoiceConnectedId) {
                    // Passa o ID do canal para pagar se o usuário está conectado no canal do Servidor Principal
                    const memberHasConnected = guild.channels.cache.has(memberVoiceConnectedId);

                    // Uma segunda verificação se o usuário está conectado no canal do Servidor Principal
                    if (memberHasConnected) {
                        // Verifica se existe um canal registrado no Banco de Dados para ser ignorado
                        if (allChannelsDB) {
                            // Verificação dos canais que não concederão Bloods
                            if (!allChannelsDB.includes(memberVoiceConnectedId)) {
                                // Verifica se o usuário deu boost no Servidor
                                const memberHasBoosted = guild.members.cache.get(membersId)?.premiumSince;

                                // Retorna quantos usuário tem no canal
                                const membersVoiceSize = (await guild.members.fetch(membersId)).voice.channel?.members.size;

                                if (membersVoiceSize === 1) {
                                    if (memberHasBoosted) {
                                        await database.memberBloods.add(`${membersId}.bloods`, randomNumber(1, 2));
                                    } else {
                                        await database.memberBloods.add(`${membersId}.bloods`, 1);
                                    }
                                } else {
                                    // Verifica se o usuário tem Boost ativo no servidor para dar 1.5x de Bloods
                                    if (memberHasBoosted) {
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
        }

        setInterval(() => {
            addBloodsVoiceChannel();
        }, 120 * 1000);
    },
});

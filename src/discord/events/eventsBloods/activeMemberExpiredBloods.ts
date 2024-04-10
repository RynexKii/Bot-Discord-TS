import { Event } from "#base";
import { database } from "#database";
import { contentLogStaffRemove } from "#functions";

new Event({
    name: "Remove os Membros Ativos que já ultrapassou a data",
    event: "ready",
    run(client) {
        // Função para remover o cargo de Membro Ativo após 30 dias da compra
        async function removeActiveMember() {
            //! Integrar mais pra frente com o Banco de Dados
            const guildId = await database.channelBloodsIgnored.get<string[]>("GuildConfig.guildId");

            //! Integrar mais pra frente com o Banco de Dados
            const activeMemberRoleId = "ROLEID";

            //! Integrar mais pra frente com o Banco de Dados
            const getChannelLogStaff = client.channels.cache.get("CHANNELID");

            if (guildId) {
                // Pega os usuário que estão com o cargo (activeMemberRoleId)
                const getMemberRole = (await client.guilds.cache.get(guildId[0])?.members.fetch())?.filter((m) =>
                    m.roles.cache.has(activeMemberRoleId)
                );

                // Pega os ID's dos usuários e retorna um Array com os ID's
                const getUsersId = getMemberRole?.map((user) => user.id);

                const getTimestampToday = Math.round(+new Date() / 1000);

                if (getUsersId) {
                    for (let index = 0; index < getUsersId.length; index++) {
                        const userId = getUsersId[index];

                        // Pega o timestamp que esta armazenado na database do usuário
                        const getTimestampMember = await database.activeMemberDuration.get<number>(`${userId}.timestamp`);

                        if (getTimestampMember && getTimestampMember < getTimestampToday) {
                            // Remove o cargo do usuário
                            client.guilds.cache.get(guildId[0])?.members.cache.get(userId)?.roles.remove(activeMemberRoleId);

                            // Remove a tabela activeMemberDuration do usuário
                            database.activeMemberDuration.delete(userId);

                            // Logs da Staff
                            if (getChannelLogStaff && getChannelLogStaff.isTextBased()) {
                                getChannelLogStaff.send(contentLogStaffRemove(userId));
                            }
                        }
                    }
                }
            }
        }

        // Chama a função a cada 1 minuto
        setInterval(() => {
            removeActiveMember();
        }, 60 * 1000);
    },
});

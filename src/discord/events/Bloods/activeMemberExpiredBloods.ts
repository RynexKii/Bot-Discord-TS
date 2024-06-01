import { Event } from "#base";
import { database } from "#database";
import { embedLogExpiredActiveMember } from "#messages";
import { channelLogStaff, roleActiveMember } from "#tools";

new Event({
    name: "Remove os Membros Ativos que já ultrapassou a data",
    event: "ready",
    run(client) {
        // Função para remover o cargo de Membro Ativo após 30 dias da compra
        async function removeActiveMember() {
            //! Integrar mais pra frente com o Banco de Dados
            const guildIdDB = await database.guild.getGuildId();

            //! Integrar mais pra frente com o Banco de Dados
            // TODO: Colocar o ID do cargo de Membro Ativo
            const activeMemberRoleId = roleActiveMember;

            //! Integrar mais pra frente com o Banco de Dados
            // TODO: Colocar o ID do canal de Logs da Staff
            const getChannelLogStaff = client.channels.cache.get(channelLogStaff);

            if (!guildIdDB) return;

            // Pega os usuário que estão com o cargo (activeMemberRoleId)
            const getMemberRole = (await client.guilds.cache.get(guildIdDB)?.members.fetch())?.filter((m) => m.roles.cache.has(activeMemberRoleId));

            // Pega os ID's dos usuários e retorna um Array com os ID's
            const getUsersId = getMemberRole?.map((user) => user.id);

            const getTimestampNow = +new Date();

            if (getUsersId) {
                for (let index = 0; index < getUsersId.length; index++) {
                    const userId = getUsersId[index];

                    // Pega o timestamp que esta armazenado na database do usuário
                    const getTimestampUserDB = await database.profile.getActiveMemberTimestamp(userId);

                    if (!getTimestampUserDB) {
                        // Remove o cargo do usuário
                        client.guilds.cache.get(guildIdDB)?.members.cache.get(userId)?.roles.remove(activeMemberRoleId);
                    } else if (getTimestampUserDB < getTimestampNow) {
                        // Remove o cargo do usuário
                        client.guilds.cache.get(guildIdDB)?.members.cache.get(userId)?.roles.remove(activeMemberRoleId);

                        // Remove a tabela activeMemberTimestamp do usuário
                        await database.profile.deleteActiveMemberTimestamp(userId);

                        // Logs da Staff
                        if (getChannelLogStaff && getChannelLogStaff.isTextBased()) {
                            getChannelLogStaff.send({ embeds: [embedLogExpiredActiveMember(userId, roleActiveMember)]});
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

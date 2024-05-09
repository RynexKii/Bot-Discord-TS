import { Event } from "#base";
import { database } from "#database";
import { ActivityType } from "discord.js";

new Event({
    name: "Definir o Status do Bot",
    event: "ready",
    async run(client) {
        // Deixando o bot no status de ocupado
        client.user.setStatus("dnd");

        let indexNumbers = 0;

        // Pegando os Top 3 Ranks e passando na atididade do bot
        async function setActivityTopRanks() {
            const getMembersRankDB = await database.memberBloodsRank.get<any[]>("MembersRank");

            // Caso for undefined ou o Array que sobrar estiver menor do que 3 usuários ele não deixa continuar
            if (!getMembersRankDB || getMembersRankDB.length < 3) return;

            switch (indexNumbers) {
                case 0:
                    client.user.setActivity({
                        type: ActivityType.Custom,
                        name: `Top 1º ${client.users.cache.get(getMembersRankDB[0].userId)?.globalName ?? "Desconhecido"} com ${
                            getMembersRankDB[0].userBloods
                        } Bloods 🩸`,
                    });

                    indexNumbers++;
                    break;
                case 1:
                    client.user.setActivity({
                        type: ActivityType.Custom,
                        name: `Top 2º ${client.users.cache.get(getMembersRankDB[1].userId)?.globalName ?? "Desconhecido"} com ${
                            getMembersRankDB[1].userBloods
                        } Bloods 🩸`,
                    });

                    indexNumbers++;
                    break;
                case 2:
                    client.user.setActivity({
                        type: ActivityType.Custom,
                        name: `Top 3º ${client.users.cache.get(getMembersRankDB[2].userId)?.globalName ?? "Desconhecido"} com ${
                            getMembersRankDB[2].userBloods
                        } Bloods 🩸`,
                    });

                    indexNumbers = 0;
                    break;
            }
        }

        // Chamando a função logo quando o bot inicia
        setActivityTopRanks();

        // Depois chamando a função em um loop 30 segundos que ficará alterando a mensagem da atividade do bot
        setInterval(() => {
            setActivityTopRanks();
        }, 1000 * 30);
    },
});

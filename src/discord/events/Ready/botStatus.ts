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

        // Pegando os Top 3 Ranks e passando na atividade do bot
        async function setActivityTopRanks() {
            // Pega todos os usuários já em ordem do menor para o maior pelo Rank
            const getUserRankDB = await database.profile.find().sort({ bloodsRank: 1 });

            // Verifica se o Array tem menos de 3 usuário e retorna
            if (getUserRankDB.length < 3) return;

            switch (indexNumbers) {
                case 0:
                    client.user.setActivity({
                        type: ActivityType.Custom,
                        name: `Top 1º ${client.users.cache.get(getUserRankDB[0].userId)?.displayName ?? "Desconhecido"} com ${getUserRankDB[0].bloods} Bloods 🩸`,
                    });

                    indexNumbers++;
                    break;
                case 1:
                    client.user.setActivity({
                        type: ActivityType.Custom,
                        name: `Top 2º ${client.users.cache.get(getUserRankDB[1].userId)?.displayName ?? "Desconhecido"} com ${getUserRankDB[1].bloods} Bloods 🩸`,
                    });

                    indexNumbers++;
                    break;
                case 2:
                    client.user.setActivity({
                        type: ActivityType.Custom,
                        name: `Top 3º ${client.users.cache.get(getUserRankDB[2].userId)?.displayName ?? "Desconhecido"} com ${getUserRankDB[2].bloods} Bloods 🩸`,
                    });

                    indexNumbers = 0;
                    break;
            }
        }

        // Chamando a função logo quando o bot inicia
        await setActivityTopRanks();

        // Depois chamando a função em um loop 30 segundos que ficará alterando a mensagem da atividade do bot
        setInterval(() => {
            setActivityTopRanks();
        }, 1000 * 30);
    },
});

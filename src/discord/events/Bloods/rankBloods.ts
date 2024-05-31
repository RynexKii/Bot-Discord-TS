import { Event } from "#base";
import { database } from "#database";

new Event({
    name: "Dar rank para o usuário conforme seu total de Bloods",
    event: "ready",

    async run() {
        async function setRankUser() {
            // Pega todos os usuários já em ordem do maior para o menor valor em Bloods
            const getAllUsersDB = await database.profile.find().sort({ bloods: -1 });

            if (getAllUsersDB.length == 0) return;

            for (const index in getAllUsersDB) {
                await database.profile.setRank(getAllUsersDB[index].userId, Number(index) + 1);
            }
        }

        // Chamando a função assim que iniciar o bot
        setRankUser();

        // Chamando de 1 em 1 minuto novamente a função
        setInterval(() => {
            setRankUser();
        }, 60 * 1000);
    },
});

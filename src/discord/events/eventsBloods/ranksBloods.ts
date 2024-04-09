import { Event } from "#base";
import { database } from "#database";

new Event({
    name: "Criar e organizar os Ranks na Database",
    event: "ready",

    async run() {
        let newArrayMembers = [];

        let rankPosition: any = null;

        async function setMembers() {
            const getAllMembersDB = await database.memberBloods.all();

            newArrayMembers = [];
            rankPosition = null;

            if (!getAllMembersDB) return;

            // Fazendo um for para passar pelo Array allMembersDB e criar um novo Array com as informações e armazenando no newArrayMembers
            for (let index = 0; index < getAllMembersDB.length; index++) {
                const element = getAllMembersDB[index];

                if (element.value.bloods) {
                    if (element.value.bloods > 0) {
                        newArrayMembers.push({ userId: element.id, userBloods: element.value.bloods, userRank: 0 });
                        newArrayMembers.sort((a, b) => b.userBloods - a.userBloods);
                    }
                }
            }

            // Percorendo o novo Array criado para poder adicionar a variável de rankPosition que servirá para adicionar os números para cada usuário em ordem
            newArrayMembers.forEach((element) => {
                element.userRank = rankPosition += 1;
            });

            // Por fim adicionando o newArrayMembers com todos os novos dados em uma de MemberBloodsRank no Banco de Dados
            await database.memberBloodsRank.set("MembersRank", newArrayMembers);
        }

        // Chamando a função assim que iniciar o bot
        setMembers();

        // Depois chamando a função em um loop de 5 minutos para ser atualizado a cada 5 minutos
        setInterval(() => {
            setMembers();
        }, 300 * 1000);
    },
});

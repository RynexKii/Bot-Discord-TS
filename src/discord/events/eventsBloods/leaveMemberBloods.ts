import { Event } from "#base";
import { database } from "#database";

new Event({
    name: "Quando um membro sair do servidor ele perde os Bloods e o Membro Ativo",
    event: "guildMemberRemove",
    async run(member) {
        const userId = member.user.id;

        const getBloodsUserDB = await database.memberBloods.get<number>(`${userId}.bloods`);

        if (getBloodsUserDB) {
            await database.memberBloodsLost.add(`${userId}.bloodsLost`, getBloodsUserDB);

            await database.memberBloods.delete(userId);
            await database.activeMemberDuration.delete(userId);
        }
    },
});

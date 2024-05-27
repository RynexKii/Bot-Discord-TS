import { userMention } from "discord.js";

//* ---------- Variáveis Mensagens Content ----------

export const contentStaffBot = "<:error:1242517725704884234> Você não pode adicionar bloods em um bot.";

//* ---------- Funções Mensagens Content ----------

export function contentStaffAddBloods(userReceiverId: string, valueBloods: number) {
    return `<:adicionar:1242514587262255124> Você adicionou \` ${valueBloods} Bloods 🩸\` para o usuário ${userMention(userReceiverId)}`;
}

export function contentStaffNoHaveBloods(userReceiverId: string, valueBloods: number, bloodsUserDB: number) {
    return `<:error:1242517725704884234> Não é possivel remover os \` ${valueBloods} Bloods 🩸\` de ${userMention(
        userReceiverId
    )} pois o usuário possui \` ${bloodsUserDB} Bloods 🩸\``;
}

export function contentStaffRemoveBloods(userReceiverId: string, valueBloods: number) {
    return `<:remover:1242557065549975745> Você removeu \` ${valueBloods} Bloods 🩸\` do usuário ${userMention(userReceiverId)}`;
}

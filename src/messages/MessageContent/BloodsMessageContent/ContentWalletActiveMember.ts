import { time } from "discord.js";

//* ---------- Funções Mensagens Embed ----------

export function contentInsufficientBloods(day: number, value: number, getBloodsUserDB: number) {
    return `Você ainda não possui bloods suficientes. Você precisa conseguir mais \` ${value - getBloodsUserDB} Bloods 🩸\` para obter o cargo por ${day} dias.`;
}

export function contentAlreadyRole(getRoleActiveMember: string, getTimestampUserDB: number) {
    return `Hey, você já possui a assinatura de <@&${getRoleActiveMember}> em sua conta, ela irá acabar ${time(Math.floor(getTimestampUserDB / 1000), "F")}`;
}

export function contentLogStaff(userId: string, getTimestamp: number) {
    return `[LOG] O membro <@${userId}> obteve o cargo de **Membro Ativo** através da loja. Duração: ${time(Math.floor(getTimestamp / 1000), "F")}`;
}

export function contentLogPublic(userId: string, day: number) {
    return `<@${userId}> acabou de adquirir o status de **Membro Ativo** no Servidor, com uma duração de ${day} dias.`;
}

export function contentLogStaffRemove(userId: string) {
    return `[LOG] O cargo de **Membro Ativo** de <@${userId}> chegou ao fim.`;
}

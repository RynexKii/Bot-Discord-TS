import { time } from "discord.js";

//* ---------- Funções Mensagens Embed ----------

export function contentInsufficientBloods(day: number, value: number, getBloodsUserDB: number) {
    return `Você ainda não possui bloods suficientes. Você precisa conseguir mais \` ${value - getBloodsUserDB} Bloods 🩸\` para obter o cargo por ${day} dias.`;
}

export function contentAlreadyRole(getRoleActiveMember: string, getTimestampUserDB: number) {
    return `Hey, você já possui a assinatura de <@&${getRoleActiveMember}> em sua conta, ela irá acabar ${time(Math.floor(getTimestampUserDB / 1000), "F")}`;
}

export function contentLogPublic(userId: string, day: number) {
    return `<@${userId}> acabou de adquirir o status de **Membro Ativo** no Servidor, com uma duração de ${day} dias.`;
}

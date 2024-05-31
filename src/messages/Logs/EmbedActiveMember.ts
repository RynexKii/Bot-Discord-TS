import { EmbedBuilder, roleMention, time, userMention } from "discord.js";

//* ---------- Funções Mensagens Embed ----------

export function embedLogBuyActiveMember(userId: string, roleId: string, totalDays: number, timestamp: number) {
    const getTimestampNow = +new Date();
    return new EmbedBuilder()
        .setTitle("🔒 [Log] Compra - Membro Ativo")
        .setDescription(
            `>>> **Usuário:** ${userMention(userId)}(${userId})\n**Cargo:** ${roleMention(roleId)}\n**Total de Dias:** ${totalDays} dias\n**Data da Compra:** ${time(
                Math.floor(getTimestampNow / 1000)
            )}\n**Duração:** ${time(Math.floor(timestamp / 1000))}`
        )
        .setColor("#36FF00");
}

export function embedLogExpiredActiveMember(userId: string, roleId: string) {
    const getTimestampNow = +new Date();
    return new EmbedBuilder()
        .setTitle("🔒 [Log] Expirou - Membro Ativo")
        .setDescription(
            `>>> **Usuário:** ${userMention(userId)}(${userId})\n**Cargo Perdido:** ${roleMention(roleId)}\n**Data do Fim:** ${time(Math.floor(getTimestampNow / 1000))}`
        )
        .setColor("#FF0000");
}

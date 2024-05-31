import { EmbedBuilder, userMention } from "discord.js";

// ---------- Funções Mensagens Embed ----------

export function embedFameSend(userId: string, userReceiverId: string) {
    return new EmbedBuilder()
    .setDescription(`⭐️ ${userMention(userReceiverId)} recebeu 1 ponto de fama de ${userMention(userId)}`)
    .setColor("#ffd700");
}

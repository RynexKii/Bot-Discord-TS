//* ---------- Funções Mensagens Embed ----------

import { EmbedBuilder, userMention } from "discord.js";

export function embedFame(userId: string, userReceiverId: string) {
    return new EmbedBuilder()
        .setDescription(`⭐️ ${userMention(userReceiverId)} recebeu 1 ponto de fama de ${userMention(userId)}`)
        .setColor("#ffd700");
}

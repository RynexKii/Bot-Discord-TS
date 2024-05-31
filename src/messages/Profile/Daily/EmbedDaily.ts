import { EmbedBuilder, userMention } from "discord.js";

// ---------- Funções Mensagens Embed ----------

export function embedDailySend(userId: string, bloods: number) {
    return new EmbedBuilder()
        .setDescription(`<:Bill:1241523159975460866> ${userMention(userId)} você foi recompensado com \` ${bloods} Bloods 🩸\` como parte da sua recompensa diária!`)
        .setColor("#c30010");
}

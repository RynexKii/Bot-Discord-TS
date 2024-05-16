import { EmbedBuilder, userMention } from "discord.js";

//* ---------- Funções Mensagens Embed ----------

export function transferBloods(userId: string, userReceiverId: string, valueTransfer: number) {
    return new EmbedBuilder()
        .setDescription(`${userMention(userId)} sua transferência de \`${valueTransfer} Bloods\` foi enviada para ${userMention(userReceiverId)}`)
        .setColor("Green");
}

import { EmbedBuilder, userMention } from "discord.js";

//* ---------- Funções Mensagens Embed ----------

export function transferBloods(userId: string, userReceiverId: string, valueTransfer: number, valueTransferMoreHate: number) {
    return new EmbedBuilder()
        .setDescription(
            `${userMention(userId)} sua transferência de \` ${valueTransfer} Bloods 🩸\` foi enviada para ${userMention(userReceiverId)}, que recebeu \` ${
                valueTransfer - valueTransferMoreHate
            } Bloods 🩸\` ( Taxa de 10% )`
        )
        .setColor("Green");
}

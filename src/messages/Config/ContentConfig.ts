import { channelMention } from "discord.js";

// ---------- Funções Mensagens Content ----------

export function contentChannelSendCommand(channelSendCommandsId: string) {
    return `<:Clown:1241523165889429564> Você não tem permissão para enviar esse comando nesse canal, utilize o canal ${channelMention(
        channelSendCommandsId
    )} para enviar este comando!`;
}

//* ---------- Variáveis Mensagens Content ----------

import { userMention } from "discord.js";

export const contentNotInteractCommand = "Hey, você não pode interagir em comandos que foi enviado por outro usuário.";

//* ---------- Funções Mensagens Content ----------

export function contentProfileBot(userId: string) {
    return `<:Cheryl:1241523161795661854> Você não pode ver o perfil de ${userMention(userId)}, já que os bots não têm perfis.`;
}

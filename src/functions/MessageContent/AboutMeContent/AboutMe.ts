//* ---------- Funções Mensagens Embed ----------

import { userMention } from "discord.js";

export function defaultContentAboutMe(userId: string) {
    return `Não conhecemos ${userMention(userId)} muito bem, mas temos certeza que é gente boa.`;
}

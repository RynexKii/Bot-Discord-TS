import { userMention } from "discord.js";

// ---------- Funções Mensagens Content ----------

export function defaultContentAboutMe(userId: string) {
    return `Não conhecemos ${userMention(userId)} muito bem, mas temos certeza que é gente boa.`;
}

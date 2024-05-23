import { time, userMention } from "discord.js";

// ---------- Variáveis Mensagens Content ----------

export const contentFameYourself = "<:Claudette:1241523164115243108> Por mais que você seja seu próprio ídolo, não é possível dar fama a si mesmo!";

// ---------- Funções Mensagens Content ----------

export function contentFameBot(userReceiverFameId: string): string {
    return `<:Cheryl:1241523161795661854> Mesmo que ${userMention(userReceiverFameId)} seja seu ídolo, você não pode dar fama a um bot!`;
}

export function contentFameCooldown(userDate: number): string {
    return `⌛ Você poderá dar fama para alguém novamente ${time(userDate / 1000, "F")}`;
}

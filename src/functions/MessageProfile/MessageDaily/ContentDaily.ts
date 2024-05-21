import { time } from "discord.js";

// ---------- Funções Mensagens Content ----------

export function contentDailyCooldown(userDate: number): string {
    return `⌛ Você poderá coletar sua próxima recompensa diária ${time(userDate / 1000, "F")}`;
}

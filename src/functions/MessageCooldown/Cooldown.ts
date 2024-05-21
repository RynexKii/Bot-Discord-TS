import { time } from "discord.js";

export function cooldownMessage(timer: Date) {
    return { content: `⏳ Você poderá usar esse comando novamente ${time(timer, "F")}`, ephemeral: true };
}
